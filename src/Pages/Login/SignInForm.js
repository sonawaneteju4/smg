import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const SignInForm = ({ setisLoading }) => {
  const [alertMsg, setalertMsg] = useState("")
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
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        userCredential.email,
        userCredential.password
      );
      const user = userData.user;
      showPopAlert({title : "Logged In Success", icon :"success"})
      console.log(user)
      setalertMsg("Welcome Admin")
      setisLoading(false);

      nav("/dashboard");
      
    } catch (error) {
      showPopAlert({title : (error.message), icon :"error"})
      setalertMsg(error.message)
      setTimeout(()=>{
        setisLoading(false);
      },2000)
      console.log("Err---->" + error.message);
      setErrorMsg(error.message);
    }
  };
  function showPopAlert({title,icon}) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }
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

          <div className="relative z-0 w-full mb-5 group">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={userCredential.email}
                onChange={onChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Email
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
                type="password"
                name="password"
                value={userCredential.password}
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={onChange}
                required
              />
              <label
                for="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Password
              </label>
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
