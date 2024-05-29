import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="">
        <ul className="flex gap-5 px-10 navItems_600 font-normal border-b py-2">
          <Link to="" className="hover:text-orange-500 underline-hover">
            All Medicine
          </Link>
          <Link to="" className="hover:text-orange-500 underline-hover">
            Offers
          </Link>
          <Link to="" className="hover:text-orange-500 underline-hover">
            Store & Dealership
          </Link>
          <Link to="" className="hover:text-orange-500 underline-hover">
            WhatsApp Connect
          </Link>
          <Link to="admin" className="hover:text-orange-500 underline-hover">
            SMG
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Home;
