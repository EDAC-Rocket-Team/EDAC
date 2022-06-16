import React
//  {useContext, useState }
  from "react";
import background from "../media/ThankYou.png";
import { Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
// import { ValueContext, SetValueContext } from "../App";

export default function Beneficiarysubmit() {
  let navigate = useNavigate();

  // const userData = useContext(ValueContext);
  // const setUserData = useContext(SetValueContext);
  // console.log("bensubmit", userData);
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
          Thanks for submiting your form...Hold on tight. We are searching for
          the best match for you.{" "}
        </Typography>
      </Paper>
      <Button
        sx={{ mt: 10 }}
        className="Donate"
        variant="contained"
        onClick={() => {
          navigate("/donors");
        }}
      >
        Continue
      </Button>
    </Grid>
  );
}
