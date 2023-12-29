import React, { useState } from 'react';

const SignInForm = () => {
  const [userCredential, setuserCredential] = useState({ email: "", password: "" })
  const [errMessage, seterrMessage] = useState("Contact Admin ")

  const onChange = (e) => {
    setuserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("submit")
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
{/*         
      <small className="text-red-500 mt-2 font-extrabold  text-center">
            errMessage
          </small> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name='password'
            type="password"
            placeholder="Password"
            value={userCredential.password}
            onChange={onChange}
            required
          />
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
