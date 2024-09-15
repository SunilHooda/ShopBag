import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../helpers/apiCalls";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayCurrency from "../helpers/displayCurrency";
import discountCalculator from "../helpers/discountCalculator";
import RelatedProductSection from "../components/RelatedProductSection";
import Context from "../context/context";
import addToCart from "../helpers/addToCart";

const SingleProductDetailsPage = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageSkeleton = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const navigate = useNavigate();
  const context = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    context.fetchCartProductsCount();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    context.fetchCartProductsCount();
    navigate("/cart");
  };

  const fetchProductDetails = async () => {
    setLoading(true);
    const responseData = await fetch(apiCalls.singleProductDetails.url, {
      method: apiCalls.singleProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const actualData = await responseData.json();
    setData(actualData.data);
    setActiveImage(actualData?.data?.productImage[0]);
  };

  const handleMouseHoverProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <div className="container mx-auto p-3 lg:px-8">
      <div className="min-h-[200px] flex flex-col md:flex-row gap-5 ">
        {/* product Image */}
        <div className="h-96 flex flex-col md:flex-row-reverse gap-4">
          {/*Main Image */}
          <div className=" h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative mx-auto py-2">
            {/* Main Pic */}
            <img
              src={activeImage}
              alt="activeProductImage"
              className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer md:cursor-zoom-in px-2 py-4 "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOutImage}
            />

            {/* Zoomed Image */}
            {zoomImage && (
              <div className="absolute hidden md:block min-w-[340px] min-h-[350px] lg:min-w-[500px] lg:min-h-[400px] overflow-hidden bg-slate-200 p-1 top-0 md:-right-[350px] lg:-right-[520px]">
                <div
                  className="w-full h-full md:min-w-[340px] md:min-h-[350px] lg:min-w-[500px] lg:min-h-[400px] mix-blend-multiply md:scale-105 lg:scale-115"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          {/* Side Images */}
          <div className="h-full mx-auto ">
            {loading ? (
              <div className=" h-full w-full flex gap-2 md:flex-col overflow-scroll scrollbarHide">
                {productImageSkeleton.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse "
                      key={"singleProductImageSkeleton" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-full flex gap-2 md:flex-col overflow-scroll scrollbarHide">
                {data?.productImage.map((imgURL, index) => {
                  return (
                    <div
                      className="h-16 w-16 md:h-20 md:w-20 bg-slate-200 rounded p-1"
                      key={imgURL + index}
                    >
                      <img
                        src={imgURL}
                        alt="singleProductImage"
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer "
                        onMouseEnter={() => handleMouseHoverProduct(imgURL)}
                        onClick={() => handleMouseHoverProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full">
              {" "}
            </h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
              <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-3 py-1 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName?.replace(/boAt/gi, "").trim()}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayCurrency(data.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayCurrency(data.price)}
              </p>
            </div>

            <p className="text-green-600 text-xl lg:text-2xl font-medium my-1 mt-[-6px]">
              {discountCalculator(data?.price, data?.sellingPrice)} off
            </p>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <RelatedProductSection
          category={data.category}
          mainText={"Related Products"}
          excludeProductId={params?.id}
        />
      )}
    </div>
  );
};

export default SingleProductDetailsPage;
