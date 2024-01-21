import React, { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Swal from "sweetalert2";

const CreateNewCustomer = ({ onClick }) => {
  const [customerData, setcustomerData] = useState({
    cName: "",
    cPhone: 0,
    village: "",
    pageNo: Number,
    cType: "",
  });
  const [opningBal, setOpningBal] = useState("");

  const usersCollectionRef = collection(db, "customers");
  const creditDockRef = collection(db, "creditBill");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is 'cPhone', convert the value to a number
    const updatedValue =
      name === "cPhone" || name === "pageNo" ? +value : value;

    setcustomerData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
    console.log(customerData);
  };
  const checkUniquePhone = async () => {
    const q = query(
      usersCollectionRef,
      where("cPhone", "==", customerData.cPhone) &&
        where("pageNo", "==", customerData.pageNo)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      // Check if cPhone is unique
      const isUnique = await checkUniquePhone();

      if (isUnique) {
        // Add a new customer
        const docRef = await addDoc(usersCollectionRef, customerData);
        console.log(customerData);
        console.log("Document written with ID:", docRef.id);
        const AddCreditBill = await addDoc(creditDockRef, {
          opningBal: opningBal,
          userId: docRef.id,
        });
        console.log(AddCreditBill);
        showPopAlert({title : "Customer added successfully!", icon :"success"})
        onClick();
      } else {
        showPopAlert({title : "Error: Customer Phone Or Page is not unique.", icon :"error"})
      }
    } catch (error) {
      console.error("Error adding customer:", error);
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
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <form
        className="flex items-center justify-center min-h-screen"
        onSubmit={handleData}
      >
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg z-20">
          <div className="flex justify-between items-center p-5 bg-sky-200 rounded-t-lg">
            <div className="">Create New Customer</div>
            <div className="">
              <button
                type="cancle"
                onClick={onClick}
                className="text-red-500 hover:text-red-700"
              >
                Close
              </button>
            </div>
          </div>

          <div className="w-96 m-2 px-5">
            {/* Customer Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="cName"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Customer Name
              </label>
            </div>
            {/* <div className="">
            <lable
              className="block text-gray-700 text-sm  ml-3 mb-2"
              htmlF0r="cName"
            >
              Customer Name
            </lable>
            <input
              className="shadow rounded-xl appearance-none border-2 p-1  w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cName"
              name="cName"
              type="cName"
              placeholder="Enter Customer Name"
              // value={userCredential.email}
              // onChange={onChange}
              required
            />
          </div> */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="cPhone"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="opningBal"
                value={opningBal}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-red-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={(e) => setOpningBal(parseInt(e.target.value, 10))}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Opning Balance
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="village"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Village{" "}
              </label>
            </div>
            <div className="flex flex-row">
              <div className="basis-1/2 mr-2">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="pageNo"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    required
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Page Number
                  </label>
                </div>
              </div>
              <div className="basis-1/2 mr-2">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="cType"
                    value={customerData.cType}
                    onChange={handleChange}
                    id="customer_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  >
                    <option value="" disabled selected>
                      Select Customer Type
                    </option>
                    <option className="family" value="family">
                      Customer Family
                    </option>
                    <option className="genral" value="genral">
                      Customer Genral SMS
                    </option>
                    <option className="basic" value="basic">
                      Customer Notify SMS
                    </option>
                  </select>
                  <label
                    for="customer_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Customer Type
                  </label>
                </div>
              </div>
            </div>
          </div>
          <hr className="border"></hr>
        
          <div className="my-2 mx-5">
            <button
              type="submit"
              className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center"
              // onClick={handleData}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCustomer;

// import React, { useState } from 'react';

// function App() {
//   const [value, setValue] = useState(0);

//   const handleKeyDown = (event) => {
//     // Preventing changing the input value via keyboard arrows
//     if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
//       event.preventDefault();
//     }
//   };

//   const handleChange = (event) => {
//     // Allowing changing the input value via direct input
//     setValue(event.target.value);
//   };

//   return (
//     <div className="relative">
//       <input
//         type="number"
//         name="quantity"
//         id="quantity"
//         className="block w-full bg-white border border-gray-300 py-2 px-3 rounded-md leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//         value={value}
//         onKeyDown={handleKeyDown}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

// export default App;
