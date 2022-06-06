import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignupD from "./pages/signupDonor";
import SignIn from "./pages/signin";
import SignupBen from "./pages/SignupBen";
import Under18 from "./pages/under18";
import DonorsSubmit from "./pages/DonorsSubmitPage";
import Beneficiarysubmit from "./pages/BeneficiariesSubmitPage";
import GridUsers from "./pages/GridUsers";
// import ImageAvatars from "./pages/ProfilePage";
import ProfilePage from "./pages/ProfilePage";
import GridBen from "./pages/GridBen";

export const ValueContext = createContext();
export const SetValueContext = createContext();

function App() {
  const [userData, setUserData] = useState({
    centerName: "null",
    medicalZone: "null",
    email: "null",
    phoneNumber: null,
    address: "null",
  });

  return (
    <Router>
      <ValueContext.Provider value={userData}>
        <SetValueContext.Provider value={setUserData}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/beneficiary-submit" element={<Beneficiarysubmit />} />
            <Route path="/donor-submit" element={<DonorsSubmit />} />
            <Route path="/-18" element={<Under18 />} />
            <Route path="/donor-sign-up" element={<SignupD />} />
            <Route path="/beneficiary-sign-up" element={<SignupBen />} />
            <Route path="/donors" element={<GridUsers />} />
            <Route path="/beneficiaries" element={<GridBen />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </SetValueContext.Provider>
      </ValueContext.Provider>
    </Router>
  );
}

export default App;
