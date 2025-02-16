import axios from 'axios'
import React from 'react'
import useBrands from '../Hooks/useBrands'

export default function Brands() {
  let { isError , isLoading , data, Error}= useBrands()


  return( <>
    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7 p-4'>
      {data?.map((brand, index) => (
        <div
          key={index}
          className='flex flex-col items-center p-4  border rounded-xl shadow-md hover:shadow-2xl cursor-pointer shadow-lime-600 transition-shadow'
        >
          <img
            src={brand.image}
            alt={brand.title}
            className='w-full h-24 object-contain mb-2'
          />
          <h3 className='text-gray-700 font-semibold'>{brand.title}</h3>
        </div>
      ))}
    </div>
    
    </>)
}



