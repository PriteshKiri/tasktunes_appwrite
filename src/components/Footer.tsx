import { BsGithub } from "react-icons/bs";
import { ImLinkedin } from "react-icons/im";
import { GrTwitter } from "react-icons/gr";
const Footer = () => {
  return (
    <footer className="text-white flex flex-col sm:flex-row justify-between items-center w-[80%]  px-4 sm:px-6 pb-6 sm:pb-4 bdr-t pt-6 bg-black gap-y-6 sm:gap-y-0">
      <p className="text-sm text-gray-600 mr-4 text-center">
        © 2023 Tasktunes.{" "}
        <small className="text-sm">
          Made with &lt; 🧠 /&gt; by{" "}
          <a
            href="https://twitter.com/PriteshKiri"
            className="text-white hover:underline"
          >
            Pritesh Kiri
          </a>
        </small>
      </p>
      <div className="text-white flex gap-x-6">
        <a
          href="https://twitter.com/PriteshKiri"
          target="_blank"
          className="hover:text-blue-500"
        >
          <GrTwitter />
        </a>

        <a
          href="https://github.com/PriteshKiri/tasktunes_appwrite"
          target="_blank"
          className="hover:text-blue-500"
        >
          <BsGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/pritesh-kiri/"
          target="_blank"
          className="hover:text-blue-500"
        >
          <ImLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
