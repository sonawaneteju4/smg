import React, { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
// import Spinner from '../Spinner';

const LoginPage = () => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    });
  }, []);

  return (
    <>
      {/* {isLoading && <Spinner/>} */}
      <div className="lg:flex lg:flex-row sm:flex-col h-screen ">
        <div className="basis-1/2  bg-slate-200 flex flex-col items-center justify-center">
          {/* <img src="/SMG.png" alt="" height="200px"/> */}
          <div
            className="font-serif font-extrabold text-orange-500 lg:text-4xl md:text-2xl m-1 sm:text-base "
            style={{ fontFamily: "Yatra One" }}
          >
            श्रीराम मेडिकल अँड सर्जिकल{" "}
          </div>
          <div
            className="font-extrabold font-serif text-orange-500 lg:text-2xl sm:text-base"
            style={{ fontFamily: "Yatra One" }}
          >
            साक्री
          </div>
        </div>
        <div className="basis-1/2">
          <SignInForm setisLoading={setisLoading} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
