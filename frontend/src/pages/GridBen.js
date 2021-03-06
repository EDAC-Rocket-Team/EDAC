import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import proxy from "./config.js";
import Axios from "axios";
import { ValueContext } from "../App";

const theme = createTheme();

export default function GridBen() {
  const [infoBens, setInfoBens] = useState([]);

  const userData = useContext(ValueContext);

  useEffect(() => {
    const getBenInfo = async () => {
      try {
        const getInfo = await Axios.get(`${proxy}/ben/getBens`,
          { headers: { "edak-blood-token": userData.donor.token } });
        if (getInfo.data) {
          setInfoBens(getInfo.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (userData.donor.email) {
      getBenInfo();
    }
  }, [userData.donor.email, userData.donor.token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {infoBens.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: "1%",
                    }}
                    image={`https://avatars.dicebear.com/api/croodles-neutral/${card.phoneNumber}.svg`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.centerName}
                    </Typography>
                    <Typography>Phone Number: {card.phoneNumber}</Typography>
                    <Typography>Email: {card.email}</Typography>
                    <Typography>Location: {card.medicalZone}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}