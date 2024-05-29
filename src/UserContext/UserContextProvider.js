import React, { useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const UserContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [userCredential, setuserCredential] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signInWithEmailAndPassword(
        auth,
        userCredential.email,
        userCredential.password
      );
      const user = userData.user;
      showPopAlert({ title: "Loggin Success!", icon: "success" });
      console.log(user);
      setisLoading(false);

      nav("/admin/dashboard");
    } catch (error) {
      showPopAlert({
        title: error.message || "Something wen't worng. ",
        icon: "error",
      });
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
      console.log("Err---->" + error.message);
    }
  };

  function showPopAlert({ title, icon }) {
    Swal.close();
    Swal.fire({
      title: title,
      icon: icon,
      width: "400px",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }
  return (
    <UserContext.Provider
      value={{ userCredential, setuserCredential, handleSubmit }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
