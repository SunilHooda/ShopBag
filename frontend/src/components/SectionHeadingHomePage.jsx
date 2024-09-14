import React from "react";

const SectionHeadingHomePage = ({ mainText, boldText }) => {
  return (
    <div className="w-fit py-4 px-0 lg:px-4 cursor-text ">
      <h1 className="tracking-wider">
        <span className="font-medium text-xl md:text-2xl">{mainText} </span>
        <span className="font-bold text-2xl md:text-[28px] text-black">
          {boldText?.slice(0, -2)}
          <span className="underline decoration-red-500 underline-offset-4 ">
            {boldText?.slice(-2)}
          </span>
        </span>
      </h1>
    </div>
  );
};

export default SectionHeadingHomePage;
