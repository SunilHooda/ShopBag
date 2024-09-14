const discountCalculator = (price, sellingPrice) => {
  const discount = ((price - sellingPrice) / price) * 100;

  const disountPercentage = Math.round(discount) + "%";

  return disountPercentage;
};

export default discountCalculator;
