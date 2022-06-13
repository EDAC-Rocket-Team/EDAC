import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignupD from "./pages/signupDonor";
import SignIn from "./pages/signin";
import SignupBen from "./pages/SignupBen";
import Under18 from "./pages/under18";
import DonorsSubmit from "./pages/DonorsSubmitPage";
import Beneficiarysubmit from "./pages/BeneficiariesSubmitPage";
import GridDonor from "./pages/GridDonor";
// import ImageAvatars from "./pages/ProfilePage";
import ProfilePage from "./pages/ProfilePage";
import GridBen from "./pages/GridBen";
import Header from "./pages/Header";
import { getModalUtilityClass } from "@mui/material";
import proxy from './pages/config';
import Axios from "axios"; 

export const ValueContext = createContext();
export const SetValueContext = createContext();

function App() {
  const [userData, setUserData] = useState({
    donor: {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      passwordCheck: null,
      birthdate: null,
      address: null,
      phone: null,
      bloodtype: null,
      alcoholpass: null,
      drugpass: null
    },
    beneficiary: {
      centerName: null,
      medicalZone: null,
      email: null,
      phoneNumber: null,
      address: null,
    },
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        `${proxy}/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(`${proxy}/signin`, {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <ValueContext.Provider value={userData}>
        <SetValueContext.Provider value={setUserData}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/beneficiary-submit" element={<Beneficiarysubmit />} />
            <Route path="/donor-submit" element={<DonorsSubmit />} />
            <Route path="/-18" element={<Under18 />} />
            <Route path="/donor-sign-up" element={<SignupD />} />
            <Route path="/beneficiary-sign-up" element={<SignupBen />} />
            <Route path="/donors" element={<GridDonor />} />
            <Route path="/beneficiaries" element={<GridBen />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </SetValueContext.Provider>
      </ValueContext.Provider>
    </Router>
  );
}

export default App;
