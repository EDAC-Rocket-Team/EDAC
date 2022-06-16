import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { formLabelClasses } from "@mui/material";
// import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/croodles-neutral";
import Axios from "axios";
import proxy from "./config";
import { useNavigate } from "react-router-dom";
import ErrorNotice from "./misc/ErrorNotice";
import { ValueContext, SetValueContext } from "../App";

const theme = createTheme();

export default function SignupBen() {
  const [centerName, setCenterName] = useState("");
  const [medicalZone, setMedicalZone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);
  const [error, setError] = useState("");

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (userData.beneficiary.token || userData.donor.token)
      navigate("/profile");
  });

  const onSubmit = async () => {
    try {
      const newUser = await Axios.post(`${proxy}/ben/createBen`, {
        centerName,
        medicalZone,
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
        acknowledge,
      });
      const loginResponse = await Axios.post(`${proxy}/common/signin`, {
        email,
        password,
      });
      setUserData({
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
          token: loginResponse.data.token,
          centerName: loginResponse.data.centerName,
          medicalZone: loginResponse.data.medicalZone,
          email: loginResponse.data.email,
          phoneNumber: loginResponse.data.phoneNumber,
          address: loginResponse.data.address,
        },
      });
      localStorage.setItem("edak-blood-token", loginResponse.data.token);
      navigate("/beneficiary-submit");
    } catch (err) {
      console.error(err);
      setError(err.response.data.msg);
    }
  };

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
            Sign up for Hospitals/Medical Center
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="centerName"
                  label="Medical Center Name"
                  value={centerName}
                  onChange={(e) => {
                    setCenterName(e.target.value);
                  }}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="medicalZoneLabel">Medical Zone</InputLabel>
                  <Select
                    id="medicalZone"
                    labelId="medicalZoneLabel"
                    label="Medical Zone"
                    value={medicalZone}
                    onChange={(e) => {
                      setMedicalZone(e.target.value);
                    }}
                  >
                    <MenuItem value={"Greater Beirut"}>Greater Beirut</MenuItem>
                    <MenuItem value={"Mount Lebanon"}>Mount Lebanon</MenuItem>
                    <MenuItem value={"Metn/Kesserwan"}>Metn/Kesserwan</MenuItem>
                    <MenuItem value={"Tripoli"}>Tripoli</MenuItem>
                    <MenuItem value={"South Lebanon"}>South Lebanon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                  }}
                  country={"lb"}
                  required
                  fullWidth
                  //this is to widen it to be the same as the rest @diana
                  inputstyle={{ width: "100%", height: "4em" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  label="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  multiline
                  maxRows={4}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={acknowledge}
                      onChange={() => {
                        setAcknowledge(!acknowledge);
                      }}
                      color="primary"
                    />
                  }
                  label="I acknowledge that all info in this form is correct"
                />
              </Grid>
              {error && <ErrorNotice message={error} />}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                onSubmit();
              }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}