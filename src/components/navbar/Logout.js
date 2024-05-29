import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Swal from "sweetalert2";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    showPopAlert({ title: "Logged Out", icon: "warning" });
    navigate("/admin");
  };
  function showPopAlert({ title, icon }) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }
  return (
    <button
      className="px-2  rounded-full bg-white/90 text-black flex  justify-between items-center lg:text-base sm:text-xs hover:cursor-pointer"
      onClick={handleLogout}
    >
      <div className="flex hover:text-orange-500">
        <div>
          <AiOutlineUser className="mx-1 text-xl hover:font-bold" />
        </div>
        <div className="navItems_700 underline-hover ">Kalpesh D</div>
      </div>
    </button>
  );
};

export default Logout;
