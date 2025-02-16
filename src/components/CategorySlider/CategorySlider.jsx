import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


// import style from"./CategorySlider.modules.css"

export default function CategorySlider() {
  
  const [categorySlide, setcategorySlide] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8, // Default slides to show on larger screens
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 1000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets y pantallas medianas
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Móviles grandes
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Móviles pequeños
        settings: {
          slidesToShow: 2, // 2 en móviles pequeños
        },
      },
    ],
  };

  function getSlider(){
    axios
    .get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res) => {
      setcategorySlide(res.data.data);
      console.log("cateeessssssssssssssssssssssseee", categorySlide);
    });
}
useEffect(() => {
  getSlider();
}, []);

  return (
    <> 
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800
    bg-clip-text 
  p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
  
  
  <span className="inline-block animate-pulse ml-2">Shop Popular Categories</span>
</h2>
    <h2></h2>
      {
        <Slider {...settings} className="cursor-pointer ">
          {categorySlide?.map((categorie) => (
            <div key={categorie._id} className="w-full pb-5  ">
              <div className="w-full">
                <img
                  src={categorie?.image}
                  className="w-full h-[200px] rounded-lg p-2  object-fill md:object-cover"
                  alt=""
                />
             <div className=""> <h4 className=" font-bold mt-2 ">{categorie?.name}</h4></div>
              </div>
            </div>
          ))}
        </Slider>
      }
    </>
  );
}



