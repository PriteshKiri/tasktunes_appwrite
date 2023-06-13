import { useNavigate } from "react-router-dom";
import { account, databases, Id } from "../appwrite/appwriteConfig";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { User } from "../app.models";
import Footer from "../components/Footer";
import SignUpCard from "../components/cards/SignUpCard";
import LogoCard from "../components/cards/LogoCard";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res: User) => {
        console.log(res);
        navigate("/profile");
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
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
        <SignUpCard setUser={setUser} user={user} signUpUser={signUpUser} />
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
