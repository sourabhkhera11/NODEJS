import React from "react";
import NavBar from "./navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
