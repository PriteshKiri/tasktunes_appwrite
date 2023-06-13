const RestModeModal = ({
  motivationText,
  motivationalQuoteVal,
  setMotivationText,
  newGif,
}: any) => {
  return (
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
        <img src={newGif} alt="motivational gif" width={400} className="mt-4" />
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
