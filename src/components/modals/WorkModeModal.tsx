const WorkModeModal = ({ openGift, exeValue, setOpenGift, quoteVal }: any) => {
  const spanStyles: any[] = [];

  for (let i: any = 1; i <= 15; i++) {
    spanStyles.push({ "--i": i });
  }
  return (
    <div className="flex flex-col items-center mt-24 relative gap-y-8">
      {" "}
      <div className="flex items-center justify-center relative">
        <p
          className={`bg-clip-text sm:w-[420px] font-mono font-bold font-italic text-transparent exercise-bg  text-center w-[300px]  transition-all absolute ${
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
        <span className="w-[300px] text-center  sm:w-full bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 ">
          {quoteVal?.quote}
        </span>{" "}
        "
      </h2>
      <p className="w-[300px] text-center sm:w-full">
        It's break time now, tap on the gift box :)
      </p>
    </div>
  );
};

export default WorkModeModal;
