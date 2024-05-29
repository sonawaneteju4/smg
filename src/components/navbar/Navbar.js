import React from "react";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="py-1 bg-slate-100 w-screen text-orange-500 flex items-center px-10">
        <NavLink
          to=""
          className="lg:text-lg sm:text-base "
          style={{ fontFamily: "Yatra One" }}
        >
          श्रीराम मेडिकल अँड सर्जिकल, साक्री
        </NavLink>
      </div>
    </>
  );
};
export default Navbar;
