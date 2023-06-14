import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../GoogleSignInButton";
import { account } from "../../appwrite/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const SignInCard = ({ setUser, user, LoginUser }: any) => {
  const navigate = useNavigate();
  const [resetPasswordFlag, setResetPasswordFlag] = useState(false);
  const handleForgetPassword = async () => {
    const promise = account.createRecovery(
      user.email,
      "https://www.tasktunes.net/resetpassword"
    );
    promise.then(
      function () {
        toast.success(
          "Password reset link sent to your email! Please check your inbox",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      },
      function (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    );
  };
  return (
    <div className=" p-8 sm:p-[50px] sm:bg-gradient-to-r  from-[#15283d] via-black to-[#0d2f2c] rounded-3xl">
      <div className="relative rounded-3xl sm:max-w-xl sm:mx-auto bg-black w-full h-full text-black sm:w-[500px] sm:height-[500px]">
        <div className="relative px-6 sm:px-4 py-24 sm:py-10 pt-[35px] shadow-lg rounded-3xl sm:p-10 sm:pb-20 text-white bg-black/60 bdr-all">
          <div className="max-w-md mx-auto">
            <ToastContainer
              position="top-center"
              autoClose={6000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <div>
              {!resetPasswordFlag ? (
                <h1 className="text-2xl font-semibold  text-left ">
                  Let's jump in to the{" "}
                  <span className="text-blue-400">Focus</span> mode!
                </h1>
              ) : (
                <h1 className="text-2xl font-semibold  text-left ">
                  Please Enter your
                  <span className="text-blue-400">Email</span>
                </h1>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 pt-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className=" w-full !bg-gray-700 !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] mt-[25px]"
                    placeholder="Email address"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
                {!resetPasswordFlag && (
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className=" w-full !bg-gray-700 !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] mt-[25px]"
                      placeholder="Password"
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                  </div>
                )}
                {!resetPasswordFlag ? (
                  <div className="relative flex gap-x-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4"
                      onClick={LoginUser}
                    >
                      Signin
                    </button>

                    <GoogleSignInButton />
                  </div>
                ) : (
                  <div className="relative flex gap-x-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4"
                      onClick={() => handleForgetPassword()}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
              {!resetPasswordFlag ? (
                <div className="relative flex flex-col gap-y-4">
                  <p
                    className="underline font-bold mt-2 hover:text-blue-500 cursor-pointer pb-8 pt-4"
                    onClick={() => setResetPasswordFlag(true)}
                  >
                    Forgot password ?
                  </p>
                  <p className="absolute top-20 ">
                    Not a TaskTunes user?{" "}
                    <span
                      onClick={() => {
                        navigate("/signup");
                      }}
                      className="underline font-bold mt-2 hover:text-blue-500 cursor-pointer"
                    >
                      Sign Up
                    </span>{" "}
                    now!
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <p className="absolute top-5 ">
                    Back to{" "}
                    <span
                      onClick={() => {
                        setResetPasswordFlag(false);
                      }}
                      className="underline font-bold mt-2 hover:text-blue-500 cursor-pointer"
                    >
                      SignIn
                    </span>{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
