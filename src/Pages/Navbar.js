import React from 'react'
import Logout from './Components/Logout'


const Navbar = () => {


  return (<>

    <div className='h-12  w-screen bg-orange-500 flex  justify-between items-center px-5'>
      <div className=' text-white file: lg:text-xl sm:text-base font-semibold'>Shriram Medical & Surgicals  </div>
     <Logout/>
    </div>

  </>
  )
}

export default Navbar