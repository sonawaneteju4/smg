import React from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import QuickBar from "./CreditBills/QuickBar";
import CustomerInfo from "./Components/CustomerInfo";

const Dashboard = () => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <>
      <>

      </>
      <div className="m-5">
        <QuickBar />
      </div>
      <hr />
      <div className="mx-5">
        <CustomerInfo />
      </div>
    </>
  );
};

export default Dashboard;
