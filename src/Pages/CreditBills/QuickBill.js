import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import Due from "../Components/Due";
import Swal from "sweetalert2";

const QuickBill = ({ onClick }) => {
  const [isPageNo, setisPageNo] = useState(true);
  const [userInput, setUserInput] = useState(0);
  const [customer, setcustomer] = useState([]);
  const [searchBillId, setsearchBillId] = useState("");
  const [billAmt, setbillAmt] = useState("");

  useEffect(() => {
    const getCustomer = async () => {
      const q = query(
        collection(db, "customers"),
        where("pageNo", "==", parseInt(userInput)) // Convert userInput to an integer if pageNo is a number
      );
      try {
        const querySnapshot = await getDocs(q);
        const customersData = [];
        querySnapshot.forEach((doc) => {
          customersData.push({ id: doc.id, data: doc.data() });
        });
        setcustomer(customersData);
        // Update the state with the fetched data
        if (customersData.length > 0) {
          // Assuming you want to set searchBillId to the first customer's ID
          setsearchBillId(customersData[0].id);
        } else {
          setsearchBillId(null); // Reset searchBillId if no customers are found
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    getCustomer();
    console.log(customer);
    console.log(userInput);
  }, [userInput]);
  
  const [handsBy, sethandsBy] = useState("self")
  const creditDockRef = collection(db, "creditBill");
  const addBill = async () => {
    try {
      if (billAmt !== 0 && billAmt !== "") {
        const AddCreditBill = await addDoc(creditDockRef, {
          dueBal: parseInt(billAmt),
          userId: searchBillId,
          transactionType: "credit",
          handsBy : handsBy,
          date: serverTimestamp(),
        });
        showPopAlert({
          title: `${billAmt} Added For ${customer[0].data.cName}`,
          icon: "success",
        });
        console.log("Credit Bill added successfully:", AddCreditBill);
        onClick();
        window.location.reload();
      }
      showPopAlert({
        title: `Add Amount `,
        icon: "error",
      });

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
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg z-20 w-96">
            <div className="flex justify-between items-center p-5 bg-sky-200 rounded-t-lg">
              <div className="">QuickBill</div>
              <div className="">
                <button
                  onClick={onClick}
                  className="text-red-500 hover:text-red-700"
                >
                  Close
                </button>
              </div>
            </div>
            <form className="flex mx-5 my-2">
              <div className="mx-2 w-20">
                <select
                  name="cType"
                  // value={customerData.cType}
                  // onChange={handleChange}
                  id="c_Type"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option className="" value="pageNo" selected>
                    Page No
                  </option>
                  {/* <option className="" value="phoneNO">
                    Phone No
                  </option> */}
                </select>
                <label
                  for="c_Type"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Customer Type
                </label>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="searchInput"
                  id="searchInput"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Search By Phone Or Page Number"
                  onChange={(event) => {
                    setUserInput(event.target.value);
                  }}
                  required
                />
                <label
                  for="searchInput"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Page Number
                </label>
              </div>
            </form>
            {customer.map((items) => (
              <div
                className="m-5 bg-gray-100/80 rounded pb-2"
                key={items.data.id}
              >
                <div className="text-center ">
                  Customer : {items.data.cName}
                </div>
                <div className="text-center">
                  <small className="text-center "> {items.data.cPhone}</small>
                </div>
                <div className="text-center">
                  <small className="text-center "> {items.data.village}</small>
                </div>
                <div className="flex items-center">
                  <div className="basis-1/2 text-center mx-5">
                    <button
                      disabled="disabled"
                      className="text-xs text-red-500 font-bold rounded-xl p-1"
                    >
                      Privious Bill Amount <br /> <Due userId={searchBillId} />
                    </button>
                  </div>
                  <div className="basis-1/2 mx-5">
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
                    <label
                      for="searchInput"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter New Due Amount
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-2">
                <label htmlFor="" className="mt-2 mx-1">Hands By : {" "}</label>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-40 text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name=""
                    id=""
                    placeholder="Hand By"
                    onChange={(e) => {sethandsBy(e.target.value)}}
                    value={handsBy}
                  />
                </div>
                <div className="my-2 mx-5">
                  <button
                    type="submit"
                    className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center"
                    onClick={addBill}
                  >
                    Submit
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

export default QuickBill;
