import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkProvider,
} from "@clerk/clerk-react";
import ChatBot from "./pages/ChatBot";
import ProfilePage from "./pages/ProfilePage";
import DailyWork from "./pages/DailyWork";

export default function App() {
  // Import your publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <header>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dailywork" element={<DailyWork />} />
          </Routes>

          <SignedIn>
            <UserButton />
            <Link to="/chatbot">
              <button>Go to ChatBot</button>
            </Link>
            <Link to="/profile">
              <button>Go to Profile</button>
            </Link>
            <Link to="/dailywork">
              <button>Daily Work</button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </header>
      </Router>
    </ClerkProvider>
  );
}
