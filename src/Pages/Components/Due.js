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
  const [dueAmount, setdueAmount] = useState(0);
  const [repayment, setrepayment] = useState(0)
  const CreditBillRef = collection(db, "creditBill");
  const q = query(
    CreditBillRef,
    where("userId", "==", userId) &&
      where("transactionType", "==", "credit")
  );
  const q2 = query(
    CreditBillRef,
    where("userId", "==", userId) &&
      where("transactionType", "==", "repayment")
  );

  useEffect(() => {
    const getdueAmount = async () => {
      const snapshot = await getAggregateFromServer(q, {
        billAmt: sum("dueBal"),
      });
      setdueAmount(snapshot.data().billAmt);
      console.log("userID -- " + userId + " --- " + snapshot.data().billAmt);
    };
    const getRepaymentAmount = async () => {
      const snapshot = await getAggregateFromServer(q2, {
        billAmt: sum("dueBal"),
      });
      setrepayment(snapshot.data().billAmt);
      console.log("userID -- " + userId + " --- " + snapshot.data().billAmt);
    };

    getdueAmount();
    getRepaymentAmount()
  }, [userId]); // Include userId in the dependency array to re-run the effect when userId changes

  return <>{(dueAmount)-(repayment)}</>;
};

export default Due;
