import apiCalls from "./apiCalls";

const fetchCategoryWiseProducts = async (category) => {
  const dataResponse = await fetch(apiCalls.categoryWiseProduct.url, {
    method: apiCalls.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });

  const actualData = await dataResponse.json();
  return actualData;
};

export default fetchCategoryWiseProducts;
