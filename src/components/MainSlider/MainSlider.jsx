/** @format */
import React from "react";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/images/slider-2.jpeg";
import Slider from "react-slick";

export default function CustomSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-3 mt-0">
      <div className="w-full md:w-3/4 p-3">
        <Slider {...settings} className="cursor-pointer ">
          <img src={slide1} className="w-full h-[250px] md:h-[400px] object-cover " alt="Main Slide" />
          <img src={slide4} className="w-full h-[250px] md:h-[400px] object-cover " alt="Main Slide" />
          <img src={slide3} className="w-full h-[250px] md:h-[400px] object-cover " alt="Main Slide" />
        </Slider>
      </div>

      <div className="w-full md:w-1/4 p-3 flex flex-col md:block">
        <img src={slide2} className="w-full py-1 h-[80px] md:h-[132px] object-cover " alt="Small Slide" />
        <img src={slide1} className="w-full py-1 h-[80px] md:h-[132px] object-cover " alt="Small Slide" />
        <img src={slide4} className="w-full py-1 h-[80px] md:h-[133px] object-cover " alt="Small Slide" />
      </div>
    </div>
  );
}
