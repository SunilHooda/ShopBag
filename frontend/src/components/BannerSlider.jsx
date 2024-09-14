import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import Banner1 from "../assest/banner/Banner1.jpg";
import Banner2 from "../assest/banner/Banner2.webp";
import Banner3 from "../assest/banner/Banner3.webp";
import Banner4 from "../assest/banner/Banner4.webp";
import Banner5 from "../assest/banner/Banner5.jpg";
import Banner6 from "../assest/banner/Banner6.webp";

import BannerMobile1 from "../assest/banner/BannerMobile1.jpg";
import BannerMobile2 from "../assest/banner/BannerMobile2.webp";
import BannerMobile3 from "../assest/banner/BannerMobile3.webp";
import BannerMobile4 from "../assest/banner/BannerMobile4.jpg";
import BannerMobile5 from "../assest/banner/BannerMobile5.webp";
import BannerMobile6 from "../assest/banner/BannerMobile6.webp";

const banners = [
  {
    webImage: Banner1,
    mobileImage: BannerMobile1,
    alt: "Banner 1",
  },
  {
    webImage: Banner2,
    mobileImage: BannerMobile2,
    alt: "Banner 2",
  },
  {
    webImage: Banner3,
    mobileImage: BannerMobile3,
    alt: "Banner 3",
  },
  {
    webImage: Banner4,
    mobileImage: BannerMobile4,
    alt: "Banner 4",
  },
  {
    webImage: Banner5,
    mobileImage: BannerMobile5,
    alt: "Banner 5",
  },
  {
    webImage: Banner6,
    mobileImage: BannerMobile6,
    alt: "Banner 6",
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    console.log(index, "go to slide");
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (banners.length - 1 > currentIndex) {
        goToNext();
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-auto relative">
      <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
        <div className=" flex justify-between w-full text-2xl">
          <button
            onClick={goToPrevious}
            className="bg-white shadow-md rounded-full p-1"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={goToNext}
            className="bg-white shadow-md rounded-full p-1"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div className="h-full w-full flex overflow-hidden ">
        {banners.map((banner, index) => (
          <div
            key={banner + index}
            className="w-full h-full min-w-full min-h-full transition-all duration-1000 "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* Web Image */}
            <img
              src={banner.webImage}
              alt={banner.alt}
              className="hidden md:block w-full h-auto object-cover"
            />
            {/* Mobile Image */}
            <img
              src={banner.mobileImage}
              alt={banner.alt}
              className="block md:hidden w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10 w-fit mx-auto py-2 px-4 backdrop-blur-sm rounded-xl ">
        {banners.map((_, index) => (
          <button
            key={index + _}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-black"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
