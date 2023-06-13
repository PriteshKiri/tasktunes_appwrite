import { useNavigate } from "react-router-dom";
import { account, databases, Id } from "../appwrite/appwriteConfig";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TTlogo from "../assets/tasktunes_logo_animated.png";
import { ToastContainer, toast } from "react-toastify";
import { GrTwitter } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpUser = async () => {
    const createAccount = account.create(
      Id.unique(),
      user.email,
      user.password,
      user.name
    );

    console.log("datbase id", import.meta.env.VITE_DATABASE_ID);

    createAccount
      .then((resp) => {
        const createDoc = databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_TASKS_COLLECTION_ID,
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
    <div className="bg-black h-[100vh] flex flex-col items-center">
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
      <div className="w-full h-full flex flex-row justify-around items-center bg-black gap-y-8 mt-4">
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
            <p>One stop to your productivity!</p>
          </div>
          <div></div>
        </div>
        <div className="p-[50px] bg-gradient-to-r  from-[#15283d] via-black to-[#0d2f2c] rounded-3xl">
          <div className="relative rounded-3xl sm:max-w-xl sm:mx-auto bg-black w-full h-full text-black w-[500px] height-[500px]">
            <div className="relative px-4 py-10 pt-[35px] shadow-lg sm:rounded-3xl sm:p-10 sm:pb-20 text-white bg-black/60 bdr-all">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold  text-left ">
                    Welcome to the <span className="text-blue-400">Focus</span>{" "}
                    hub!
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
                        className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4"
                        onClick={signUpUser}
                      >
                        Sign Up
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

      <footer className="text-white flex justify-between items-center w-[80%]  px-4 sm:px-6 sm:pb-4 bdr-t pt-6">
        <p className="text-sm text-gray-600 mr-4 text-center">
          © 2023 Tasktunes.{" "}
          <small className="text-sm">
            Made with &lt; 🧠 /&gt; by{" "}
            <a
              href="https://twitter.com/PriteshKiri"
              className="text-white hover:underline"
            >
              Pritesh Kiri
            </a>
          </small>
        </p>
        <div className="text-white flex gap-x-6">
          <a
            href="https://twitter.com/PriteshKiri"
            target="_blank"
            className="hover:text-blue-500"
          >
            <GrTwitter />
          </a>

          <a
            href="https://github.com/PriteshKiri/tasktunes_appwrite"
            target="_blank"
            className="hover:text-blue-500"
          >
            <BsGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/pritesh-kiri/"
            target="_blank"
            className="hover:text-blue-500"
          >
            <ImLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
