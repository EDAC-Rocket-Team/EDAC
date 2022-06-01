import React, {useState, useContext} from 'react';
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
import Alert from '@mui/material/Alert';
//created fake user data to check, this is supposed to be the backend
import { userData } from '../userdata';
import UserContext from "../App";
import proxy from './config.js';




const theme = createTheme();



export default function SignIn() {

  const { userData, setUserData } = useContext(UserContext); // diana adding context 

  const [ passCheck, setPassCheck] = useState(false);
  //const [user, setUser] = React.useState("");


  //this is important
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  //this is what happens when you press submit
  const onSubmit = (data) => {
    console.log(data)
    //let currentUser = data
    // console.log(currentUser)
    // setUser(currentUser)
        // navigate("/grid", {state:{currentUser}})

        // navigate("/userprofile")

    //how to verify data, i used if & for statemnt   
    let i;
    for(i = 0; i < userData.length; i++){
    if (data.email === userData[i].email && data.password === userData[i].password) {navigate("/profile")
    break;}
       else {setPassCheck(true)}
    }
  }
    ;

  let navigate = useNavigate();



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
              //registred email for submit hook, and added conditions
              {...register("email", {
                required: true,
                maxLength: 20,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i
              })}
            />
            {errors.email && (<Alert severity="warning">Something is wrong with Email</Alert>)}

            <TextField
              id="password"
              // name="password"
              label="Password"
              type="password"
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
              //this registers password and its conditions
              {...register("password", {
                required: true,
                maxLength: 30,
                pattern: /^[A-Za-z]+$/i
              })}
            />
            {errors.password && ( <Alert severity="warning">Something is wrong with password</Alert>)}
            {/* {loggedIn ? console.log("yes"):console.log("nooooo") } */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick ={()=> {setLoggedin(true)}}
            >
              Sign In
            </Button>
           {passCheck && (<Alert severity="error">Wrong Password or Email!</Alert>)}

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