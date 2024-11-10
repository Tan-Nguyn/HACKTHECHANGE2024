import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Style components using Tailwind CSS
import "./ChatBotStyle.css";
import ChatHistory from "../components/ChatHistory/index.jsx";
import Loading from "../components/Loading/index.jsx";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const PUBLISHABLE_KEY = import.meta.env.GEMINI_API_KEY

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI({ PUBLISHABLE_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Function to handle user input
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    // Function to send user message to Gemini
    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        setIsLoading(true);
        try {
            // Constructing a prompt to personalize AI responses
            const prompt = `
                You are a friendly and knowledgeable chatbot named Gemini. 
                You assist users by answering questions, providing insights, and engaging in conversation. 
                Respond with clear and concise information in a supportive and engaging tone.

                User: ${userInput}
            `;

            // Call Gemini API to get a response
            const result = await model.generateContent({ prompt });
            const response = await result.response;

            // Add Gemini's response to the chat history
            setChatHistory([
                ...chatHistory,
                { type: "user", message: userInput },
                { type: "bot", message: response.text() },
            ]);
        } catch (error) {
            console.error("Error sending message", error);
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
