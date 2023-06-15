import { FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import logo from "../assets/tt-logo.png";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { User } from "../app.models";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import UserProfile from "../components/UserProfile";
import { useState } from "react";
const Header = ({ userDetails }: { userDetails: User | null }) => {
  const navigate = useNavigate();
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const logout = async () => {
    try {
      await account.deleteSession("current");
      document.title = "TaskTunes | One stop to your Productivity";
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
      opacity: "90%",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",

      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

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
      <div className="flex gap-x-3">
        <HtmlTooltip
          disableHoverListener={true}
          open={tooltipIsOpen}
          onOpen={() => setTooltipIsOpen(true)}
          onClose={() => setTooltipIsOpen(false)}
          placement="left-end"
          title={
            <>
              <UserProfile
                name={userDetails?.name}
                email={userDetails?.email}
                userId={userDetails?.$id}
              />
            </>
          }
        >
          <div
            className={`hidden sm:flex h-[40px] w-[40px] p-1  justify-center items-center text-white bg-black opacity-60 hover:opacity-80 rounded-md cursor-pointer ${
              tooltipIsOpen ? "opacity-80" : ""
            }`}
            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
          >
            <FaRegUser className="text-[18px]" />
          </div>
        </HtmlTooltip>

        <div
          className="logout text-white bg-black flex gap-x-3 items-center p-[27px] sm:p-2 h-[40px] opacity-60 hover:opacity-80 rounded-md cursor-pointer"
          onClick={() => logout()}
        >
          <TbLogout className="text-[20px]" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
