import React from 'react';
import './App.css';
import HomeSplash from './pages/Home';
import SignupD  from './pages/signupDonor';
import SignupBen from './pages/SignupBen';
import Under18 from './pages/under18';
import DonorsSubmit from './pages/DonorsSubmitPage';
import Beneficiarysubmit from './pages/BeneficiariesSubmitPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeSplash />}/>
        <Route path='/beneficiary' element={<Beneficiarysubmit/>}/>
        <Route path='/donor' element={<DonorsSubmit />}/>
        <Route path='/18' element={< Under18/>}/>
        <Route path='/sud' element={<SignupD />}/>
        <Route path='/sub' element={<SignupBen />}/>
        {/* <Route path='/' element={< />}/> */}
        {/* <Route path='/' element={< />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
