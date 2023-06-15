import { useEffect, useState } from "react";
import { getRandomdata } from "../../util/util";
import gif1 from "../../assets/gif1.gif";
import gif2 from "../../assets/gif2.gif";
import gif3 from "../../assets/gif3.gif";
import gif4 from "../../assets/gif4.gif";
import gif5 from "../../assets/gif5.gif";
import gif6 from "../../assets/gif6.gif";
import gif7 from "../../assets/gif7.gif";
import gif8 from "../../assets/gif8.gif";
import gif9 from "../../assets/gif9.gif";
import { motivationalQuotesData } from "../../data/motivationalQuotes";

const RestModeModal = ({ motivationText, setMotivationText }: any) => {
  const [newGif, setNewGif]: any = useState({});
  const [motivationalQuoteVal, setMotivationalQuote]: any = useState({});
  const gifdata = [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9];

  useEffect(() => {
    setMotivationalQuote(getRandomdata(motivationalQuotesData));
    setNewGif(getRandomdata(gifdata));
  }, [motivationText]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-12 mt-8 mb-8">
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
          className="mt-4 h-[250px] pb-[15px]  sm:pb-[40px]"
        />
      )}
      {!motivationText && (
        <p className="w-[90%] text-center mt-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-xl">
          It's time to get back to work!
        </p>
      )}
      {!motivationText && (
        <p className="text-center pb-8">
          Tap on the but to get some motivation :)
        </p>
      )}
    </div>
  );
};

export default RestModeModal;
