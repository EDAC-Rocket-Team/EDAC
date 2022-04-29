import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import { useForm } from "react-hook-form";



const theme = createTheme();

export default function SignIn() {
const userfake = {
  "email": "carla@gmail.com"
  ,"password": "kokololo"
}

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();     
  
  const onSubmit = (data) => {
       if (data.email === userfake.email && data.password === userfake.password) {navigate("/grid")}
       else {alert("wrong email or password dumbass")}
      }
       ; 
          
 let navigate= useNavigate ();


 return (


    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus  
              {...register("email", {
                required: true,
                maxLength: 20,
                pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i
              })}
            />
            {errors.email && ("There is a problem with your email")}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
                maxLength: 8,
                pattern: /^[A-Za-z]+$/i
              })}
            />
            {errors.password && ("There is a problem with your password")}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}