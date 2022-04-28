import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './signin.css';
// import background from "../media/heartpumping.png"; 
import { Typography, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

 
 export default function SignIn() {
  let navigate = useNavigate();
     return (

       <div>
      {/* style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} */}
       
            
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 5, mt: 60, ml:40, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="Username" label="Username" variant="filled" />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        
         <Button className='Sign In'sx={{position: 'fixed', top: 75, right: 425}} variant='contained' onClick={()=>{navigate("/grid")}}>Sign In</Button>

      </Box>
      </div>
) 
}
