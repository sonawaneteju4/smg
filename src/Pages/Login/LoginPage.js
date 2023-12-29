import React from 'react'
import SignInForm from './SignInForm'

const LoginPage = () => {
    return (
        <div className='flex flex-row h-screen '>

            <div className='basis-1/2 bg-orange-500 flex flex-col items-center justify-center'>
                <div className='font-serif font-extrabold text-white text-4xl'>Brand Name</div>
                <div>Brand Info</div>
            </div>
            <div className='basis-1/2'>
                <SignInForm/>
            </div>
        </div>
    )
}

export default LoginPage