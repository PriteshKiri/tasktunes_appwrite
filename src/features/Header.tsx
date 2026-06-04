import logo from "../assets/tt-logo.png";

const Header = () => {
  return (
    <div className="w-[100vw] flex justify-between items-start">
      <div
        className="w-[160px] p-2 flex justify-center items-center text-white bg-black opacity-60 rounded-md hover:opacity-80 cursor-pointer"
        onClick={() => {
          window.location.reload();
        }}
      >
        <img src={logo} alt="" className="w-[40px]" />
        <p className="text-white font-bold">
          Task<span className="text-[#1a9df0]">Tunes</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
