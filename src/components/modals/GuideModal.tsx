import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setSpeakStatusAction } from "../../features/Timer/TimerControlSlice";

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
import Instruction from "./Instruction";
import WorkModeModal from "./WorkModeModal";
import RestModeModal from "./RestModeModal";

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
                <WorkModeModal
                  openGift={openGift}
                  exeValue={exeValue}
                  setOpenGift={setOpenGift}
                  quoteVal={quoteVal}
                />
              ) : (
                <RestModeModal
                  motivationText={motivationText}
                  motivationalQuoteVal={motivationalQuoteVal}
                  setMotivationText={setMotivationText}
                  newGif={newGif}
                />
              )}
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default GuideModal;
