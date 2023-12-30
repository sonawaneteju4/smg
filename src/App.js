import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Login/LoginPage';
import Navbar from './Pages/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
