import React from 'react'
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";


const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    alert("account LogOut");
    navigate("/");
  };

  return (<>

    <div className='h-12 bg-orange-500 flex  justify-between items-center px-5'>
      <div className=' text-white file: lg:text-xl sm:text-base font-semibold'>Shriram Medical & Surgicals  </div>
      <div className='px-2 rounded-xl bg-slate-100 flex  justify-between items-center text-black lg:text-base sm:text-xs hover:cursor-pointer' onClick={logout} >
        <div>
          <MdLogout className='mx-1' />
        </div>
        <div>
          Logout
        </div>
      </div>
    </div>

  </>
  )
}

export default Navbar