import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "../styles/styles.css";
import AudioplayerContainer from "./AudioPlayerTracks/AudioplayerContainer";
import TrackControls from "./DisplayTrackControls/TrackControls";
import TimerContainer from "./Timer/TimerContainer";
import Header from "./Header";
import { useSelector } from "react-redux";
import TaskDrawer from "../components/drawers/TaskDrawer";

const Dashboard = () => {
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );

  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);

  const { width, height } = useWindowSize();
  return (
    <div className="overflow-y-auto grow p-0 color-change-5x">
      <div className="h-[100vh] relative flex flex-col justify-between items-center">
        {speakStatus && TimerMode === "work" && (
          <Confetti width={width} height={height} />
        )}
        <div className="w-full h-[10%] flex items-center justify-center p-4">
          <Header />
        </div>
        <div className=" bg-black  opacity-60 shadow-xl py-8 sm:py-4 px-1 sm:px-4  mb-4 sm:mb-0  flex  flex-col-reverse sm:flex-row justify-center items-center gap-6 z-50 w-[350px]  sm:w-[70vw] h-[630px]  sm:h-[65%]  rounded-lg  ">
          <AudioplayerContainer />
          <TimerContainer />
          <div className="fixed right-0 top-40">
            <TaskDrawer />
          </div>
        </div>
        <div className=" bg-black opacity-60 relative bottom-0 shadow-xl p-4 flex flex-row justify-around items-center gap-6  w-full h-[10vh]  px-4 sm:px-32">
          <TrackControls />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
