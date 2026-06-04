import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LogoCard from "../components/cards/LogoCard";

const SignIn = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/start");
  };

  return (
    <div className="bg-black h-[100vh] flex flex-col items-center justify-between">
      <div className="w-full flex-1 flex flex-col justify-center items-center bg-black">
        <LogoCard />
        <button
          onClick={handleStart}
          className="mt-10 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold rounded-md px-8 py-3 text-lg shadow-lg"
        >
          Let's start
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
