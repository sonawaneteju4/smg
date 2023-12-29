import React, { useState } from 'react';

const SignInForm = () => {
  const [userCredential, setuserCredential] = useState({ email: "", password: "" })
  const [errorMsg, setErrorMsg] = useState(false)

  const onChange = (e) => {
    setuserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setErrorMsg(true)
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userCredential.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name='password'
            type="password"
            placeholder="Password"
            value={userCredential.password}
            onChange={onChange}
            required
          />
        </div>
        <div className='mt-2 mb-2'>
          <small className="text-red-500 mt-2 font-extrabold  text-center">
            {errorMsg ? (<span>Contact Admin If Any Error While LogIn</span>):null}
          </small>
        </div>
        <div className="flex items-center justify-between">
          <button
            className=" hover:bg-black bg-black/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
