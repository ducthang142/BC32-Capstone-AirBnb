import React from 'react'
import Header from '../Header'
import { Outlet } from "react-router-dom";
import Footer from '../Footer';
import UpToTop from '../UpToTop/UpToTop';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <UpToTop />
    </>
  )
}

export default RootLayout