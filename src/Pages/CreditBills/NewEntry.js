import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { CiUser } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import Due from "../Components/Due";
import Swal from "sweetalert2";
import Transaction from "./Transaction";

const NewEntry = ({ userId, closeModal }) => {
  const [customer, setCustomer] = useState([]);
  const docRef = doc(db, "customers", String(userId)); // userId is the document ID
  const [billAmt, setbillAmt] = useState(0);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const customerData = { id: docSnapshot.id, data: docSnapshot.data() };
          setCustomer([customerData]);
          // Assuming you want to set searchBillId to the document ID
        } else {
          console.log("no Custoemr found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCustomer();
    console.log(customer); // Move this inside useEffect after setCustomer
    console.log("userId" + userId);
  }, [userId]);
  const creditDockRef = collection(db, "creditBill");

  const handleButtonClick = (transactionType) => {
    addBill(transactionType);
  };


  const addBill = async (transactionType) => {
    try {
      if (billAmt !== 0 && billAmt !== "") {
        const AddNewBill = await addDoc(creditDockRef, {
          dueBal: parseInt(billAmt),
          userId: userId,
          transactionType: transactionType,
          handsBy: "self",
          date: serverTimestamp(),
        });

        let successMessage = `${billAmt} `;
        if (transactionType === "credit") {
          successMessage += `Added For ${customer[0].data.cName}`;
        } else if (transactionType === "repayment") {
          successMessage += `Repayment ${customer[0].data.cName}`;
        }

        showPopAlert({
          title: successMessage,
          icon: "success",
        });

        console.log("Transaction successful:", AddNewBill);
        closeModal();
      } else {
        showPopAlert({
          title: "Add Amount",
          icon: "error",
        });
      }

      // If you want to do something after adding the bill, you can place it here
    } catch (error) {
      console.error("Error adding credit bill:", error);
    }
  };

  function showPopAlert({ title, icon }) {
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
      {" "}
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg z-20">
            <div className="flex justify-between items-center p-5 bg-sky-200 rounded-t-lg w-96">
                <div>
                Transactions
                </div>
                <div className="text-red-500" onClick={closeModal}>
                    Close
                </div>
            </div>
            {customer.map((items) => (
              <div>
                <div className="flex justify-between items-center m-2 border-b">
                  <div>
                    <div className="flex items-center">
                      <div className="px-1">
                        <CiUser />
                      </div>
                      <div>{items.data.cName}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="px-1">
                        <CiPhone />
                      </div>
                      <div>{items.data.cPhone}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="px-1">
                        <CiLocationOn />
                      </div>
                      <div>{items.data.village}</div>
                    </div>
                  </div>
                  <div className="">
                    Total Due :{" "}
                    <span className="text-red-500 font-semibold">
                      <Due userId={userId} />
                    </span>
                  </div>
                </div>
                {/* Transactions */}
                <div className="border-b m-2">
                    <Transaction userId={userId}/>
                </div>
                {/* Create Transcation */}
                <div className="m-5">
                  {" "}
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Enter Bill Amount"
                    onChange={(e) => {
                      setbillAmt(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex justify-between m-2 gap-2">
                  <button
                    onClick={() => handleButtonClick("repayment")}
                    className="border-blue-500 border-2 bg-lime-200 rounded-xl w-full p-1 px-2 text-center text-sm"
                  >
                    Repayment
                  </button>
                  <button
                    onClick={() => handleButtonClick("credit")}
                    className="border-blue-500 border-2 bg-red-200 rounded-xl w-full p-1 px-2 text-center text-sm"
                  >
                    Add Due
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEntry;
