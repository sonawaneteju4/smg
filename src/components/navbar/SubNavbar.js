import React from "react";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";

const SubNavbar = () => {
  return (
    <div className="px-10 py-1 flex justify-between items-center border-y">
      <ul className="flex gap-5 text-black  navItems_700">
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="/dashboard">Home</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="">Billing</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="">Customers</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="">Reminders</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="medicines">Medicines</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="">Collections</NavLink>
        </li>
        <li className="hover:text-orange-500 underline-hover">
          <NavLink to="">Cheques</NavLink>
        </li>
      </ul>
      <ul className="py-2">
        <Logout />
      </ul>
    </div>
  );
};

export default SubNavbar;
