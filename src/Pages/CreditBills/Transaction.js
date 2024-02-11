import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Transaction = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const pageSize = 5; // Adjust the page size as needed

  const fetchData = async () => {
    const dataRef = collection(db, "creditBill");
    let q = query(
      dataRef,
      where("userId", "==", userId),
      orderBy("date", "desc")
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    q = query(q, limit(pageSize));

    try {
      const querySnapshot = await getDocs(q);
      const transactionsData = [];

      querySnapshot.forEach((doc) => {
        transactionsData.push({ id: doc.id, data: doc.data() });
      });

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...transactionsData,
      ]);

      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastDoc(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]); // Include userId in the dependency array

  const handleLoadMore = () => {
    fetchData();
  };

  return (
    <div>
      <h1>Transactions:</h1>
      <div>
        {transactions.map((transaction) => (
          
            <div
              key={transaction.data.id}
              className={`${
                transaction.data.transactionType === "repayment"
                  ? "bg-lime-100"
                  : "bg-red-100"
              } p-1 m-1 rounded-md px-2 flex justify-between items-center`}
            >
              <div className="text-xs">
                Date : {formatDate(transaction.data.date)}
                <div>By : {transaction.data.handsBy}</div>
              </div>
              <div>
                Amount :{" "}
                <span
                  className={`${
                    transaction.data.transactionType === "repayment"
                      ? "text-green-800"
                      : "text-red-800"
                  } font-semibold`}
                >
                  {transaction.data.dueBal}
                </span>
              </div>
            </div>
          
        ))}
      </div>
      {lastDoc && (
        <div className="flex justify-center">
          <button onClick={handleLoadMore} className="text-sky-500 px-3">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default Transaction;
