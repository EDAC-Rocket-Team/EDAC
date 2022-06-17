import React, { useState, useContext, useEffect } from "react";
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
import proxy from "./config.js";
import Axios from "axios";
import ErrorNotice from "./misc/ErrorNotice";
import { ValueContext, SetValueContext, getAge } from "../App";

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userData.beneficiary.token || userData.donor.token)
      navigate("/profile");
  });

  //this is what happens when you press submit
  const onSubmit = async () => {
    try {
      const newUser = await Axios.post(`${proxy}/common/signin`, {
        email,
        password,
      });
      if (newUser.data.firstname) {
        await setUserData({
          donor: {
            token: newUser.data.token,
            firstname: newUser.data.firstname,
            lastname: newUser.data.lastname,
            email: newUser.data.email,
            birthdate: getAge(newUser.data.birthdate),
            address: newUser.data.address,
            phone: newUser.data.phone,
            bloodtype: newUser.data.bloodtype,
            alcoholpass: newUser.data.alcoholpass,
            drugpass: newUser.data.drugpass,
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
      } else if (newUser.data.centerName) {
        await setUserData({
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
            token: newUser.data.token,
            centerName: newUser.data.centerName,
            medicalZone: newUser.data.medicalZone,
            email: newUser.data.email,
            phoneNumber: newUser.data.phoneNumber,
            address: newUser.data.address,
          },
        });
      }
      localStorage.setItem("edak-blood-token", newUser.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 10,
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
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {" "}
              <Grid item xs={12}>
                {" "}
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
                />
              </Grid>
              <Grid item xs={12}>
                {" "}
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="current-password"
                  onChange={(pass) => {
                    setPassword(pass.target.value);
                  }}
                />
              </Grid>
            </Grid>
            {error && <ErrorNotice message={error} />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={() => {
                onSubmit();
              }}
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
      </Container>
    </ThemeProvider>
  );
}