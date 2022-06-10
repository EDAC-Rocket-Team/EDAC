import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Copyright from "./Copyright";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
//created fake user data to check, this is supposed to be the backend
import { userData } from "../userdata";
import UserContext from "../App";
import proxy from "./config.js";
import Axios from "axios";
import ErrorNotice from "./misc/ErrorNotice";
import { ValueContext, SetValueContext } from "../App";

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passCheck, setPassCheck] = useState(false);
  //const [user, setUser] = React.useState("");

  //this is what happens when you press submit
  const onSubmit = async () => {
    let newUser;
    try {
      newUser = await Axios.post(`${proxy}/common/signin`, {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    } finally {
      if (newUser.data.bloodtype) {
        await setUserData({
          donor: {
            firstname: newUser.data.firstname,
            lastname: newUser.data.lastname,
            email: newUser.data.email,
            birthdate: newUser.data.birthdate,
            address: newUser.data.address,
            phone: newUser.data.phone,
            bloodtype: newUser.data.bloodtype,
            alcoholpass: newUser.data.alcoholpass,
            drugpass: newUser.data.drugpass,
          },
          beneficiary: {
            centerName: null,
            medicalZone: null,
            email: null,
            phoneNumber: null,
            address: null,
          },
        });
      } else if (newUser.data.centerName) {
        await setUserData({
          donor: {
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
            centerName: newUser.data.centerName,
            medicalZone: newUser.medicalZone,
            email: newUser.data.email,
            phoneNumber: newUser.data.phoneNumber,
            address: newUser.data.address,
          },
        });
      }
      // console.log("signin", newUser.data);
      navigate("/profile");
    }
  };
  // console.log("bottom signin", userData);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            /// component="form"
            /// onSubmit={handleSubmit(onSubmit)}
            /// noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {" "}
              {/* new*/}
              <Grid item xs={12}>
                {" "}
                {/* new*/}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(email) => {
                    setEmail(email.target.value);
                  }}
                  // required
                  //registred email for submit hook, and added conditions
                  // {...register("email", {
                  //   required: true,
                  //   // maxLength: 20,
                  //   // pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i,
                  // })}
                />
              </Grid>
              {/* {errors.email && (
              <Alert severity="warning">Something is wrong with Email</Alert>
            )} */}
              {/*<Grid container spacing={2}>   new*/}
              <Grid item xs={12}>
                {" "}
                {/* new*/}
                <TextField
                  id="password"
                  // name="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="current-password"
                  onChange={(pass) => {
                    setPassword(pass.target.value);
                  }}

                  //this registers password and its conditions
                  // {...register("password", {
                  //   required: true,
                  //   {onChange = (pass) = > {
                  //     setPassword(pass.target.value);
                  //   }}
                  // maxLength: 30,
                  // pattern: /^[A-Za-z]+$/i,
                />
              </Grid>
            </Grid>
            {/* {errors.password && (
              <Alert severity="warning">Something is wrong with password</Alert>
            )} */}
            {/* {loggedIn ? console.log("yes"):console.log("nooooo") } */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick ={()=> {setLoggedin(true)}}
              onClick={() => {
                onSubmit();
              }}
            >
              Sign In
            </Button>
            {error && <ErrorNotice message={error} />}
            {/* {passCheck && (
              <Alert severity="error">Wrong Password or Email!</Alert>
            )} */}
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
