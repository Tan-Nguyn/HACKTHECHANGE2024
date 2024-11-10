import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import ProfileIcon from "../assets/profile.svg";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <SignedOut>
        <header className="bg-black w-full p-4 h-16 flex items-center justify-center">
          <img
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="w-[150px] h-auto cursor-pointer"
            src={Logo}
            alt="howToMeow's logo"
          />
        </header>
      </SignedOut>

      <SignedIn>
        <header className="bg-black w-full p-4 h-16 flex items-center justify-between">
          <img
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="w-[150px] h-auto cursor-pointer"
            src={Logo}
            alt="howToMeow's logo"
          />
          <div className="flex gap-4">
            {/* Existing Profile Icon */}
            <Link to="/profile">
              <img
                className="w-[24px] h-auto cursor-pointer"
                src={ProfileIcon}
                alt="Profile"
              />
            </Link>

            {/* New ChatBot and DailyWork Links */}
            <Link to="/chatbot">
              <button className="text-white">ChatBot</button>
            </Link>
            <Link to="/dailywork">
              <button className="text-white">Daily Work</button>
            </Link>

            {/* Sign Out Button */}
            <SignOutButton className="text-white" />
          </div>
        </header>
      </SignedIn>
    </>
  );
}

export default Header;
