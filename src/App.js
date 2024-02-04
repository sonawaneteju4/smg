import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import Navbar from "./Pages/Navbar";
import Dashboard from "./Pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useOnlineStatus } from "./useOnlineStatus.js";
import NoInternet from "./NoInternet.js";

function App() {
  const [islogin, setislogin] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setislogin(false);
        console.log("userIsLogin" + islogin);
      } else {
        setislogin(true);
      }
    });
  }, [islogin]);

  function StatusBar() {
    const isOnline = useOnlineStatus();
    return <>{isOnline ?  (<></>):(<NoInternet/>) }</>;
  }
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <BrowserRouter>
        {islogin && <Navbar />}
        <StatusBar/>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
