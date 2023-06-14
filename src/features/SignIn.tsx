import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import LoginCard from "../components/cards/SignInCard";
import LogoCard from "../components/cards/LogoCard";
const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const getData = account.get();
    getData.then(
      () => {
        navigate("/");
      },
      () => {
        navigate("/signin");
      }
    );
  }, []);

  const LoginUser = async () => {
    const promise = account.createEmailSession(user.email, user.password);

    promise
      .then(() => {
        toast.success("Sign in successful! Welcome to Tasktunes", {
          position: toast.POSITION.TOP_CENTER,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div className="bg-black sm:h-[100vh] flex flex-col items-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full h-full flex flex-col sm:flex-row justify-around items-center bg-black gap-y-8 mt-4">
        <LogoCard />

        <LoginCard setUser={setUser} user={user} LoginUser={LoginUser} />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
