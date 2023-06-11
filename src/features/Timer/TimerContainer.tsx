import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioStatusAction } from "../DisplayTrackControls/TrackControlSlice";
import GuideModal from "./GuideModal";
import { setSpeakStatusAction } from "./TimerControlSlice";
import { setTimerModeAction } from "./TimerControlSlice";

const TimerContainer = () => {
  const inputRef: any = useRef(null);
  const resetRef: any = useRef(null);
  const synth = window.speechSynthesis;

  // State from store
  const dispatch = useDispatch();
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );

  // In-component states
  const [currentTimer, setCurrentTimer] = useState("00:00");
  const [displayMessage, setDisplayMessage] = useState("⏰ Set your timer");
  const [intervalId, setIntervalId] = useState(0);
  // const [mode, setMode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);

  console.log("timerrrrr mode", TimerMode);

  const handleDisable = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        setDisabled(false);

        return;
      }
    }
    setDisabled(true);
  };

  // Handle speak on timer end
  useEffect(() => {
    if (speakStatus && TimerMode === "rest") {
      dispatch(audioStatusAction(false));
      const utterance = new SpeechSynthesisUtterance(
        "Get back to work! Get back to work! Get back to work!"
      );
      utterance.voice = synth.getVoices()[145];
      synth.speak(utterance);
    } else if (speakStatus && TimerMode === "work") {
      dispatch(audioStatusAction(false));
      const utterance = new SpeechSynthesisUtterance(
        "Congratulation on complted your task successfully! It's time to take some rest now."
      );
      utterance.voice = synth.getVoices()[145];
      synth.speak(utterance);
    }
  }, [speakStatus, TimerMode]);

  // Handle text in tab title
  useEffect(() => {
    document.title = `  ${
      currentTimer != "00:00"
        ? `${currentTimer} - Timer`
        : "ReacPlay - codeNchill"
    }`;
  }, [currentTimer]);

  const timerLogic = (seconds: any) => {
    clearInterval(intervalId);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayStatusMessage(then, seconds);
    dispatch(setSpeakStatusAction(false));
    const newIntervalId = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      displayTimeLeft(seconds);

      if (secondsLeft < 1) {
        dispatch(setSpeakStatusAction(true));

        resetRef.current.click();

        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleResetTimer = () => {
    clearInterval(intervalId);
    setCurrentTimer("00:00");
    setDisplayMessage("⏰ Set your timer");
    if (TimerMode === "work") {
      dispatch(setTimerModeAction("work"));
    } else {
      dispatch(setTimerModeAction("rest"));
    }
  };

  const displayTimeLeft = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displayTime = `${minutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    setCurrentTimer(displayTime);
  };

  const displayStatusMessage = (timestamp: any, time: any) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const timeStatus = hour > 12 ? "PM" : "AM";
    const minutes = end.getMinutes();
    // if (time <= 300) {
    // setMode("rest");
    if (TimerMode === "rest") {
      const textContent = ` 💻  Back to work at ${adjustedHour}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${timeStatus} `;
      setDisplayMessage(textContent);
    } else {
      // setMode("work");

      const textContent = ` 🥤 Take some rest at ${adjustedHour}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${timeStatus}`;
      setDisplayMessage(textContent);
    }
  };

  const startTimer = (inputTime: any) => {
    const seconds = parseInt(inputTime);
    timerLogic(seconds);
  };

  const customTime = (e: any) => {
    if (!disabled) {
      e.preventDefault();
      startTimer(e.target.elements.minutes.value * 60);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setDisabled(true);
    }
  };

  return (
    <div className=" w-full sm:w-1/2 h-[50%] sm:h-[100%] ">
      <GuideModal />

      {/* Timer display section */}
      <div className="h-[30%] mt-12 flex flex-col justify-center items-center">
        <div
          className={`w-[190px] h-[80px] bg-white flex  justify-center border-[5px] border-white items-center rounded-full ${
            currentTimer === "00:00" ? "" : "timer_dial"
          }`}
        >
          <div className="text-[30px] font-bold ">{currentTimer}</div>
        </div>
        <p className="display__end-time text-white text-xl sm:text-2xl font-extrabold mt-8">
          {displayMessage}
        </p>
      </div>
      {/* Timer setup section */}
      <div className="h-[57%] flex flex-col items-center justify-center gap-y-8">
        <div className="timer__controls flex flex-wrap justify-center items-center px-8">
          <button
            className="bg-white px-6 py-2 w-[50%] text-center rounded-tl-3xl border-b-2 border-r-2  border-slate-500 drop-shadow-2xl hover:opacity-80 focus:opacity-70"
            onClick={() => {
              dispatch(setTimerModeAction("rest"));
              startTimer("300");
            }}
          >
            Rest 5
          </button>
          <button
            className="bg-white px-6 py-2 w-[50%] rounded-tr-3xl border-b-2 border-l-2  border-slate-500 drop-shadow-2xl hover:opacity-80  focus:opacity-70"
            onClick={() => {
              dispatch(setTimerModeAction("work"));
              startTimer("900");
            }}
          >
            Quick 15
          </button>
          <button
            className="bg-white px-6 py-2 w-[50%] rounded-bl-3xl border-t-2 border-r-2  border-slate-500  drop-shadow-2xl hover:opacity-80 focus:opacity-70"
            onClick={() => {
              dispatch(setTimerModeAction("work"));
              startTimer("1500");
            }}
          >
            Focus 25
          </button>

          <button
            className="bg-white px-6 py-2  w-[50%] rounded-br-3xl border-t-2 border-l-2  border-slate-500 drop-shadow-2xl hover:opacity-80 "
            ref={resetRef}
            onClick={() => {
              dispatch(setTimerModeAction(""));
              handleResetTimer();
            }}
          >
            Reset
          </button>
        </div>
        {/* Mode display */}
        <div className="text-black font-bold w-[190px] h-[40px] flex bg-white rounded-md p-1">
          <p
            className={`w-[50%] py-1 flex justify-center items-center cursor-pointer rounded-md ${
              TimerMode === "work" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => dispatch(setTimerModeAction("work"))}
          >
            Work
          </p>
          <p
            className={`w-[50%] py-1 flex justify-center items-center cursor-pointer rounded-md ${
              TimerMode === "rest" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => dispatch(setTimerModeAction("rest"))}
          >
            Rest
          </p>
        </div>

        {/* Custom input */}
        <form
          className="flex justify-center items-center w-[70%]"
          onSubmit={(e) => customTime(e)}
        >
          <input
            className="p-2 pl-4 rounded-l-3xl"
            min={0}
            name="minutes"
            placeholder="Enter Minutes"
            ref={inputRef}
            type="number"
            onChange={() => handleDisable()}
          />
          <button
            className="bg-white rounded-r-3xl p-2 border-l-4 border-slate-500 hover:opacity-80 disabled:opacity-75"
            disabled={disabled}
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default TimerContainer;
