import React, { createContext, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import SignupD from "./pages/signupDonor";
import SignIn from "./pages/signin";
import SignupBen from "./pages/SignupBen";
import Under18 from "./pages/under18";
import DonorsSubmit from "./pages/DonorsSubmitPage";
import Beneficiarysubmit from "./pages/BeneficiariesSubmitPage";
import GridUsers from "./pages/GridUsers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ImageAvatars from "./pages/ProfilePage";
import ProfilePage from "./pages/ProfilePage";
import GridBen from "./pages/GridBen";

export const UserContext = createContext({});

function App() {
  // const [email,setEmail] = useState("");
  // const getEmail = () => {return email};
  // const changeEmail = (email) => {setEmail(email)};

  const [userData, setUserData] = useState({
    centerName: "null",
    medicalZone: "null",
    emailAdress: "null",
    phoneNumber: null,
    address: "null",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;