import React, { useEffect, useState } from "react";
import UploadProductModal from "../components/UploadProductModal";
import apiCalls from "../helpers/apiCalls";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const dataResponse = await fetch(apiCalls.allProducts.url);

    const actualData = await dataResponse.json();
    console.log("allProducts", actualData);

    setAllProducts(actualData?.data || []);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-green-500 hover:border-green-500 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/**all product */}
      <div className="flex justify-center items-center lg:justify-start lg:items-start flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll clientSideScrollbar">
        {allProducts.map((product) => {
          return (
            <AdminProductCard
              data={product}
              key={product?._id}
              fetchData={getAllProducts}
            />
          );
        })}
      </div>

      {/**upload product component */}
      {openUploadProduct && (
        <UploadProductModal
          onClose={() => setOpenUploadProduct(false)}
          fetchData={getAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
