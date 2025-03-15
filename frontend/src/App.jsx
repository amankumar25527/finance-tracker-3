import React from 'react'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TrackExpense from './pages/TrackExpense.jsx';

const App = () => {
  
  return (
    <>
      <div>
        
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/trackExpense' element={<TrackExpense/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/signUp' element={<SignupPage/>}></Route>
          </Routes>
        <ToastContainer/>
      </div>
    </>
  )
};

export default App

