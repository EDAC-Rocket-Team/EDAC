import React, { useContext, useEffect } from "react";
import { Typography, Button, Grid } from "@mui/material";
import background from "../media/heart.png";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { ValueContext } from "../App";


export default function Home() {
  const userData = useContext(ValueContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.beneficiary.token || userData.donor.token)
      navigate("/profile");
  });


  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        spacing={5}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item>
          <Typography sx={{ fontSize: 50, mt: "20vh" }}>EDAC</Typography>
        </Grid>
        <Grid>
          <Paper>
            <Typography align="center">Sign up Now!</Typography>{" "}
          </Paper>
          <Button
            className="Donate"
            variant="contained"
            sx={{ mr: 5 }}
            onClick={() => {
              navigate("/donor-sign-up");
            }}
          >
            Donate
          </Button>
          <Button
            className="Beneficiary"
            variant="contained"
            onClick={() => {
              navigate("/beneficiary-sign-up");
            }}
          >
            Hosptial
          </Button>
          <Button
            className="SignIn"
            sx={{ position: "fixed", top: 80, right: 10 }}
            variant="contained"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
