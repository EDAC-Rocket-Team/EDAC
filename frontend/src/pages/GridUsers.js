import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Copyright from './Copyright';
import { userData } from "../userdata";
import proxy from './config.js';
import Axios from 'axios';


const theme = createTheme();

export default function Album() {
  let navigate = useNavigate();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>

      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">

          <Grid container spacing={4}>
            {userData.map((card) => (
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
                      {card.name}
                    </Typography>
                    <Typography>
                      Blood Type:
                    </Typography>
                    <Typography>
                      Location:
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant='contained' onClick={() => { navigate("/profile") }}>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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