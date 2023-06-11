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
const GuideModal = () => {
  const [exeValue, setExeValue]: any = useState({});
  const [quoteVal, setQuotes]: any = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [motivationText, setMotivationText]: any = useState(false);
  const [motivationalQuoteVal, setMotivationalQuote]: any = useState({});
  const dispatch = useDispatch();
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );
  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);
  const spanStyles: any[] = [];

  for (let i: any = 1; i <= 15; i++) {
    spanStyles.push({ "--i": i });
  }

  useEffect(() => {
    setExeValue(getRandomdata(excerciseData));
    setQuotes(getRandomdata(quotesData));
    setMotivationalQuote(getRandomdata(motivationalQuotesData));
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
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] h-[80vh] overflow-y-auto sm:w-[50vw] sm:h-[70vh] bg-white/95 shadow-2xl p-4 rounded-lg">
          {!speakStatus ? (
            <>
              {" "}
              <div className="flex justify-between">
                <div>🎧 CodeNChill Guide</div>{" "}
                <MdClose
                  className="cursor-pointer"
                  onClick={() => setOpenModal(false)}
                />
              </div>
              <div>
                <span>
                  Dear <strong>Lo-Fi</strong> Lover 👋,
                </span>{" "}
                <br />
                <br />
                <span>
                  Welcome to <strong>CodeNChill</strong> , the one-stop tool to
                  take your <strong>productivity</strong> to the next level 🚀
                </span>
                <br />
                <br />
                <span>
                  Here, you can easily{" "}
                  <strong>play, pause , and shuffle</strong> your Lo-Fi tracks,
                  and adjust the<strong> volume</strong> or{" "}
                  <strong>mute </strong>the audio with just one click.
                </span>
                <br />
                <br />
                <span>
                  You can set the timer ⏱️ in <strong>three fixed ways</strong>,
                  or even set a <strong>custom timer</strong> to fit your
                  specific needs.Once the timer is activated, a{" "}
                  <strong>charming animation</strong> on timer dial and a
                  message tailored to the selected mode will be displayed at the
                  bottom of the screen. In addition, the title of your{" "}
                  <strong>browser tab</strong> will exhibit the timer.
                </span>
                <br />
                <br />
                <span>
                  If the timer is set for five minutes or less, you'll be in{" "}
                  <strong>rest </strong> mode, otherwise, you'll be in{" "}
                  <strong>work</strong> mode.
                </span>
                <br />
                <br />
                <span>
                  The key <strong>highlight</strong> of this tool is that it
                  will notify you with a <strong>voice alert</strong> 📢 once
                  the timer is over, reminding you to "rest" 🥤 or "get back to
                  work" 💻 based on your timer mode.
                </span>
                <br />
                <br />
                <span>
                  Our focus is on enhancing user <strong>accessibility</strong>,
                  thus we have provided several keyboard shortcut keys for your
                  convenience.:
                </span>
                <br />
                <br />
                <span>
                  <li>
                    ➜ Press <strong>'s'</strong> to shuffel the tracks
                  </li>
                  <li>
                    ➜ Press <strong>'Spacebar'</strong> to play/pause
                  </li>
                  <li>
                    ➜ Press <strong>'Next arrow key'</strong> for next track
                  </li>
                  <li>
                    ➜ Press <strong>'Back arroy key'</strong> for previouse
                    track
                  </li>
                  <li>
                    ➜ Press <strong>'m'</strong> to mute/unmute
                  </li>
                </span>
                <br />
                <span>
                  We have made every effort to ensure the reliability of this
                  tool, however, if you experience music playback issues such as
                  track freezing or failure to load, please try using the 's'
                  key on your keyboard to shuffle the track.
                </span>
                <br />
                <br />
                <span>
                  Thanks for reading this guide till the end. Let's{" "}
                  <strong>code and chill</strong> now 😉
                </span>
                <br />
                <br />
                <span>Happy hustling! 💪</span>
                <br />
                <br />
              </div>
            </>
          ) : (
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
                  <div className=" w-[500px] flex items-center justify-center relative">
                    <p
                      className={`bg-clip-text font-mono font-italic text-transparent exercise-bg  text-center w-[90%] transition-all absolute ${
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
                  <div className="waviy">
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
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
                      {quoteVal?.quote}
                    </span>{" "}
                    "
                  </h2>
                  <p className=" ">
                    It's break time now, tap on the gift box :)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-start gap-y-8">
                  <div
                    className={`text-[35px] flex items-center justify-center text-black/40 ${
                      motivationText
                        ? " bounce-in-top opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <span className=" otto font-mono text-white text-center w-[90%] ">
                      {motivationalQuoteVal?.motivationalQuote}
                    </span>{" "}
                  </div>

                  <span
                    className="relative flex cursor-pointer mt-8"
                    onClick={() => setMotivationText(true)}
                  >
                    {!motivationText && (
                      <span className="animate-ping absolute inline-flex w-[120px] h-[120px] rounded-full bg-sky-400 opacity-75"></span>
                    )}{" "}
                    <span
                      className="click-btn-shadow font-mono text-sm relative text-center flex items-center justify-center rounded-full p-5 w-[120px] h-[120px] bg-sky-500 font-bold text-white/80 
drop-shadow-xl "
                    >
                      {motivationText ? "Let's go!" : " Click for Motivation"}
                    </span>
                  </span>

                 {!motivationText && <p className="w-[90%] text-center mt-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-xl">
                    It's time to get back to work!
                  </p>}
                 {!motivationText && <p>Tap on the but to get some motivation :)</p>}
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GuideModal;
