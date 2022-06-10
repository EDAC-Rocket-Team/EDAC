import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Container, TextField } from "@mui/material";
// import LoadingButton from '@mui/lab/LoadingButton';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import Copyright from "./Copyright";
import proxy from "./config.js";
import { useHistory } from "react-router-dom";
import { ValueContext, SetValueContext } from "../App";
import Axios from "axios";
import ErrorNotice from "./misc/ErrorNotice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ImageAvatars() {
  let navigate = useNavigate();

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);
  const [update, setUpdate] = useState(false);
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [userLocation, setUserLocation] = useState("GB");
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();
  const [updateError, setUpdateError] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [centerName, setCenterName] = useState("");
  const [medicalZone, setMedicalZone] = useState("");
  // const [loading, setLoading] = useState(false);

  const saveChangeD = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: userData.donor.email,
        firstname,
        lastname,
        userLocation,
        phone,
        password,
        passwordCheck,
      };
      const updatedUser = await Axios.put(`${proxy}/donor/update`, newUser);
      setUserData({
        donor: {
          firstname: updatedUser.data.firstname,
          lastname: updatedUser.data.lastname,
          email: updatedUser.data.email,
          address: updatedUser.data.address,
          phone: updatedUser.data.phone,
        },
        beneficiary: {
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null,
        },
      });
      setUpdate(false);
    } catch (err) {
      console.log(err);
      // err.response.data.msg && setUpdateError(err.response.data.msg);
    }
  };

  const deleteDonorUser = async () => {
    try {
      await Axios.delete(`${proxy}/donor/update`, {
        email: userData.donor.email,
      });
      setUserData({
        donor: {
          firstname: null,
          lastname: null,
          email: null,
          address: null,
          phone: null,
        },
        beneficiary: {
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
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
      const updatedUser = await Axios.put(`${proxy}/ben/update`, newUser);
      setUserData({
        donor: {
          firstname: updatedUser.data.firstname,
          lastname: updatedUser.data.lastname,
          email: updatedUser.data.email,
          address: updatedUser.data.address,
          phone: updatedUser.data.phone,
        },
        beneficiary: {
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null,
        },
      });
      setUpdate(false);
    } catch (err) {
      console.log(err);
      // err.response.data.msg && setUpdateError(err.response.data.msg);
    }
  };

  const deleteBenUser = async () => {
    try {
      await Axios.delete(`${proxy}/ben/deleteBen`, {
        email: userData.beneficiary.email,
      });
      setUserData({
        beneficiary: {
          centerName: null,
          medicalZone: null,
          email: null,
          phoneNumber: null,
          address: null,
        },
        donor: {
          firstname: null,
          lastname: null,
          email: null,
          address: null,
          phone: null,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const BenCard = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
          {userData.beneficiary.email}
        </Typography>
        <Typography variant="h5" component="div">
          Blood Type:{userData.beneficiary.bloodtype}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info
        </Typography>
        <Typography variant="body2">
          Age:
          <br />
          Email:
          <br />
          Location:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Phone Number</Button>
      </CardActions>
    </React.Fragment>
  );

  const DonorCard = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
          {[userData.donor.firstname, " ", userData.donor.lastname]}
        </Typography>
        {/* <Typography variant="h5" component="div">
          
        </Typography> */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info
        </Typography>
        <Typography variant="body2">
          Age: {userData.donor.email}
          <br />
          Blood Type: {userData.donor.bloodtype}
          <br />
          Email: {userData.donor.email}
          <br />
          Location: {userData.donor.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Phone Number: {userData.donor.phone}</Button>
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
            <CardMedia
              component="img"
              sx={{
                maxWidth: 265,
              }}
              image={`https://avatars.dicebear.com/api/croodles-neutral/${userData.donor.email}.svg`}
              alt="random"
            />
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
          <Button
            className="Back"
            sx={{ position: "fixed", top: 10, right: 10, mt: 10 }}
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
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
            onClick={deleteBenUser()}
          >
            Delete
          </Button>
        </Grid>
      ) : update && userData.donor.email ? (
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
              <InputLabel id="location"> Zone</InputLabel>
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
          {updateError && <ErrorNotice message={updateError} />}
          <Button
            style={{ color: "blue" }}
            size="large"
            variant="outlined"
            type="submit"
            sx={{ position: "fixed", top: 500, left: 35, mt: 10 }}
          >
            Save
          </Button>
        </form>
      ) : update && userData.beneficiary.email ? (
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
              <InputLabel id="location"> Zone</InputLabel>
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
          {updateError && <ErrorNotice message={updateError} />}
          <Button
            style={{ color: "blue" }}
            size="large"
            variant="outlined"
            type="submit"
            sx={{ position: "fixed", top: 500, left: 35, mt: 10 }}
          >
            Save
          </Button>
        </form>
      ) : null}
    </div>
  );
}
