import React from "react";
import Logout from "./Components/Logout";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-12  w-screen bg-orange-500 flex  justify-between items-center px-5">
        <NavLink to=""
          className=" text-white file: lg:text-base sm:text-base "
          style={{ fontFamily: "Yatra One" }}
        >
          श्रीराम मेडिकल अँड सर्जिकल साक्री
        </NavLink>

        <Logout />
      </div>
    </>
  );
};

export default Navbar;
