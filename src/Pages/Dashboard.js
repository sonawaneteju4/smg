import React from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import QuickBar from "./CreditBills/QuickBar";

const Dashboard = () => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <div>
      <div className="m-5">
        <QuickBar />
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;
