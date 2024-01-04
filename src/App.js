import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Login/LoginPage';
import Navbar from './Pages/Navbar';
import Dashboard from './Pages/Dashboard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react';

function App() {
  const [islogin, setislogin] = useState(true)
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          setislogin(false);
          console.log("userIsLogin" + islogin)
        } else {
          setislogin(true);

        }
      },
    );
  }, [islogin])
  return (
    <>
      <BrowserRouter>
        {islogin && <Navbar />}
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
