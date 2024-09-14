import React, { useContext, useEffect, useState } from "react";
import apiCalls from "../helpers/apiCalls";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import Context from "../context/context";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cartSkeleton = new Array(4).fill(null);

  const context = useContext(Context);

  const fetchCartData = async () => {
    const responseData = await fetch(apiCalls.viewCartProducts.url, {
      method: apiCalls.viewCartProducts.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const actualData = await responseData.json();

    if (actualData.success) {
      setData(actualData.data);
    }
  };

  const handleLoading = async () => {
    await fetchCartData();
  };

  const increaseProductQuantity = async (id, qty) => {
    const responseData = await fetch(apiCalls.updateCartProduct.url, {
      method: apiCalls.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const actualData = await responseData.json();

    if (actualData.success) {
      fetchCartData();
    }
  };

  const decreaseProductQuantity = async (id, qty) => {
    if (qty >= 2) {
      const responseData = await fetch(apiCalls.updateCartProduct.url, {
        method: apiCalls.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const actualData = await responseData.json();

      if (actualData.success) {
        fetchCartData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const responseData = await fetch(apiCalls.deleteCartProduct.url, {
      method: apiCalls.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const actualData = await responseData.json();

    if (actualData.success) {
      fetchCartData();
      context.fetchCartProductsCount();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );

    const responseData = await fetch(apiCalls.payment.url, {
      method: apiCalls.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const actualData = await responseData.json();

    if (actualData?.id) {
      stripePromise.redirectToCheckout({ sessionId: actualData.id });
    }
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto">
      {data.length === 0 && !loading && (
        <div className=" w-full py-6 ">
          <p className="bg-white text-center text-lg py-5">No Data</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-3 py-2 lg:px-8 ">
        {/* View Cart Products */}
        <div className="w-full max-w-3xl">
          {loading
            ? cartSkeleton?.map((_, index) => {
                return (
                  <div
                    key={`CartProductCard-${index}`}
                    className="w-full bg-slate-200 h-32 border my-2 border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "CartPage"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr] "
                  >
                    <div className="w-32 h-32 bg-slate-200 p-1">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt="ProductImage"
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>

                    <div className="px-4 py-2 relative ">
                      {/*delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className=" text-base md:text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName
                          ?.replace(/boAt/gi, "")
                          .trim()}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between gap-3 ">
                        <p className="text-red-600 font-medium text-base md:text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-base md:text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className={`border border-red-600 font-medium text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ${
                            product.quantity === 1
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }  `}
                          onClick={() =>
                            decreaseProductQuantity(
                              product?._id,
                              product?.quantity
                            )
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 font-medium text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded cursor-pointer"
                          onClick={() =>
                            increaseProductQuantity(
                              product?._id,
                              product?.quantity
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Cart Order Summary */}
        {data[0] && (
          <div className="w-full max-w-sm">
            {loading ? (
              <div className=" w-full h-36 bg-slate-200 border border-slate-300 animate-pulse "></div>
            ) : (
              <div className="h-36 my-2 bg-white flex flex-col gap-1 rounded ">
                <h2 className="text-white bg-red-600 font-medium text-base md:text-lg px-4 py-1 tracking-wide ">
                  Summary
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-blue-500 p-2 text-white text-base w-full mt-2 hover:text-[18px] hover:bg-blue-600 tracking-wider"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
