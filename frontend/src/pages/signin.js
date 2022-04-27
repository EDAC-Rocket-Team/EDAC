import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
 
 export default function SignIn() {
     return (
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="Email" label="Email" variant="filled" />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />

      </Box>
) 
}