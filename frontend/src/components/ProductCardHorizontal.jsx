import React, { useContext, useEffect, useRef, useState } from "react";
import SectionHeadingHomePage from "./SectionHeadingHomePage";
import fetchCategoryWiseProducts from "../helpers/fetchCategoryWiseProducts";
import displayINRCurrency from "../helpers/displayCurrency";
import discountCalculator from "../helpers/discountCalculator";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context/context";

const ProductCardHorizontal = ({ category, mainText, boldText }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollElement = useRef();

  const cardSkeleton = new Array(13).fill(0);

  const fetchData = async () => {
    setLoading(true);
    const dataResponse = await fetchCategoryWiseProducts(category);
    setLoading(false);
    setData(dataResponse?.data);
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 350;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 350;
  };

  const context = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    context.fetchCartProductsCount();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" container mx-auto px-4 lg:px-5 my-6 relative ">
      <SectionHeadingHomePage mainText={mainText} boldText={boldText} />

      <div
        className="flex items-center gap-4 lg:ml-5 md:gap-6 overflow-scroll scrollbarHide transition-all duration-1000 scroll-smooth"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute md:left-0 lg:left-5 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? cardSkeleton.map((_, index) => {
              return (
                <div
                  key={`HorizontalCard-${index}`}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full">
                      {}
                    </h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  key={product?._id}
                  className="w-full min-w-[285px] md:min-w-[330px] max-w-[285px] md:max-w-[330px] h-40 md:h-44 bg-white rounded shadow flex"
                >
                  <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] max-w-[120px] md:max-w-[145px] ">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="object-scale-down h-full hover:scale-110 transition-all duration-500 "
                    />
                  </div>
                  <div className=" p-2 md:p-4 md:py-3 grid w-full gap-1 ">
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
                        {discountCalculator(
                          product?.price,
                          product?.sellingPrice
                        )}{" "}
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
              );
            })}
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
