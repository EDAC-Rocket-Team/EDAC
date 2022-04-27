<<<<<<< HEAD
import { useState } from 'react';
import './App.css';
// import HomeSplash from './pages/splashscreen';
=======
import React from 'react';
import './App.css';
import HomeSplash from './pages/Home';
>>>>>>> fad3b0af5a1de71ab1a91953c0f42141aced9496
import SignupD  from './pages/signupDonor';
import SignIn from './pages/signin';
import SignupBen from './pages/SignupBen';
import Under18 from './pages/under18';
import DonorsSubmit from './pages/DonorsSubmitPage';
import Beneficiarysubmit from './pages/BeneficiariesSubmitPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <SignupD />
    </div>
=======
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeSplash />}/>
        <Route path='/ben' element={<Beneficiarysubmit/>}/>
        <Route path='/donor' element={<DonorsSubmit />}/>
        <Route path='/18' element={< Under18/>}/>
        <Route path='/sud' element={<SignupD />}/>
        <Route path='/sub' element={<SignupBen />}/>
        <Route path='/signin' element={<SignIn />}/>
        {/* <Route path='/' element={< />}/> */}
      </Routes>
    </BrowserRouter>
>>>>>>> fad3b0af5a1de71ab1a91953c0f42141aced9496
  );
}

// const App = () => {
//   // declare a new state variable for modal open
//   const [open, setOpen] = useState(false);

//   // function to handle modal open
//   const handleOpen = () => {
//     setOpen(true);
//   };

//   // function to handle modal close
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="App">
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Signup
//       </Button>
//       // display the modal and pass props
//       <ModalDialog open={open} handleClose={handleClose} />
//     </div>
//   );
// };

export default App;
