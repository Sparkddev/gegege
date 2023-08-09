// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './auth/login';
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      
        
    </Routes>
  </BrowserRouter>


    </>
     
  );
}

export default App;
