import React from "react";

const NoInternet = () => {
  return (
    <div className="spinner" >
      <div id="wrapper" className="">
        <div className="">
          <img
            src="/assets/no-wifi.png"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "33%",
            }}
            className="w-96"
          />
        </div>
        <div className=" text-center">
          <h3>You are offline...</h3>
        </div>
      </div>
    </div>
  );
};

export default NoInternet;
