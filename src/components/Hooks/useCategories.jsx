import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function usecategories() {
   
  function getcategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  let categoriesQuery = useQuery({
    queryKey:["categories"],
    queryFn: getcategories,
    staleTime: 20000,
    refetchIntervalInBackground: false,
    select: (data)=>data.data.data

    
  })
  getcategories()
  console.log(getcategories);
  




  return (
    categoriesQuery
  )
}