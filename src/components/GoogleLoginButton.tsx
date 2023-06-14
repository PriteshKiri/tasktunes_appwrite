import { account } from "../appwrite/appwriteConfig";

const GoogleLoginButton = () => {
  const handleGoogleLogin = (e: any) => {
    e.preventDefault();
    account.createOAuth2Session(
      "google",
      "https://www.tasktunes.net",
      "https://www.tasktunes.net/login"
    );
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4"
      onClick={(e) => handleGoogleLogin(e)}
    >
      Google
    </button>
  );
};

export default GoogleLoginButton;
