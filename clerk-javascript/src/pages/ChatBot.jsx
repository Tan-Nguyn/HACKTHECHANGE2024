import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

// Style components using Tailwind CSS
import "./ChatBotStyle.css";
import ChatHistory from "../components/ChatHistory/index.jsx";
import Loading from "../components/Loading/index.jsx";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const PUBLISHABLE_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

    // Initialize Gemini AI API
    const genAI = new GoogleGenerativeAI({ apiKey: PUBLISHABLE_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Function to handle user input
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    // Function to fetch cat breed information from The Cat API
    const fetchCatInfo = async (breedName) => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/breeds/search', {
                headers: { 'x-api-key': CAT_API_KEY },
                params: { q: breedName },
            });

            if (response.data.length === 0) return null;

            const breed = response.data[0];
            const imageResponse = await axios.get('https://api.thecatapi.com/v1/images/search', {
                headers: { 'x-api-key': CAT_API_KEY },
                params: { breed_id: breed.id, limit: 1 },
            });

            return {
                name: breed.name,
                description: breed.description,
                temperament: breed.temperament,
                origin: breed.origin,
                imageUrl: imageResponse.data[0]?.url || '',
            };
        } catch (error) {
            console.error("Error fetching cat information:", error);
            return null;
        }
    };

    // Function to send user message to Gemini or fetch cat info if applicable
    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        setIsLoading(true);
        setChatHistory([...chatHistory, { type: "user", message: userInput }]);

        try {
            const catInfo = await fetchCatInfo(userInput);
            let prompt = `
                You are a virtual veterinarian for HowToMeow, a service for assisting pet owners. 
                Answer questions with a neutral and supportive tone, providing straightforward and helpful insights about cats.
            `;

            if (catInfo) {
                prompt += `
                    The user asked about ${catInfo.name}, a breed known for its ${catInfo.temperament} temperament. 
                    This breed originates from ${catInfo.origin}. Here is some more information: 
                    ${catInfo.description}
                    ${catInfo.imageUrl ? `Here is an image of this breed: ${catInfo.imageUrl}` : ''}
                `;
            }

            prompt += `
                User's question: ${userInput}
            `;

            // Call Gemini API with proper formatting and handle response
            const result = await model.generateContent({ prompt });
            const responseText = await result.response.text();

            setChatHistory(prev => [
                ...prev,
                { type: "bot", message: responseText },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory(prev => [
                ...prev,
                { type: "bot", message: "Sorry, I'm having trouble responding right now." },
            ]);
        } finally {
            setUserInput("");
            setIsLoading(false);
        }
    };

    // Function to clear the chat history
    const clearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-4">Chatbot</h1>

            <div className="chat-container rounded-lg shadow-md p-4">
                <ChatHistory chatHistory={chatHistory} />
                <Loading isLoading={isLoading} />
            </div>

            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleUserInput}
                />
                <button
                    className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    onClick={sendMessage}
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
            <button
                className="mt-4 block px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 focus:outline-none"
                onClick={clearChat}
            >
                Clear Chat
            </button>
        </div>
    );
};

export default App;
