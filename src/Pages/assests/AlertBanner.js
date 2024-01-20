import React from "react";

export function AlertBanner({className="red", alertMsg="Error"}) {


  return (
    <>
      <div className={`rounded-md border-l-4 border-${className}-500  bg-${className}-100 p-4`}>
        <div className="flex items-center justify-between space-x-4">
          <div>{/* <AlertTriangle className="h-6 w-6 text-red-600" /> */}</div>
          <div>
            <p className={`text-sm font-medium text-${className}-600`}>
             {alertMsg}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
