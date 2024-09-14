import React from "react";
import { CgClose } from "react-icons/cg";

const EnlargeImage = ({ imageURL, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-slate-400 bg-opacity-45">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>

        <div className="flex justify-center p-2 max-w-[80vw] md:max-w-[80vh] max-h-[80vh]">
          <img src={imageURL} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default EnlargeImage;
