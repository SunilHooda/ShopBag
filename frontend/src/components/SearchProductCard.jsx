import React, { useContext } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../helpers/displayCurrency";
import discountCalculator from "../helpers/discountCalculator";
import addToCart from "../helpers/addToCart";
import scrollToTop from "../helpers/scrollToTop";
import Context from "../context/context";

const SearchProductCard = ({ loading, data = [] }) => {
  const cardSkeleton = new Array(13).fill(null);

  const context = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    context.fetchCartProductsCount();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ">
      {loading
        ? cardSkeleton.map((_, index) => (
            <div
              key={`VerticalCard-${index}`}
              className="w-full bg-white rounded-sm shadow"
            >
              <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
              <div className="p-4 grid w-full gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 py-2 rounded-full">
                  {}
                </h2>
                <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full py-2 "></p>
                <div className="flex gap-3 w-full">
                  <p className="text-red-600 font-medium py-2 p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  <p className="text-slate-500 line-through p-1 py-2 bg-slate-200 w-full animate-pulse rounded-full"></p>
                </div>
                <button className="text-sm  text-white px-3 py-2 rounded-full w-full bg-slate-200 animate-pulse"></button>
              </div>
            </div>
          ))
        : data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              key={product?._id}
              className="w-full bg-white rounded shadow"
              onClick={scrollToTop}
            >
              <div className="bg-slate-200 h-52 p-4 flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="object-scale-down h-full hover:scale-110 transition-all duration-500 mix-blend-multiply"
                />
              </div>
              <div className="p-2 gap-2 md:gap-3 md:p-4 md:py-3 grid w-full">
                <div className="w-full h-fit flex flex-col">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-2 text-black">
                    {product?.productName?.replace(/boAt/gi, "").trim()}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                </div>

                <div className="flex flex-col w-full h-fit">
                  <span className="flex gap-3">
                    <p className="text-red-600 font-semibold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </span>
                  <p className="text-green-500 font-medium mt-[-4px]">
                    {discountCalculator(product?.price, product?.sellingPrice)}{" "}
                    off
                  </p>
                </div>

                <button
                  className="text-sm bg-red-600 hover:bg-red-700 h-8 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default SearchProductCard;
