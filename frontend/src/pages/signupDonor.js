import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Axios from "axios";
import proxy from "./config";
import ErrorNotice from "./misc/ErrorNotice";
import { ValueContext, SetValueContext, getAge } from "../App";

const theme = createTheme();

export default function SignupD() {
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodTypes, setBloodTypes] = useState("");
  const [alcoholUse, setAlcoholUse] = useState("");
  const [drug, setDrug] = useState(false);
  const [error, setError] = useState("");

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (userData.beneficiary.token || userData.donor.token)
      navigate("/profile");
  });

  const onSubmit = async () => {
    const age = getAge(birthdate);
    if (age < 18 || age > 65) {
      navigate("/-18")
    } else {
      try {
        await Axios.post(`${proxy}/donor/createDonor`, {
          firstname: names,
          lastname: lastNames,
          email,
          password,
          passwordCheck: confirmPassword,
          birthdate,
          address: userLocation,
          phone: phoneNumber,
          bloodtype: bloodTypes,
          alcoholpass: alcoholUse,
          drugpass: drug,
        });
        const loginResponse = await Axios.post(`${proxy}/common/signin`, {
          email,
          password,
        });
        setUserData({
          donor: {
            token: loginResponse.data.token,
            firstname: loginResponse.data.firstNames,
            lastname: loginResponse.data.lastNames,
            email: loginResponse.data.email,
            birthdate: loginResponse.data.birthdate,
            address: loginResponse.data.userLocation,
            phone: loginResponse.data.phoneNumber,
            bloodtype: loginResponse.data.bloodTypes,
            alcoholpass: loginResponse.data.alcoholUse,
            drugpass: loginResponse.data.drug,
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
        localStorage.setItem("edak-blood-token", loginResponse.data.token);
        navigate("/donor-submit");
      } catch (err) {
        setError(err.response.data.msg);
      }
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
            Sign Up Now
          </Typography>
          <Box sx={{ mt: 3 }}>
            {" "}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="names"
                  label="First Name"
                  autoComplete="given-name"
                  onChange={(e) => {
                    setNames(e.target.value);
                  }}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastNames"
                  label="Last Name"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastNames(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
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
                <div
                  style={{
                    margin: "auto",
                    display: "block",
                    width: "full",
                  }}
                >
                  <TextField
                    id="birthdate"
                    label="Choose your birthdate"
                    type="date"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                    fullWidth
                    defaultValue="" // initially was "2020-01-01"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="location">Medical Zone</InputLabel>
                  <Select
                    id="userLocation"
                    labelId="location"
                    label="Your Location"
                    value={userLocation}
                    defaultValue={userLocation}
                    onChange={(e) => {
                      setUserLocation(e.target.value);
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
                <h3>Health Information</h3>
                <FormControl fullWidth>
                  <InputLabel id="bloodTypeLabel">Blood Type</InputLabel>
                  <Select
                    id="bloodTypes"
                    label="Blood Type"
                    labelId="bloodTypeLabel"
                    value={bloodTypes}
                    defaultValue={bloodTypes}
                    onChange={(e) => {
                      setBloodTypes(e.target.value);
                    }}
                  >
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="qa">
                    Do you drink alcohol regularly?
                  </InputLabel>
                  <Select
                    id="alcoholUse"
                    label="Do you drink alcohol regularly?"
                    labelId="qa"
                    value={alcoholUse}
                    defaultValue={alcoholUse}
                    onChange={(e) => setAlcoholUse(e.target.value)}
                    inputstyle={{ width: "100%", height: "2em" }}
                  >
                    <MenuItem value={"Daily"}>yes, daily</MenuItem>
                    <MenuItem value={"Weekly"}>yes, weekly</MenuItem>
                    <MenuItem value={"Monthly"}>yes, monthly</MenuItem>
                    <MenuItem value={"Occassionally"}>yes, occassionally</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend"></FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={drug}
                          onChange={() => {
                            setDrug(!drug);
                          }}
                          name="gilad"
                        />
                      }
                      label="Do you use recreational drugs?"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
            {error && <ErrorNotice message={error} />}
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              fullWidth
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