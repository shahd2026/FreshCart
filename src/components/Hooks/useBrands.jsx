import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function useBrands() {
   
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

  }
  let brandsQuery = useQuery({
    queryKey:["brands"],
    queryFn: getBrands,
    staleTime: 20000,
    refetchIntervalInBackground: false,
    select: (data)=>data.data.data

    
  })
  getBrands()
  console.log(getBrands);
  




  return (
    brandsQuery
  )
}
