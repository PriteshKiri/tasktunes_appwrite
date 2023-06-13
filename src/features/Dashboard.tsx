import { useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "../styles/styles.css";
import AudioplayerContainer from "./AudioPlayerTracks/AudioplayerContainer";
import TrackControls from "./DisplayTrackControls/TrackControls";
import TimerContainer from "./Timer/TimerContainer";
import Header from "./Header";
import { User } from "../app.models";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/util/Loader";
import TaskDrawer from "../components/drawers/TaskDrawer";

const Dashboard = () => {
  const [userDetails, setUserDetails]: [User | null, any] =
    useState<User | null>(null);
  const navigate = useNavigate();
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );

  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);
  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res: User) => {
        setUserDetails(res);
      },
      (err) => {
        navigate("/login");
        console.log(err);
      }
    );
  }, []);

  const { width, height } = useWindowSize();
  return (
    <>
      {userDetails ? (
        <div className="overflow-y-auto grow p-0 color-change-5x">
          <div className="h-[100vh] relative flex flex-col justify-between items-center">
            {speakStatus && TimerMode === "work" && (
              <Confetti width={width} height={height} />
            )}
            <div className="w-full h-[10%] flex items-center justify-center p-4">
              <Header userDetails={userDetails} />
            </div>
            <div className=" bg-black  opacity-60 shadow-xl py-8 sm:py-4 px-1 sm:px-4  mb-4 sm:mb-0  flex  flex-col-reverse sm:flex-row justify-center items-center gap-6 z-50 w-[90vw]  sm:w-[70vw] h-[75%]  sm:h-[65%]  rounded-lg  ">
              <AudioplayerContainer />
              <TimerContainer />
              <div className="fixed right-0 top-40">
                <TaskDrawer userDetails={userDetails} />
              </div>
            </div>
            <div className=" bg-black opacity-60 relative bottom-0 shadow-xl p-4 flex flex-row justify-around items-center gap-6  w-full h-[10vh]  px-4 sm:px-32">
              <TrackControls />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
