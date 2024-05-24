import React from "react";
import Logout from "./Logout";
import { Link, NavLink } from "react-router-dom";

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
      <div className="px-10 py-1 flex justify-between items-center border-y">
        <ul className="flex gap-5 text-black  navItems_700">
          <li className="hover:text-orange-500 underline-hover">
            <Link to="">Billing</Link>
          </li>
          <li className="hover:text-orange-500 underline-hover">
            <Link to="">Customers</Link>
          </li>
          <li className="hover:text-orange-500 underline-hover">
            <Link to="">Reminders</Link>
          </li>
          <li className="hover:text-orange-500 underline-hover">
            <Link to="medicines">Medicines</Link>
          </li>
          <li className="hover:text-orange-500 underline-hover">
            <Link to="">Collections</Link>
          </li>
          <li className="hover:text-orange-500 underline-hover">
            <Link to="">Cheques</Link>
          </li>
        </ul>
        <ul className="py-2">
          <Logout />
        </ul>
      </div>
    </>
  );
};
export default Navbar;
