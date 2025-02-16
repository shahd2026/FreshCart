import axios from 'axios'
import React from 'react'
import useCategories from './../Hooks/useCategories';

export default function Categories() {
  let { isError , isLoading , data, Error}= useCategories()


  return( <>
    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7 p-4'>
      {data?.map((category, index) => (
        <div
          key={index}
          className='flex flex-col items-center p-1  rounded-xl shadow-md hover:shadow-2xl cursor-pointer shadow-lime-600 transition-shadow'
        >
          <img
            src={category.image}
            alt={category.title}
            className='w-full h-50 object-cover '
          />
          <h3 className='text-gray-700 font-semibold'>{category.title}</h3>
        </div>
      ))}
    </div>
    
    </>)
}



