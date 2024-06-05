import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll("section");

    let activeSection = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection = section;
      } else if (scrollPosition < top && scrollPosition + windowHeight > top) {
        activeSection = section;
      }
    });

    setActiveLink(activeSection ? activeSection.id.replace(/-/g, " ") : "");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);
    if (link === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(
        link.toLowerCase().replace(/ /g, "-")
      );
      if (element) {
        const headerHeight = document.querySelector("nav").offsetHeight;
        const topOffset =
          element.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed w-full">
      {/* <div className="py-1 bg-slate-100 w-screen text-orange-500 flex items-center px-10">
        <NavLink
          to=""
          className="lg:text-lg sm:text-base "
          style={{ fontFamily: "Yatra One" }}
          onClick={() => handleClick("")}
        >
          श्रीराम मेडिकल अँड सर्जिकल, साक्री
        </NavLink>
      </div> */}
      <ul className="flex gap-5 px-10 navItems_600 font-normal border-t bg-white py-2">
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "Products"
              ? "text-orange-500 "
              : "underline-hover text-orange-500 underline underline-offset-[7px]"
          }`}
          onClick={() => handleClick("")}
        >
          Shriram Medical & Surgical
        </Link>
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "Products" ? "text-orange-500" : "underline-hover"
          }`}
          onClick={() => handleClick("Products")}
        >
          Products
        </Link>
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "Offers" ? "text-orange-500 " : "underline-hover"
          }`}
          onClick={() => handleClick("Offers")}
        >
          Offers
        </Link>
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "Store & Dealership"
              ? "text-orange-500 "
              : "underline-hover"
          }`}
          onClick={() => handleClick("store-and-dealershil")}
        >
          Store & Dealership
        </Link>
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "WhatsApp Connect"
              ? "text-orange-500 "
              : "underline-hover"
          }`}
          onClick={() => handleClick("whatsapp-connect")}
        >
          WhatsApp Connect
        </Link>
        <Link
          to=""
          className={`hover:text-orange-500 ${
            activeLink === "SMG" ? "text-orange-500 " : "underline-hover"
          }`}
          onClick={() => handleClick("smg")}
        >
          SMG
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
