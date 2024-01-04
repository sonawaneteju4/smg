import React from 'react'
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    alert("account LogOut");
    navigate("/");
  };

  return (<>

    <div className='h-10 bg-orange-500'>
      <div className='flex  justify-between item-center px-5'>
        <div className=' text-white' style={{ 'font-family': 'Kumar One' }}>Shriram Medical & Surgicals  </div>
        <div className='text-black' onClick={logout} style={{ 'font-family': 'Kumar' }}>SignOut</div>
      </div>
    </div>

  </>
  )
}

export default Navbar