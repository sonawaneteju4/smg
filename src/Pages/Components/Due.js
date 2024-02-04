import React, { useEffect, useState } from "react";
import {
  collection,
  getAggregateFromServer,
  getDocs,
  query,
  sum,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Due = ({ userId }) => {
  const [totalBills, setTotalBills] = useState(0);
  const CreditBillRef = collection(db, "creditBill");
  const q = query(CreditBillRef, where("userId", "==", userId));

  useEffect(() => {
    const getTotalBills = async () => {
      const snapshot = await getAggregateFromServer(q, {
        billAmt: sum("dueBal"),
      });
      setTotalBills(snapshot.data().billAmt);
      console.log(snapshot.data().billAmt);
    };

    getTotalBills();
  }, [userId]); // Include userId in the dependency array to re-run the effect when userId changes

  return <>{totalBills}</>;
};

export default Due;
