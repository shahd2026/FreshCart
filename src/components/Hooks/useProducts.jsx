import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function useProducts() {

    function getProductsQuery(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    } 

    let productsQuery =useQuery({
        queryKey:["products"],
        queryFn:getProductsQuery,
        retry:3,
        retryDelay:3000,
        refetchInterval: false,

    })

    
  return (
   productsQuery 
  )
}
