import { account } from "../appwrite/appwriteConfig";
import { FaGoogle } from "react-icons/fa";
const GoogleSignInButton = () => {
  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    account.createOAuth2Session(
      "google",
      "https://www.tasktunes.net",
      "https://www.tasktunes.net/signin"
    );
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4 flex items-center justify-around gap-x-2"
      onClick={(e) => handleGoogleLogin(e)}
    >
      <FaGoogle /> Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
