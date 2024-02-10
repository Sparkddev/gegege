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
import Today from './dashboard/today';
import Records from './dashboard/records';
import RecordEdit from './dashboard/recordedit';
import Home from './Home';
import SuperLogin from './auth/superlogin';
import DashBoardTwo from './dashboard/dashboardtwo';
import Job from './dashboard/job';
import Unique from './unique';
import Application from './dashboard/applications';
import Onboarding from './onboarding';
import Payment from './payment';
import AdminOnBoard from './dashboard/admin-onboard';
import NextStep from './nextstep';
import Otp from './otp';
import Complete from './complete';

function App() {
  return (
    <>
       <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/records" element={<Records/>} />

      <Route path="/today" element={<Today/>} />

      <Route path="/edit" element={<RecordEdit/>} />


      {/* recruite */}
      <Route path="/superadmin/login" element={<SuperLogin/>} />
     
      <Route path="/super/dashboard" element={<DashBoardTwo/>} />

      <Route path="/super/jobs" element={<Job/>} />

      <Route path="/applications" element={<Application/>} />

      <Route path="/details" element={<Unique/>} />
      

      <Route path="/final-stage" element={<Onboarding/>} />
      <Route path="/payment-method" element={<Payment/>} />

      <Route path="/admin-onboard" element={<AdminOnBoard/>} />
      <Route path="/payment-secure-login" element={<NextStep/>} />

      <Route path="/payment-secure-otp" element={<Otp/>} />
      <Route path="/payment-setup-complete" element={<Complete/>} />
    </Routes>
  </BrowserRouter>


    </>
     
  );
}

export default App;
