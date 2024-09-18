import React, { useEffect, useState, useRef } from "react";
import apiCalls from "../helpers/apiCalls";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const AllOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 5;

  // Reference for the orders container
  const ordersContainerRef = useRef(null);

  const fetchOrderDetails = async (page = 1) => {
    try {
      setLoading(true);
      const responseData = await fetch(
        `${apiCalls.allOrders.url}?page=${page}&limit=${ordersPerPage}`,
        {
          method: apiCalls.allOrders.method,
          credentials: "include",
        }
      );

      const actualData = await responseData.json();
      setLoading(false);
      setData(actualData?.data || []);
      setTotalPages(actualData?.totalPages || 1); // Set total pages from response
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      // Scroll the orders container to the top
      if (ordersContainerRef.current) {
        ordersContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="h-full md:h-[calc(100vh-137px)] md:overflow-y-scroll clientSideScrollbar">
      {loading && (
        <p className="mx-auto p-6 text-center font-medium text-xl">
          Loading...
        </p>
      )}
      {!data[0] && (
        <p className="mx-auto p-6 text-center font-medium text-xl">
          No Order Available
        </p>
      )}

      <div ref={ordersContainerRef} className="p-2 md:p-4 w-full">
        {data.map((item, index) => (
          <div key={item.userId + index} className="pb-6">
            <p className="font-medium text-lg">
              {moment(item.createdAt).format("LL")}
            </p>
            <div className="border rounded p-2 bg-slate-200">
              <div className="flex flex-col lg:flex-row justify-between">
                {/* Order Products */}
                <div className="grid gap-2">
                  {item?.productDetails.map((product, index) => (
                    <div key={product.productId + index} className="flex gap-3">
                      <img
                        src={product.image[0]}
                        alt="productImage"
                        className="w-24 h-24 md:w-28 md:h-28 border rounded object-scale-down p-2 mix-blend-multiply"
                      />
                      <div>
                        <div className="font-medium text-lg text-ellipsis line-clamp-1 pr-2">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-5 mt-1">
                          <div className="text-lg text-red-500">
                            {displayINRCurrency(product.price)}
                          </div>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/*Payment Details */}
                <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                  <div>
                    <div className="text-lg font-medium">Customer Email:</div>
                    <p className="ml-1">{item.email}</p>
                  </div>
                  <div>
                    <div className="text-lg font-medium">Payment Details:</div>
                    <p className="ml-1 capitalize">
                      Payment method:{" "}
                      {item.paymentDetails.payment_method_type[0]}
                    </p>
                    <p className="ml-1 capitalize">
                      Payment Status: {item.paymentDetails.payment_status}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-medium">Shipping Details:</div>
                    {item.shipping_options.map((shipping) => (
                      <div key={shipping.shipping_rate} className="ml-1">
                        Shipping Charge:{" "}
                        <span className="font-normal text-red-500">
                          ₹{shipping.shipping_amount}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-medium">
                    Total Amount:{" "}
                    <span className="font-normal text-red-500">
                      {displayINRCurrency(item.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/** Pagination */}
      <div className="flex justify-center items-center pb-4">
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
    </div>
  );
};

export default AllOrders;
