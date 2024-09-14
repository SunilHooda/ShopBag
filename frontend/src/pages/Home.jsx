import React from "react";
import CategoryList from "../components/CategoryList";
import BannerSlider from "../components/BannerSlider";
import ProductCardHorizontal from "../components/ProductCardHorizontal";
import ProductCardVertical from "../components/ProductCardVertical";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <CategoryList />

      <ProductCardHorizontal
        category={"airdopes"}
        mainText={"Top Wireless"}
        boldText={"Earbuds"}
      />

      <ProductCardHorizontal
        category={"earphones"}
        mainText={"Bluetooth"}
        boldText={"Neckbands"}
      />

      <ProductCardVertical
        category={"mobiles"}
        mainText={"Popular"}
        boldText={"Handsets"}
      />

      <ProductCardVertical
        category={"camera"}
        mainText={"Popular"}
        boldText={"Cameras"}
      />

      <ProductCardVertical
        category={"headphones"}
        mainText={"Wireless"}
        boldText={"Headphones"}
      />

      <ProductCardHorizontal
        category={"speakers"}
        mainText={"Wireless"}
        boldText={"Speakers"}
      />

      <ProductCardVertical
        category={"watches"}
        mainText={"Smart"}
        boldText={"Watches"}
      />
    </div>
  );
};

export default Home;
