import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Id, databases, storage } from "../appwrite/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserProfile = ({ name, email, userId }: any) => {
  const [image, setImage] = useState<any>();
  const [imgId, setImgID] = useState<string>("");

  //Upload the image to appwrite

  useEffect(() => {
    const files = databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_PROFILE_IMG_COLLECTION_ID
    );

    files
      .then((res) => {
        const fileDocs = res.documents.filter((i) => i?.userID === userId);
        setImgID(fileDocs[fileDocs.length - 1]?.fileID);
        console.log(fileDocs[fileDocs.length - 1]?.fileID);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.error(err);
      });
  }, []);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();

    const promise = storage.createFile(
      import.meta.env.VITE_STORAGE_BUCKET_ID,
      Id.unique(),
      image
    );

    promise.then(
      function (response) {
        setImgID(response.$id);

        const promise = databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_PROFILE_IMG_COLLECTION_ID,
          Id.unique(),
          { fileID: response.$id, userID: userId }
        );

        promise.then(
          function (response) {
            console.log(response); // Success
            toast.success("Profile picture uploaded successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          },
          function (error) {
            toast.error(error.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(error); // Failure
          }
        );
      },
      function (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error); // Failure
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);

      toast.success("Uploaded! Click on 'Save' to save your changes", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <>
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col items-center justify-center gap-y-4 p-4 z-[100px]">
        <div className="  rounded-full  relative w-[200px] h-[100px] flex items-center justify-center">
          {imgId ? (
            <img
              src={storage
                .getFilePreview(import.meta.env.VITE_STORAGE_BUCKET_ID, imgId)
                .toString()}
              alt="Card image cap"
              className="rounded-full border-[2px] border-black/40 w-[100px] h-[100px]"
            />
          ) : (
            <div className="flex items-center justify-center h-[100px] w-[100px] bg-white rounded-full border-[2px] border-black/60">
              <FaUser className="text-[40px] opacity-60 text-black " />
            </div>
          )}
          <label htmlFor="fileInput" className="absolute right-[72px] top-1.5">
            <MdOutlineModeEditOutline className="text-[25px] cursor-pointer text-white hover:text-black absolute  p-1 bg-[#666666] hover:bg-white rounded-full border-[2px] border-white hover:border-[#666666]" />
            <input
              onChange={(e: any) => handleFileSelect(e)}
              type="file"
              id="fileInput"
              className="hidden"
            />
          </label>{" "}
        </div>
        {/* {uploadMessage && (
        <p className="text-[10px] text-center text-teal-500 font-bold">
          Uploaded! Hit "Save" to save your changes.
        </p>
      )} */}
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-lg capitalize">{name}</p>
          <p>{email}</p>
        </div>

        <p
          onClick={(e: any) => uploadImage(e)}
          className="bg-blue-500 py-1 px-3 text-white rounded-md cursor-pointer"
        >
          save
        </p>
      </div>
    </>
  );
};

export default UserProfile;
