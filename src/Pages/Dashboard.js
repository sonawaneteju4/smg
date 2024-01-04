import React from 'react'
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
    onAuthStateChanged(
        auth,
        (user) => {
          if (!user) {

            navigate("/");
          } 
        },
      );

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard