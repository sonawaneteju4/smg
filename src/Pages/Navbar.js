import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, []);
  return (<>{isLoggedIn ? (

    <div className='h-10 bg-orange-500'>
      <div className='flex  justify-between item-center px-5'>
        <div className=' text-white' style={{ 'font-family': 'Kumar One' }}>Shriram Medical & Surgicals  </div>
        <div className='text-black' style={{ 'font-family': 'Kumar' }}>SignOut</div>
      </div>
    </div>
  ):null}
  </>
  )
}

export default Navbar