import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setSpeakStatusAction } from "./TimerControlSlice";

import { excerciseData } from "../../data/excersie";
import { quotesData } from "../../data/quote";
import { motivationalQuotesData } from "../../data/motivationalQuotes";

import gif1 from "../../assets/gif1.gif";
import gif2 from "../../assets/gif2.gif";
import gif3 from "../../assets/gif3.gif";
import gif4 from "../../assets/gif4.gif";
import gif5 from "../../assets/gif5.gif";
import gif6 from "../../assets/gif6.gif";
import gif7 from "../../assets/gif7.gif";
import gif8 from "../../assets/gif8.gif";
import gif9 from "../../assets/gif9.gif";
import Instruction from "../../components/Instruction";

const GuideModal = () => {
  const [exeValue, setExeValue]: any = useState({});
  const [quoteVal, setQuotes]: any = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [motivationText, setMotivationText]: any = useState(false);
  const [motivationalQuoteVal, setMotivationalQuote]: any = useState({});
  const [newGif, setNewGif]: any = useState({});
  const dispatch = useDispatch();
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );
  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);
  const spanStyles: any[] = [];

  for (let i: any = 1; i <= 15; i++) {
    spanStyles.push({ "--i": i });
  }

  const gifdata = [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9];

  useEffect(() => {
    setExeValue(getRandomdata(excerciseData));
    setQuotes(getRandomdata(quotesData));
    setMotivationalQuote(getRandomdata(motivationalQuotesData));
    setNewGif(getRandomdata(gifdata));
    console.log(motivationalQuoteVal);
  }, []);

  function getRandomdata(data: any) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  return (
    <div className="flex justify-end ">
      <Button className="relative" onClick={() => setOpenModal(true)}>
        <BsInfoCircle className="text-white rounded-full w-[15px] h-[15px] absolute top-[15px]" />
      </Button>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        open={openModal || speakStatus}
        onClose={() => {
          if (!speakStatus) {
            setOpenModal(false);
          }
        }}
      >
        {!speakStatus ? (
          <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] h-[80vh] overflow-y-auto sm:w-[50vw] sm:h-[70vh] bg-white/95 shadow-2xl p-4 rounded-lg">
            {" "}
            <div className="flex justify-between">
              <div>🎧 TaskTunes</div>{" "}
              <MdClose
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              />
            </div>
            <Instruction />
          </Box>
        ) : (
          <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] h-[65vh] sm:h-[70vh] overflow-y-auto sm:w-[35vw] sm:h-[70vh] bg-white/95 shadow-2xl p-4 rounded-lg">
            <div className="flex flex-col items-center justify-start w-full h-full gap-y-6 relative">
              <div className=" w-full flex justify-end">
                <MdClose
                  className="cursor-pointer text-[20px]"
                  onClick={() => {
                    setOpenModal(false);
                    dispatch(setSpeakStatusAction(false));
                    setMotivationText(false);
                  }}
                />
              </div>

              {TimerMode === "work" ? (
                <div className="flex flex-col items-center mt-24 relative gap-y-8">
                  {" "}
                  <div className="flex items-center justify-center relative">
                    <p
                      className={`bg-clip-text sm:w-[500px] font-mono font-bold font-italic text-transparent exercise-bg  text-center w-[300px] sm:w-[90%] transition-all absolute ${
                        openGift
                          ? "opacity-100 bottom-12 text-[18px] "
                          : "opacity-0 -bottom-5 text-[10px] "
                      } `}
                    >
                      {exeValue?.exercise}
                    </p>
                  </div>
                  <div className="birthday-gift ">
                    <div className="gift">
                      <input id="click" type="checkbox" />
                      <label
                        className={`click ${openGift ? "" : "animate-pulse"}`}
                        htmlFor="click"
                        onClick={() => setOpenGift(!openGift)}
                      ></label>

                      <div className="sparkles">
                        <div className="spark1"></div>
                        <div className="spark2"></div>
                        <div className="spark3"></div>
                        <div className="spark4"></div>
                        <div className="spark5"></div>
                        <div className="spark6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="waviy text-[15px] sm:text-[30px]">
                    <span style={spanStyles[0]}>C</span>
                    <span style={spanStyles[1]}>O</span>
                    <span style={spanStyles[2]}>N</span>
                    <span style={spanStyles[3]}>G</span>
                    <span style={spanStyles[4]}>R</span>
                    <span style={spanStyles[5]}>A</span>
                    <span style={spanStyles[6]}>T</span>
                    <span style={spanStyles[7]}>U</span>
                    <span style={spanStyles[8]}>L</span>
                    <span style={spanStyles[9]}>A</span>
                    <span style={spanStyles[10]}>T</span>
                    <span style={spanStyles[11]}>I</span>
                    <span style={spanStyles[12]}>O</span>
                    <span style={spanStyles[13]}>N</span>
                    <span style={spanStyles[14]}>s</span>
                  </div>
                  <h2 className="text-xl">
                    "{" "}
                    <span className="w-[300px]  sm:w-full bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
                      {quoteVal?.quote}
                    </span>{" "}
                    "
                  </h2>
                  <p className="w-[300px] text-center sm:w-full">
                    It's break time now, tap on the gift box :)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-y-8 mt-16">
                  <div
                    className={`text-[28px]  items-center justify-center  ${
                      motivationText ? " bounce-in-top flex" : "hidden"
                    }`}
                  >
                    <span className=" bg-clip-text font-mono text-transparent exercise-bg italic font-bold  text-center w-[90%] ">
                      {motivationalQuoteVal?.motivationalQuote}
                    </span>{" "}
                  </div>
                  {!motivationText && (
                    <span
                      className="relative flex cursor-pointer mt-8"
                      onClick={() => setMotivationText(true)}
                    >
                      <span className="animate-ping absolute inline-flex w-[120px] h-[120px] rounded-full bg-sky-400 opacity-75"></span>

                      <span
                        className="click-btn-shadow font-mono text-sm relative text-center flex items-center justify-center rounded-full p-5 w-[120px] h-[120px] bg-sky-500 font-bold text-white/80 
drop-shadow-xl "
                      >
                        Click for Motivation
                      </span>
                    </span>
                  )}{" "}
                  {motivationText && (
                    <img
                      src={newGif}
                      alt="motivational gif"
                      width={400}
                      className="mt-4"
                    />
                  )}
                  {!motivationText && (
                    <p className="w-[90%] text-center mt-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-xl">
                      It's time to get back to work!
                    </p>
                  )}
                  {!motivationText && (
                    <p className="text-center pb-8">Tap on the but to get some motivation :)</p>
                  )}
                </div>
              )}
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default GuideModal;
