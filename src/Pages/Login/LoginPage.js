import React, { useEffect, useState } from 'react'
import SignInForm from './SignInForm'
import Spinner from '../Spinner';

const LoginPage = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setisLoading(false);
        }, 3000);
      }, []);

    return (<>
        {isLoading && <Spinner/>}

        <div className='lg:flex lg:flex-row sm:flex-col h-screen '>
            
            <div className='basis-1/2  bg-orange-500 flex flex-col items-center justify-center'>
                <div className='font-serif font-extrabold text-white lg:text-4xl md:text-2xl m-1 sm:text-base '>Shriram Medical & Surgicals</div>
                <div className='font-extrabold font-serif text-white lg:text-2xl sm:text-base'>Sakri</div>
            </div>
            <div className='basis-1/2'>
                <SignInForm  setisLoading={setisLoading} />
            </div>
        </div>
    </>


    )
}

export default LoginPage