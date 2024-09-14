import React from "react";
import CancelGif from "../assest/Cancel.gif";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 rounded ">
        <img
          src={CancelGif}
          alt="SuccessGif"
          width={150}
          height={150}
          className="mix-blend-multiply"
        />

        <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>

        <Link
          to={"/cart"}
          className="p-2 px-4 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white"
        >
          Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
