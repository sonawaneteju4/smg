import React from 'react'
import SignInForm from './SignInForm'

const LoginPage = () => {
    
    return (
        <div className='lg:flex lg:flex-row sm:flex-col h-screen '>

            <div className='basis-1/2  bg-orange-500 flex flex-col items-center justify-center'>
                <div style={{'font-family': 'Kumar One'}} className=' font-extrabold text-white lg:text-4xl sm:text-xl'>Shriram Medical & Surgicals</div>
                <div style={{ 'font-family': 'Kumar One' }} className='font-extrabold text-2xl text-white'>Sakri</div>
            </div>
            <div className='basis-1/2'>
                <SignInForm/>
            </div>
        </div>
        
      
    )
}

export default LoginPage