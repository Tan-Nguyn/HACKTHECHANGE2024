import { SignInButton, SignedOut, SignedIn, useUser } from "@clerk/clerk-react";
import Cat from "../assets/cat.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const { isSignedIn } = useUser(); // Clerk hook to check if the user is signed in
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dailywork");
    }
  }, [isSignedIn, navigate]);

  return (
    <>
      <SignedOut>
        <main className="bg-[#F79B3A] h-[100vh] pt-10">
          <div className="max-w-[500px] flex flex-col justify-center items-center mx-auto p-4">
            <img className="w-[150px] h-auto" src={Cat} alt="howToMeow's logo" />
            <div className="py-[10vh] w-full">
              <div className="">
                <SignInButton className="bg-black text-white text-sm rounded-lg block w-full p-2.5">
                  Get Started
                </SignInButton>
              </div>
            </div>
          </div>
        </main>
      </SignedOut>

      <SignedIn>
        {/* Empty JSX here as the useEffect handles the redirection */}
      </SignedIn>
    </>
  );
}

export default Home;
