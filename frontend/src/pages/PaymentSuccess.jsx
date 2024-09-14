import React from "react";
import SuccessGif from "../assest/Success.gif";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 rounded ">
        <img
          src={SuccessGif}
          alt="SuccessGif"
          width={150}
          height={150}
          className="mix-blend-multiply"
        />

        <p className="text-green-600 font-bold text-xl">Payment Successful</p>

        <Link
          to={"/order"}
          className="p-2 px-4 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
        >
          See Order Details
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
