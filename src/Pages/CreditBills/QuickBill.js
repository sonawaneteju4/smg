import React from "react";

const QuickBill = ({onClick}) => {
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
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickBill;
