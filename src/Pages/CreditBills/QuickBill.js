import React from "react";

const QuickBill = ({ onClick }) => {
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
                  id="customer_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option className="" value="pageNo" selected>
                    Page No
                  </option>
                  <option className="" value="phoneNO">
                    Phone No
                  </option>
                </select>
                <label
                  for="customer_name"
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
                  // onChange={handleChange}
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
            
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickBill;
