import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import LogoCard from "../components/cards/LogoCard";
import ForgetPasswordCard from "../components/cards/ForgetPasswordCard";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    passwordCheck: "",
  });

  const [recoveryDetails, setRecoveryDetails]: any = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    setRecoveryDetails({ userId, secret });

  }, []);

  const resetUser = async () => {
    const promise = account.updateRecovery(
      recoveryDetails.userId,
      recoveryDetails.secret,
      user.password,
      user.passwordCheck
    );

    promise.then(
      function () {
        toast.success(
          "Password reset successfull! Login with updated password",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setTimeout(() => {
          navigate("/signin");
        }, 3000); // Success
      },
      function (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        }); // Failure
      }
    );
  };

  return (
    <div className="bg-black sm:h-[100vh] flex flex-col items-center">
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
        <ForgetPasswordCard
          setUser={setUser}
          user={user}
          resetUser={resetUser}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ForgetPassword;
