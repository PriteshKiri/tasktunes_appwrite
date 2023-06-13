import TTlogo from "../../assets/tasktunes_logo_animated.png";

const LogoCard = () => {
  return (
    <div className="logo mt-6 text-white">
      <div className="wrap">
        <div className="eye down"></div>
        <div className="eye down"></div>
      </div>
      <img src={TTlogo} className="animated_logo w-[250px]" alt="" />
      <h1 className="text-[60px] font-mono font-bold">
        Task
        <span className="bg-clip-text font-mono font-italic text-transparent exercise-bg">
          Tunes
        </span>
      </h1>
      <p>One stop to your productivity!</p>
    </div>
  );
};

export default LogoCard;
