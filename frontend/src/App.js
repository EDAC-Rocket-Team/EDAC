import { useState } from 'react';
import './App.css';
// import HomeSplash from './pages/splashscreen';
import SignupD  from './pages/signupDonor';


function App() {
  return (
    <div className="App">
      <SignupD />
    </div>
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
