import React from 'react'
// import style from"./Layout.modules.C"
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';

export default function Layout() {
  return <>
    <Navbar/>
    <div className='container my-5 py-20 lg:py-12 overflow-hidden'><Outlet/></div>
    <Footer/>
    </>
}



