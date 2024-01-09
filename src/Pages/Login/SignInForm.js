import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const SignInForm = ({setisLoading}) => {
  const [userCredential, setuserCredential] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const nav = useNavigate();

  onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);

        nav("/dashboard");
      }
    },
    []
  );

  const onChange = (e) => {
    setuserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        userCredential.email,
        userCredential.password
      );
      const user = userData.user;
      localStorage.setItem("userId", user.uid);
      setisLoading(false);
      nav("/dashboard");
    } catch (error) {
      setisLoading(false);
      console.log("Err---->" + error.message);
      setErrorMsg(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          style={{ backgroundColor: "#F0F3F4" }}
          className="lg:w-full max-w-md shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="text-center font-mono font-bold text-xl">
            <span>Login</span>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-mono ml-3 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow rounded-3xl appearance-none border-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={userCredential.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-mono ml-3 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border-2 rounded-3xl w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={userCredential.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mt-2 mb-2">
            <div className="text-red-500 mt-2 text-base text-center">
              {errorMsg}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className=" hover:bg-black bg-black/80 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
