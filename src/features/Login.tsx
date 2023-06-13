import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { User } from "../app.models";
import Footer from "../components/Footer";
import LoginCard from "../components/cards/LoginCard";
import LogoCard from "../components/cards/LogoCard";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res: User) => {
        console.log(res);
        navigate("/");
      },
      (err) => {
        navigate("/login");
        console.log(err);
      }
    );
  }, []);

  const LoginUser = async () => {
    const promise = account.createEmailSession(user.email, user.password);

    promise
      .then(() => {
        navigate("/");
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
        autoClose={5000}
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

export default Login;
