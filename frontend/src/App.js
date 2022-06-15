import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Header from "./pages/Header";
import Home from "./pages/Home";
import SignupD from "./pages/signupDonor";
import SignupBen from "./pages/SignupBen";
import SignIn from "./pages/signin";
import Under18 from "./pages/under18";
import DonorsSubmit from "./pages/DonorsSubmitPage";
import Beneficiarysubmit from "./pages/BeneficiariesSubmitPage";
import GridDonor from "./pages/GridDonor";
import GridBen from "./pages/GridBen";
import ProfilePage from "./pages/ProfilePage";
import Copyright from "./pages/Copyright";
import proxy from "./pages/config";
// import { getModalUtilityClass } from "@mui/material";
import ProtectedRoute from "./pages/RouteProtection";

export const ValueContext = createContext();
export const SetValueContext = createContext();

export function getAge(dateString) {
  var ageInMilliseconds = new Date() - new Date(dateString);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
}

function App() {
  const [userData, setUserData] = useState({
    donor: {
      token: null,
      firstname: null,
      lastname: null,
      email: null,
      birthdate: null,
      address: null,
      phone: null,
      bloodtype: null,
      alcoholpass: null,
      drugpass: null,
    },
    beneficiary: {
      token: null,
      centerName: null,
      medicalZone: null,
      email: null,
      phoneNumber: null,
      address: null,
    },
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("edak-blood-token");
      if (token === null) {
        localStorage.setItem("edak-blood-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        `${proxy}/common/tokenIsValid`,
        null,
        { headers: { "edak-blood-token": token } }
      );
      if (tokenResponse.data.firstname) {
        // means the user is a donor
        setUserData({
          token,
          firstname: tokenResponse.data.firstname,
          lastname: tokenResponse.data.lastname,
          email: tokenResponse.data.email,
          birthdate: getAge(tokenResponse.data.birthdate),
          address: tokenResponse.data.address,
          phone: tokenResponse.data.phone,
          bloodtype: tokenResponse.data.bloodtype,
          alcoholpass: tokenResponse.data.alcoholpass,
          drugpass: tokenResponse.data.drugpass,
        });
      }
      if (tokenResponse.data.centerName) {
        // means the user is a beneficiary
        setUserData({
          token,
          centerName: tokenResponse.data.centerName,
          medicalZone: tokenResponse.data.medicalZone,
          email: tokenResponse.data.email,
          phoneNumber: tokenResponse.data.phoneNumber,
          address: tokenResponse.data.address,
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
            <Route path="/donor-sign-up" element={<SignupD />} />
            <Route path="/beneficiary-sign-up" element={<SignupBen />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/-18" element={<Under18 />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/donor-submit" element={<DonorsSubmit />} />
              <Route path="/beneficiary-submit" element={<Beneficiarysubmit />}/>
              <Route path="/donors" element={<GridDonor />} />
              <Route path="/beneficiaries" element={<GridBen />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          <Copyright
          // sx={{ mt: 8, mb: 4 }}
          />
        </SetValueContext.Provider>
      </ValueContext.Provider>
    </Router>
  );
}

export default App;
