import React, { useEffect, useContext } from "react";
import background from "../media/puppy.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Button } from "@mui/material";
import { ValueContext, SetValueContext } from "../App";

export default function Under18() {
  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (userData.beneficiary.token || userData.donor.token) navigate("/profile");
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
        <Typography align="center" sx={{ fontSize: "2em", width: "40vw" }}>
          {" "}
          Thank you for trying but you dont meet criteria. Try again in a few!
        </Typography>
      </Paper>
      <Button
        sx={{ mt: 10 }}
        className="Donate"
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Continue
      </Button>
    </Grid>
  );
}
