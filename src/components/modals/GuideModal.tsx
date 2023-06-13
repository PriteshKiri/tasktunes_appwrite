import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setSpeakStatusAction } from "../../slices/TimerControlSlice";

import { excerciseData } from "../../data/excersie";
import { quotesData } from "../../data/quote";

import Instruction from "./Instruction";
import WorkModeModal from "./WorkModeModal";
import RestModeModal from "./RestModeModal";

const GuideModal = () => {
  const [exeValue, setExeValue]: any = useState({});
  const [quoteVal, setQuotes]: any = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [motivationText, setMotivationText]: any = useState(false);
  const dispatch = useDispatch();
  const speakStatus = useSelector(
    (state: any) => state.TimerControl.speakStatus
  );
  const TimerMode = useSelector((state: any) => state.TimerControl.timerMode);

  useEffect(() => {
    setExeValue(getRandomdata(excerciseData));
    setQuotes(getRandomdata(quotesData));

    console.log();
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
                  setMotivationText={setMotivationText}
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
