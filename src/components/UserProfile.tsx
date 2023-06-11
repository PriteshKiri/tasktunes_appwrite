import { useEffect, useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { account, databases, storage } from "../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

const UserProfile = ({ name, email, userId }: any) => {
  const [image, setImage]: any = useState();
  const [imgId, setImgID]: any = useState("");
  const [uploadMessage, setUploadMessage]: any = useState(false);

  //Upload the image to appwrite

  useEffect(() => {
    const files = databases.listDocuments(
      "647729ede7a0545acbb7",
      "64862c21131914cb132e"
    );

    files.then((res) => {
      const fileDocs = res.documents.filter((i) => i?.userID === userId);
      setImgID(fileDocs[fileDocs.length - 1]?.fileID);
    });
  }, []);

  const uploadImage = async (e: any) => {
    e.preventDefault();
    setUploadMessage(false);
    const promise = storage.createFile("6485dc6f68787cf86dfb", uuidv4(), image);

    promise.then(
      function (response) {
        setImgID(response.$id);

        const promise = databases.createDocument(
          "647729ede7a0545acbb7",
          "64862c21131914cb132e",
          uuidv4(),
          { fileID: response.$id, userID: userId }
        );

        promise.then(
          function (response) {
            console.log(response); // Success
          },
          function (error) {
            console.log(error); // Failure
          }
        );
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setUploadMessage(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 p-4 ">
      <div className="  rounded-full  relative w-[100px] h-[100px]">
        {imgId ? (
          <img
            src={storage
              .getFilePreview("6485dc6f68787cf86dfb", imgId)
              .toString()}
            alt="Card image cap"
            className="rounded-full border-[2px] border-black/40 w-[100px] h-[100px]"
          />
        ) : (
          <div className="w-full flex items-center justify-center h-[100px] bg-white rounded-full border-[2px] border-black/60">
            <FaUser className="text-[40px] opacity-60 text-black " />
          </div>
        )}
        <label htmlFor="fileInput" className="absolute right-5 top-1.5">
          <MdOutlineModeEditOutline className="text-[25px] cursor-pointer text-white hover:text-black absolute  p-1 bg-[#666666] hover:bg-white rounded-full border-[2px] border-white hover:border-[#666666]" />
          <input
            onChange={(e: any) => handleFileSelect(e)}
            type="file"
            id="fileInput"
            className="hidden"
          />
        </label>{" "}
      </div>
      {uploadMessage && (
        <p className="text-[10px] text-center text-teal-500 font-bold">
          Uploaded! Hit "Save" to save your changes.
        </p>
      )}
      <div className="flex flex-col justify-center items-center">
        <p>{name}</p>
        <p>{email}</p>
      </div>

      <p
        onClick={(e) => uploadImage(e)}
        className="bg-blue-500 py-1 px-3 text-white rounded-md cursor-pointer"
      >
        save
      </p>
    </div>
  );
};

export default UserProfile;
