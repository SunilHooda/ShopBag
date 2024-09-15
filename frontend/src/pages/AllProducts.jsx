import React, { useEffect, useRef, useState } from "react";
import UploadProductModal from "../components/UploadProductModal";
import apiCalls from "../helpers/apiCalls";
import AdminProductCard from "../components/AdminProductCard";
import productCategory from "../helpers/productCategory";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages from the API
  const productsPerPage = 18;

  //For filtering and sorting
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Reference for the product container
  const productContainerRef = useRef(null);

  const getAllProducts = async (page = 1) => {
    try {
      const dataResponse = await fetch(
        `${apiCalls.allProducts.url}?page=${page}&limit=${productsPerPage}&sortBy=${sortBy}&category=${filterCategoryList.join(",")}`,
        {
          method: apiCalls.allProducts.method,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const actualData = await dataResponse.json();

      setAllProducts(actualData?.data || []);
      setTotalPages(actualData?.totalPages || 1); // Set total pages from the response
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage, sortBy, filterCategoryList]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      // Scroll the product container to the top
      if (productContainerRef.current) {
        productContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
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
  }, [selectedCategory]);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-green-500 hover:border-green-500 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Filter and Sort */}
      <div className="w-full h-10 pt-3 px-4 flex flex-row justify-around items-center gap-10 ">
        {/* Sort By */}
        <div className="relative w-full max-w-52">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 flex gap-1 items-center justify-between">
            Sort by
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="text-slate-500 hover:text-slate-700"
            >
              {sortDropdownOpen ? "▲" : "▼"}
            </button>
          </h3>

          {sortDropdownOpen && (
            <form className="text-xs md:text-sm flex flex-col gap-2 p-2 mt-2 bg-white border border-slate-300 absolute left-0 w-full z-40">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"date"}
                  checked={sortBy === "date"}
                  onChange={handleOnChangeSortBy}
                  className="cursor-pointer"
                />
                <label className="">Date - Newest First</label>
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
        <div className="relative w-full max-w-52">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 flex gap-1 items-center justify-between">
            Category
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="text-slate-500 hover:text-slate-700"
            >
              {filterDropdownOpen ? "▲" : "▼"}
            </button>
          </h3>

          {filterDropdownOpen && (
            <form className="text-xs md:text-sm flex flex-col gap-2 p-2 mt-2 bg-white border border-slate-300 absolute left-0 w-full z-40">
              {productCategory.map((categoryName, index) => (
                <div
                  className="flex items-center gap-3"
                  key={categoryName + index + "AllProducts"}
                >
                  <input
                    type="checkbox"
                    name={"category"}
                    value={categoryName?.value}
                    onChange={handleSelectedCategory}
                    checked={selectedCategory[categoryName?.value] || false}
                    className="cursor-pointer"
                  />
                  <label>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          )}
        </div>
      </div>

      {/** all products */}
      <div
        className="flex justify-center items-center lg:justify-start lg:items-start flex-wrap gap-5 py-2 mt-2 h-full md:h-[calc(100vh-290px)] md:overflow-y-scroll clientSideScrollbar"
        ref={productContainerRef}
      >
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

      {/** Pagination */}
      <div className="flex justify-center items-center py-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 rounded border-2 border-red-600 text-red-600 transition-all ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-500 hover:border-green-500 hover:text-white cursor-pointer"
          }`}
        >
          Previous
        </button>

        <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 rounded border-2 border-red-600 text-red-600 transition-all ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-500 hover:border-green-500 hover:text-white cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>

      {/** upload product component */}
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
