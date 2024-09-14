import React, { useEffect, useState } from "react";
import apiCalls from "../helpers/apiCalls";
import { Link } from "react-router-dom";
import SectionHeadingHomePage from "./SectionHeadingHomePage";

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const categoryLoading = new Array(7).fill(null);

  const fetchCategoryList = async () => {
    setLoading(true);
    const responseData = await fetch(apiCalls.categoryList.url);
    const actualData = await responseData.json();
    setLoading(false);
    setCategoryList(actualData.data);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <SectionHeadingHomePage mainText={"Shop by"} boldText={"Categories"} />
      <div className="flex items-center gap-4 lg:ml-5 sm:gap-6 lg:gap-10 justify-start lg:justify-around overflow-x-auto scrollbarHide">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-2 md:p-4 bg-slate-200 flex items-center justify-center animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryList.map((item, index) => {
              return (
                <Link
                  to={"/product-category?category=" + item?.category}
                  className="cursor-pointer flex flex-col items-center justify-center w-full"
                  key={item?._id}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full p-2 md:p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={item?.productImage[0]}
                      alt={item?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-110 md:hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize ">
                    {item?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
