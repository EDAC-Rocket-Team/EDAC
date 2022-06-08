import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Copyright from './Copyright';
import proxy from './config.js';
import Axios from 'axios';
import { ValueContext, SetValueContext } from "../App";


const theme = createTheme();

export default function GridDonor() {
  let navigate = useNavigate();
  const [infoDonors, setInfoDonors] = useState([]);

  const userData = useContext(ValueContext);
  const setUserData = useContext(SetValueContext);

  // useEffect(() => {
    const getDonorInfo = async () => {
      try {
        const whatever = await Axios.get(`${proxy}/donor/getDonors`);
        // console.log(whatever.data[1]);
        if (whatever.data) {
          setInfoDonors(whatever.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // if (userData.email) {
      getDonorInfo();
    // }
  // });s

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>

      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">

          <Grid container spacing={4}>
            {infoDonors.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
            <Button
            sx={{ position: "fixed", top: 80, right: 10 }}
            variant="contained"
                      onClick={() => { navigate("/profile"); }}
                    >
                      Home
                    </Button>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}