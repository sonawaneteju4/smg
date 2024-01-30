import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import CreateNewCustomer from "./CreateNewCustomer";
import QuickBill from "./QuickBill";

const QuickBar = () => {
  const [newCustomerModel, setnewCustomerModel] = useState(false);
  const [quickBill, setquickBill] = useState(false);
  const handleClick = () => {
    setnewCustomerModel(false); // Close the modal when clicked outside
    setquickBill(false);
  };
  return (
    <>
      <div className="lg:flex lg:flex-row sm:flex-col text-center">
        <div className="basis-1/2 mx-10 relative">
          <input
            type="text"
            className="border-black border-2 rounded-xl w-full p-2 pl-8"
            placeholder="Search Customer By Mobile Number Or Name"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="basis-1/2 lg:flex lg:mt-0 sm:mt-2">
          <div className="basis-1/2 mx-10 my-2 sm:my-10 lg:my-0 relative">
            <button
              className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center"
              onClick={() => {
                setquickBill(true);
              }}
            >
              <FaRegMoneyBill1 className="inline-block mr-2" />
              Quick Bill
            </button>
          </div>
          <div className="basis-1/2 mx-10 my-2 sm:my-10 lg:my-0 relative">
            <button
              className="border-blue-500 border-2 bg-sky-200 rounded-xl w-full p-2 text-center"
              onClick={() => {
                setnewCustomerModel(true);
              }}
            >
              <IoPersonAddOutline className="inline-block mr-2" />
              Add New Customer
            </button>
          </div>
        </div>
      </div>
      {newCustomerModel && <CreateNewCustomer onClick={handleClick} />}
      {quickBill && <QuickBill onClick={handleClick} />}
    </>
  );
};

export default QuickBar;
