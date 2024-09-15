import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import apiCalls from "../helpers/apiCalls";
import SingleCategoryProductCard from "../components/SingleCategoryProductCard";

const SingleCategoryProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //getting categories from url
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");

  //setting checked true in categories extracted from url
  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectedCategory, setSelectedCategory] = useState(
    urlCategoryListObject
  );
  const [filterCategoryList, setFilterCategoryList] =
    useState(urlCategoryListArray); // Initialize with URL categories

  const [sortBy, setSortBy] = useState("date");

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const responseData = await fetch(apiCalls.filterProduct.url, {
      method: apiCalls.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
        sortBy: sortBy,
      }),
    });
    const actualData = await responseData.json();
    setLoading(false);
    setData(actualData?.data || []);
  };

  const handleSelectedCategory = (e) => {
    const { value, checked } = e.target;

    setSelectedCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  //UseEffect for filtering by category
  useEffect(() => {
    const categoryArray = Object.keys(selectedCategory)
      .map((categoryKeyName) => {
        if (selectedCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(categoryArray);
    //format for url change when change on the checkbox
    const urlFormat = categoryArray.map((el, index) => {
      if (categoryArray.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectedCategory, navigate]);

  // Fetch data on initial render
  useEffect(() => {
    if (urlCategoryListArray.length > 0) {
      // Initial check for URL categories
      setFilterCategoryList(urlCategoryListArray);
      fetchData();
    }
  }, []); // Run on initial render

  // Fetch data whenever filterCategoryList or sortBy changes
  useEffect(() => {
    if (filterCategoryList.length > 0) {
      // Ensure categories are present before fetching
      fetchData();
    }
  }, [filterCategoryList, sortBy]);

  return (
    <div className="container mx-auto md:px-2 lg:px-8  md:min-h-[calc(100vh-130px)] md:max-h-[calc(100vh-130px)] md:overflow-hidden  ">
      <div className="flex flex-col md:grid grid-cols-[200px,1fr] pt-1 md:pt-[10px] ">
        {/* Sorting Filtering */}
        <div className="bg-white p-2 h-fit ">
          {/* Sort By */}
          <div className="relative">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 flex items-center justify-between">
              Sort by
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="text-slate-500 hover:text-slate-700"
              >
                {sortDropdownOpen ? "▲" : "▼"}
              </button>
            </h3>

            {sortDropdownOpen && (
              <form className="text-sm flex flex-col gap-2 py-2">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value={"date"}
                    checked={sortBy === "date"}
                    onChange={handleOnChangeSortBy}
                    className="cursor-pointer"
                  />
                  <label>Date - Newest First</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value={"asc"}
                    checked={sortBy === "asc"}
                    onChange={handleOnChangeSortBy}
                    className="cursor-pointer"
                  />
                  <label>Price - Low to High</label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value={"dsc"}
                    checked={sortBy === "dsc"}
                    onChange={handleOnChangeSortBy}
                    className="cursor-pointer"
                  />
                  <label>Price - High to Low</label>
                </div>
              </form>
            )}
          </div>

          {/* Filter by */}
          <div className="relative mt-2">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 flex items-center justify-between">
              Category
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="text-slate-500 hover:text-slate-700"
              >
                {filterDropdownOpen ? "▲" : "▼"}
              </button>
            </h3>

            {filterDropdownOpen && (
              <form className="text-sm flex flex-col gap-2 py-2">
                {productCategory.map((categoryName, index) => (
                  <div
                    className="flex items-center gap-3"
                    key={categoryName + index + "SingleCategoryProducts"}
                  >
                    <input
                      type="checkbox"
                      name={"category"}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectedCategory}
                      checked={selectedCategory[categoryName?.value]}
                      className="cursor-pointer"
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>

        {/* Products */}
        <div className=" p-2 md:p-0 md:pl-3">
          <p className="font-medium text-slate-800 text-lg py-2">
            Search Results : {data.length}
          </p>

          <div className="h-full md:min-h-[calc(100vh-190px)] md:overflow-y-scroll md:max-h-[calc(100vh-190px)] pb-[10px] clientSideScrollbar">
            {data.length !== 0 && !loading && (
              <SingleCategoryProductCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryProducts;
