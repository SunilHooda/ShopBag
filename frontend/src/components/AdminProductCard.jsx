import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProductModal from "./AdminEditProductModal";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded relative h-56">
      <div className="w-40">
        <div className="w-32 h-32 mx-auto flex justify-center items-center  ">
          <img
            src={data?.productImage[0]}
            alt=""
            className="mx-auto object-fill w-full h-full"
          />
        </div>
        <h1 className="text-ellipsis text-center line-clamp-2">
          {data.productName}
        </h1>

        <div>
          <p className="font-semibold text-center ">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="absolute top-2 right-2 w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProductModal
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
