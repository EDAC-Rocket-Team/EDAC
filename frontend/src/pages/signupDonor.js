import React, { useState, ChangeEvent, useContext } from "react";
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
// import FormHelperText from '@mui/material/FormHelperText';
import Switch from "@mui/material/Switch";
import Copyright from "./Copyright";
import Axios from "axios";
import proxy from "./config";
import ErrorNotice from "./misc/ErrorNotice";
import { ValueContext, SetValueContext } from "../App";

const theme = createTheme();

export default function SignupD() {
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [userLocation, setUserLocation] = useState("GB");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodTypes, setBloodTypes] = useState("O RhD positive");
  const [alcoholUse, setAlcoholUse] = useState("No");
  const [drug, setDrug] = useState(false);
  const [error, setError] = useState("");

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  const [listOfUsers, setListOfUsers] = useState([]);

  let navigate = useNavigate();

  const onSubmit = async () => {
    console.log({
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
    try {
      const newUser = await Axios.post(`${proxy}/donor/createDonor`, {
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

      const loginRes = await Axios.post(`${proxy}/common/signin`, {
        email,
        password,
      });

      // console.log(newUser);
      setUserData({
        donor: {
          token: loginRes.data.token,
          firstname: newUser.data.names,
          lastname: newUser.data.lastNames,
          email: newUser.data.email,
          birthdate: newUser.data.birthdate,
          address: newUser.data.userLocation,
          phone: newUser.data.phoneNumber,
          bloodtype: newUser.data.bloodTypes,
          alcoholpass: newUser.data.alcoholUse,
          drugpass: newUser.data.drug,
        },
        beneficiary: {
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null,
        },
      });


      localStorage.setItem("auth-token", loginRes.data.token);
      //history.push("/");

      navigate("/donor-submit");
    } catch (err) {
      console.log(err);
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
            Sign Up Now
          </Typography>
          <Box sx={{ mt: 3 }}>
            {" "}
            {/* <Box component="form" noValidate sx={{ mt: 3 }}></Box> */}
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
                  {/*<h3>How to create Date Picker in ReactJS?</h3> */}
                  <TextField
                    id="birthdate"
                    label="Choose your birthdate"
                    type="date"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                    fullWidth
                    defaultValue="2000-01-01"
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
                    <MenuItem value={"O RhD positive"}>O+</MenuItem>
                    <MenuItem value={"O RhD negative"}>O-</MenuItem>
                    <MenuItem value={"A RhD positive"}>A+</MenuItem>
                    <MenuItem value={"A RhD negative"}>A-</MenuItem>
                    <MenuItem value={"B RhD positive"}>B+</MenuItem>
                    <MenuItem value={"B RhD negative"}>B-</MenuItem>
                    <MenuItem value={"AB RhD positive"}>AB+ </MenuItem>
                    <MenuItem value={"AB RhD negative"}>AB- </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {/* <h6>Do you drink alcohol regularly?</h6> */}
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
                    <MenuItem value={"Occassionally"}>
                      yes, occassionally
                    </MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/*<Grid item xs={12}>
                <h6>Do you drink alcohol regularly?</h6> 
                          <FormControl fullWidth>
                    <InputLabel id="qa">QA</InputLabel>
                    <Select
                      labelId="qa"
                      id="qa"
                      value={questionA}
                      label="Blood"
                      onChange={handleChangeQA}
                      inputstyle={{width: '100%', height: "2em"}}
                    >
                      <MenuItem value={"Daily"}>Daily</MenuItem>
                      <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  
                      <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      <MenuItem value={"Occassionally"}>Occassionally</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
              </Grid> */}

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

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive a text message, when blood donation of my type is needed."
                />
              </Grid> */}

              {error && <ErrorNotice message={error} />}
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}