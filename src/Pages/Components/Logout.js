import React from "react";
import { MdLogout } from "react-icons/md";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebaseConfig";


const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    alert("account LogOut");
    navigate("/");

  };
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
