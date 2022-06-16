import React, { useEffect, useContext, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import proxy from './config.js';
import Axios from 'axios';
import { ValueContext } from "../App";

const theme = createTheme();

export default function GridDonor() {
  const [infoDonors, setInfoDonors] = useState([]);
  const userData = useContext(ValueContext);

  useEffect(() => {
    const getDonorInfo = async () => {
      try {
        const getInfo = await Axios.get(`${proxy}/donor/getDonors`,
          { headers: { "edak-blood-token": userData.beneficiary.token } });
        if (getInfo.data) {
          setInfoDonors(getInfo.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (userData.beneficiary.email) {
      getDonorInfo();
    }
  }, [userData.beneficiary.email, userData.beneficiary.token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>

        <Container sx={{ py: 8 }} maxWidth="md">

          <Grid container spacing={4}>
            {infoDonors.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '1%',
                    }}
                    image={`https://avatars.dicebear.com/api/croodles-neutral/${card.email}.svg`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.firstname} {card.lastname}
                    </Typography>
                    <Typography>Blood Type:{card.bloodtype}</Typography>
                    <Typography>Email:{card.email}</Typography>
                    <Typography>Phone Number:{card.phone}</Typography>
                    <Typography>Location:{card.address}</Typography>
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