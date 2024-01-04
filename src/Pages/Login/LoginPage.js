import React from 'react'
import SignInForm from './SignInForm'

const LoginPage = () => {

    return (
        <div className='lg:flex lg:flex-row sm:flex-col h-screen '>

            <div className='basis-1/2  bg-orange-500 flex flex-col items-center justify-center'>
                <div style={{ 'font-family': 'Kumar One' }} className=' font-extrabold text-white lg:text-4xl md:text-2xl m-1 sm:text-base '>Shriram Medical & Surgicals</div>
                <div style={{ 'font-family': 'Kumar One' }} className='font-extrabold text-white lg:text-2xl sm:text-base'>Sakri</div>
            </div>
            <div className='basis-1/2'>
                <SignInForm />
            </div>
        </div>


    )
}

export default LoginPage