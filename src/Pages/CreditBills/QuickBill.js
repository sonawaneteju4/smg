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
                  id="c_Type"
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
            <div className="m-5 bg-gray-200 rounded pb-2">
              <div className="text-center ">Customer : Tejas Sonawane</div>
              <div className="flex items-center">
                <div className="basis-1/2 text-center mx-5">
                  <button disabled="disabled" className="text-xs border-blue-100 border-2 bg-red-300/50 rounded-xl w-full text-center">
                    Privious Bill Amount <br /> 80009
                  </button>
                </div>
                <div className="basis-1/2 mx-5">
                <input
                  type="text"
                  name="searchInput"
                  id="searchInput"
                  className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Enter Bill Amount"
                  // onChange={handleChange}
                  required
                />
                <label
                  for="searchInput"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Enter Bill Amount</label>
                </div>
              
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickBill;
