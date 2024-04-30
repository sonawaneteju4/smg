import TransactionContext from "./TransactionContext";
import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
import { db } from "../../src/firebaseConfig";

const TransactionContextProvider = ({ children }) => {



  // const getDueAmount = async () => {
  //     try {
  //       const creditBillRef = collection(db, "creditBill");
  //       const q = query(
  //         creditBillRef,
  //         where("userId", "==", userId),
  //         where("transactionType", "==", "credit")
  //       );

  //       const snapshot = await getDocs(q);

  //       let totalDueAmount = 0;

  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         totalDueAmount += data.dueBal || 0;
  //       });

  //       setDueAmount(totalDueAmount);
  //     } catch (error) {
  //       console.error("Error fetching due amount:", error);
  //     }
  //   };

  //   const getRepaymentAmount = async () => {
  //     try {
  //       const creditBillRef = collection(db, "creditBill");
  //       const q = query(
  //         creditBillRef,
  //         where("userId", "==", userId),
  //         where("transactionType", "==", "repayment")
  //       );

  //       const snapshot = await getDocs(q);

  //       let totalRepayment = 0;

  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         totalRepayment += data.dueBal || 0;
  //       });

  //       setRepayment(totalRepayment);
  //     } catch (error) {
  //       console.error("Error fetching repayment amount:", error);
  //     }
  //   };

  return (
    <TransactionContext.Provider value={{}}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionContextProvider;
