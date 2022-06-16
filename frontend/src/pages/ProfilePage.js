import React, { useContext, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Container, TextField } from "@mui/material";
// import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import Axios from "axios";
import proxy from "./config.js";
import { ValueContext, SetValueContext } from "../App";
import ErrorNotice from "./misc/ErrorNotice";

export default function ImageAvatars() {
  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  const [update, setUpdate] = useState(false);
  const [error, setError] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [centerName, setCenterName] = useState("");
  const [medicalZone, setMedicalZone] = useState(userData.beneficiary.medicalZone);

  let navigate = useNavigate();

  console.log(userData);

  const saveChangeD = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: userData.donor.email,
        firstname,
        lastname,
        address: userLocation,
        phone,
        password,
        passwordCheck,
        // alcoholpass,
        // drugpass,
      };
      const updatedUser = await Axios.put(`${proxy}/donor/update`, newUser,
        { headers: { "edak-blood-token": userData.donor.token } });
      setUserData({
        donor: {
          token: userData.donor.token,
          firstname: updatedUser.data.firstname,
          lastname: updatedUser.data.lastname,
          email: updatedUser.data.email,
          birthdate: updatedUser.data.birthdate,
          address: updatedUser.data.address,
          phone: updatedUser.data.phone,
          bloodtype: updatedUser.data.bloodtype,
          alcoholpass: updatedUser.data.alcoholpass,
          drugpass: updatedUser.data.drugpass
        },
        beneficiary: {
          token: null,
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null
        },
      });
      setUpdate(false);
    } catch (err) {
      console.log(err.message);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const saveChangeB = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: userData.beneficiary.email,
        centerName,
        medicalZone,
        phoneNumber,
        password,
        passwordCheck,
      };
      const updatedUser = await Axios.put(`${proxy}/ben/update`, newUser,
        { headers: { "edak-blood-token": userData.beneficiary.token } });
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
          drugpass: null
        },
        beneficiary: {
          token: userData.beneficiary.token,
          centerName: updatedUser.data.centerName,
          medicalZone: updatedUser.data.medicalZone,
          email: updatedUser.data.email,
          phoneNumber: updatedUser.data.phoneNumber,
          address: updatedUser.data.address,
        },
      });
      setUpdate(false);
    } catch (err) {
      console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const deleteUser = async () => {
    if (userData.donor.email) {
      try {
        await Axios.put(`${proxy}/donor/deleteDonor`,
          { email: userData.donor.email },
          { headers: { "edak-blood-token": userData.donor.token } }
        )
      }
      catch (error) {
        console.log(error.message);
      }
    } else if (userData.beneficiary.email) {
      try {
        await Axios.put(`${proxy}/ben/deleteBen`,
          { email: userData.beneficiary.email },
          { headers: { "edak-blood-token": userData.beneficiary.token } }
        );
      }
      catch (error) {
        console.log(error.message);
      }
    };
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
        token: null,
        centerName: null,
        medicalZone: null,
        email: null,
        phoneNumber: null,
        address: null,
      },
    });
    localStorage.setItem("edak-blood-token", "");
    navigate("/");
  };

  const DonorCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 50 }} color="text.secondary" gutterBottom
        >
          {userData.donor.firstname} {userData.donor.lastname}
        </Typography>
        <Typography variant="h6" component="div">
          Blood Type:{userData.donor.bloodtype}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info
        </Typography> */}
        <Typography variant="body2">
          Age: {userData.donor.birthdate}
          <br />
          Email: {userData.donor.email}
          <br />
          Location: {userData.donor.address}
          <br />
          Alcohol Use: {userData.donor.alcoholpass}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Phone Number: {userData.donor.phone}</Button>
      </CardActions>
    </React.Fragment>
  );

  const BenCard = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          {userData.beneficiary.centerName}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info
        </Typography> */}
        <Typography variant="body2">
          Email: {userData.beneficiary.email}
          <br />
          Medical Zone: {userData.beneficiary.medicalZone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          Phone Number: {userData.beneficiary.phoneNumber}
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <div>
      {!update ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 20 }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              mr: 5,
            }}
          >
            {userData.donor.email
              ?
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 265,
                }}
                image={`https://avatars.dicebear.com/api/croodles-neutral/${userData.donor.email}.svg`}
                alt="random"
              />
              : userData.beneficiary.email
                ?
                <CardMedia
                  component="img"
                  sx={{
                    maxWidth: 265,
                  }}
                  image={`https://avatars.dicebear.com/api/croodles-neutral/${userData.beneficiary.email}.svg`}
                  alt="random"
                />
                : null}

            <CardContent sx={{ flexGrow: 1 }}> </CardContent>
          </Card>
          <Box sx={{ maxWidth: 350 }}>
            <Card variant="outlined">
              {userData.donor.email
                ? DonorCard
                : userData.beneficiary.email
                  ? BenCard
                  : null}
            </Card>
          </Box>

          {userData.donor.email ? (
            <Button
              sx={{ position: "fixed", top: 10, right: 10, mt: 10 }}
              variant="contained"
              onClick={() => {
                navigate("/beneficiaries");
              }}
            >
              Beneficiaries
            </Button>)
            : userData.beneficiary.email ?
              (<Button
                sx={{ position: "fixed", top: 10, right: 10, mt: 10 }}
                variant="contained"
                onClick={() => {
                  navigate("/donors");
                }}
              >
                Donors
              </Button>)
              : null}

          <Button
            className="update"
            sx={{ position: "fixed", top: 50, right: 10, mt: 10 }}
            variant="contained"
            onClick={() => {
              setUpdate(true);
            }}
          >
            Update
          </Button>
          <Button
            className="Delete"
            sx={{ position: "fixed", top: 90, right: 10, mt: 10 }}
            variant="contained"
            onClick={() => { deleteUser() }}
          >
            Delete
          </Button>
        </Grid>
      ) : update && userData.donor.email ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 12 }}
        >
          <form onSubmit={saveChangeD}>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="location">Location</InputLabel>
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
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                type="password"
                label="Re-Enter Password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              // color={errorColorR}
              />
            </Container>
            {error && <ErrorNotice message={error} />}
            <Box textAlign='center' sx={{ mt: 1 }}>
              <Button
                style={{ color: "blue" }}
                // size="large"
                variant="outlined"
                // type="button"
                onClick={() => {
                  setUpdate(false);
                }
                }
              >
                Cancel
              </Button>
              <Button
                style={{ color: "blue" }}
                // size="large"
                variant="outlined"
                type="submit"
              // sx={{ ml: 6 }}
              >
                Save
              </Button>
            </Box >
          </form>
        </Grid>
      ) : update && userData.beneficiary.email ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 12 }}
        >
          <form onSubmit={saveChangeB}>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                label="centerName"
                onChange={(e) => setCenterName(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="location">Medical Zone</InputLabel>
                <Select
                  id="userLocation"
                  labelId="location"
                  label="Your Location"
                  value={medicalZone}
                  defaultValue={medicalZone}
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
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                label="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Container>
            <Container fixed sx={{ margin: 1, padding: 1 }}>
              <TextField
                fullWidth
                type="password"
                label="Re-Enter Password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              // color={errorColorR}
              />
            </Container>
            {error && <ErrorNotice message={error} />}
            <Box textAlign='center' sx={{ mt: 1 }}>
              <Button
                style={{ color: "blue" }}
                // size="large"
                variant="outlined"
                // type="button"
                onClick={() => {
                  setUpdate(false);
                }
                }
              >
                Cancel
              </Button>
              <Button
                style={{ color: "blue" }}
                // size="large"
                variant="outlined"
                type="submit"
              // sx={{ ml: 6 }}
              >
                Save
              </Button>
            </Box >
          </form>
        </Grid>
      ) : null
      }
    </div >
  );
}