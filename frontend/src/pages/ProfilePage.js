import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import Copyright from "./Copyright";
import proxy from "./config.js";
import { useHistory } from "react-router-dom";
import { ValueContext, SetValueContext } from "../App";



export default function ImageAvatars() {


  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);
  console.log("profile", userData);
  let navigate = useNavigate();
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  // if (userData.donor.email) {
  //   setUserData(userData); //userData.donor
  // } else if (userData.beneficiary) {
  //   const user = setUserData(userData);
  // }



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
          {[userData.donor.firstname ," ",userData.donor.lastname]}
        </Typography>
        {/* <Typography variant="h5" component="div">
          
        </Typography> */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Info
        </Typography>
        <Typography variant="body2">
          Age: {userData.donor.birthdate}
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
      <Grid  container
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
          {/* <CardMedia
            component="img"
            sx={{
              maxWidth: 265,
            }}
            image={`https://avatars.dicebear.com/api/croodles-neutral/${DonorCard.email}.svg`}
            alt="random"
          /> */}
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
    <Button className='Back'sx={{position: 'fixed', top: 10, right: 10, mt: 10}} variant='contained' onClick={() => {navigate(-1)}}>Back</Button>
    <Button className='update'sx={{position: 'fixed', top: 50, right: 10, mt: 10}} variant='contained' onClick={() => {navigate()}}>Update</Button>
    <Button className='Delete'sx={{position: 'fixed', top: 90, right: 10, mt: 10}} variant='contained' onClick={() => {navigate()}}>Delete</Button>
    </Grid>
      <Copyright sx={{ mt: 20 }}></Copyright>
    </div>
  );
}
