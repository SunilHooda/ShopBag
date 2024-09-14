import apiCalls from "./apiCalls";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const responseData = await fetch(apiCalls.productAddToCart.url, {
    method: apiCalls.productAddToCart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });

  const actualData = await responseData.json();

  if (actualData.success) {
    toast.success(actualData.message);
  }

  if (actualData.error) {
    toast.error(actualData.message);
  }

  return actualData;
};

export default addToCart;
