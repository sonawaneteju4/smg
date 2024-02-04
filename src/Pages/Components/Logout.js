import React from "react";
import { MdLogout } from "react-icons/md";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebaseConfig";
import Swal from "sweetalert2";


const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    showPopAlert({title : "Logged Out", icon :"warning"})
        navigate("/");

  };
  function showPopAlert({title,icon}) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
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
      className="px-2 rounded-xl bg-slate-100 flex  justify-between items-center text-black lg:text-base sm:text-xs hover:cursor-pointer"
      onClick={handleLogout}
    >
      <div>
        <MdLogout className="mx-1" />
      </div>
      <div>Logout</div>
    </button>
  );
};

export default Logout;
