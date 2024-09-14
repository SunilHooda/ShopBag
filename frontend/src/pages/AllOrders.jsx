import React, { useEffect, useState } from "react";
import apiCalls from "../helpers/apiCalls";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const AllOrders = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const responseData = await fetch(apiCalls.allOrders.url, {
      method: apiCalls.allOrders.method,
      credentials: "include",
    });

    const actualData = await responseData.json();
    setData(actualData?.data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="h-[calc(100vh-137px)] overflow-y-scroll clientSideScrollbar ">
      {!data[0] && <p>No Order Available</p>}

      <div className=" p-2 md:p-4 w-full">
        {data.map((item, index) => {
          return (
            <div key={item.userId + index} className="pb-6">
              <p className="font-medium text-lg">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="border rounded p-2 bg-slate-100 ">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-2">
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className="flex gap-3 bg-white"
                        >
                          <img
                            src={product.image[0]}
                            alt="productImage"
                            className=" w-20 h-20 md:w-28 md:h-28 bg-slate-200 object-scale-down p-2 mix-blend-multiply "
                          />
                          <div>
                            <div className="font-medium text-lg text-ellipsis line-clamp-1 pr-2">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-5 mt-1">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(product.price)}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-medium">
                        Payment Details :{" "}
                      </div>
                      <p className=" ml-1 capitalize ">
                        Payment method :{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className=" ml-1 capitalize ">
                        Payment Status : {item.paymentDetails.payment_status}
                      </p>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        Shipping Details :
                      </div>
                      {item.shipping_options.map((shipping, index) => {
                        return (
                          <div key={shipping.shipping_rate} className=" ml-1">
                            Shipping Charge :{" "}
                            <span className="font-normal text-red-500">
                              ₹{shipping.shipping_amount}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-lg font-medium">
                      Total Amount :{" "}
                      <span className="font-normal text-red-500">
                        {displayINRCurrency(item.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
