import { useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite/appwriteConfig";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TTlogo from "../assets/tasktunes_logo_animated.png";
import { ToastContainer, toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpUser = async () => {
    const createAccount = account.create(
      uuidv4(),
      user.email,
      user.password,
      user.name
    );

    createAccount
      .then((resp) => {
        const createDoc = databases.createDocument(
          "647729ede7a0545acbb7",
          "64836eb4b4e4ec623236",
          uuidv4(),
          { todo: JSON.stringify([]), userID: resp?.$id }
        );

        createDoc
          .then(() => {
            const createSession = account.createEmailSession(
              user.email,
              user.password
            );
            createSession
              .then(() => {
                navigate("/profile");
                toast.error("oinnjnjn", {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
              .catch((e) => {
                toast.error(e.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      })
      .catch((e) => {
        toast.error(e.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
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
      <div className="w-full h-full flex flex-col bg-black gap-y-8">
        <div>
          <div className="logo mt-6 text-white">
            <div className="wrap">
              <div className="eye down"></div>
              <div className="eye down"></div>
            </div>
            <img src={TTlogo} className="animated_logo w-[250px]" alt="" />
            <h1 className="text-[60px] font-mono font-bold">
              Task
              <span className="bg-clip-text font-mono font-italic text-transparent exercise-bg">
                Tunes
              </span>
            </h1>
            <p>one stop to your productivity</p>
          </div>
          <div></div>
        </div>
        <div className="p-[80px]">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto bg-black w-full h-full text-black w-[500px] height-[500px]">
            <div className="absolute w-[500px] height-[500px] inset-0 bg-gradient-to-r from-blue-300 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-1 py-10 pt-[35px] shadow-lg sm:rounded-3xl sm:p-10 sm:pb-20 text-white bg-black bdr-all">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold  text-left ">
                    Welcome to the focus hub!
                  </h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 pt-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className=" w-full !bg-gray-700 !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] mt-[25px]"
                        placeholder="Enter your name"
                        onChange={(e) => {
                          setUser({ ...user, name: e.target.value });
                        }}
                      />
                    </div>

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
                    <div className="relative">
                      <button
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                        onClick={signUpUser}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <p className="absolute top-5 ">
                      Already a TaskTunes user?{" "}
                      <span
                        onClick={() => {
                          navigate("/");
                        }}
                        className="underline font-bold mt-2 hover:text-blue-500 cursor-pointer"
                      >
                        Sign In
                      </span>{" "}
                      now!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Signup Form with Floating Labels
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="name"
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={signUpUser}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SignUp;
