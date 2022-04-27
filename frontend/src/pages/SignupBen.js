import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        EDAC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignupBen() {

  const [areaZone, setAreaZone] = useState("NA")

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleChangeArea = (e) => {
    setAreaZone(e.target.value)
    console.log(areaZone)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up for Hospitals/Medical Center
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="MedicalCenterName"
                  required
                  fullWidth
                  id="firstName"
                  label="Medical Center Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="NameofStaffResponsible"
                  label="Name of Staff Responsible"
                  name="NameofStaffResponsible"
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12}>
                          <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Medical Zone</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={areaZone}
                      label="Medical Zone"
                      onChange={handleChangeArea}
                    >
                      <MenuItem value={"GB"}>Greater Beirut</MenuItem>
                      <MenuItem value={"ML"}>Mount Lebanon</MenuItem>
                      <MenuItem value={"M/K"}>Metn/Kesserwan</MenuItem>
                      <MenuItem value={"TR"}>Tripoli</MenuItem>
                      <MenuItem value={"SL"}>South Lebanon</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>


              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            <Grid item xs={12}>
            <TextField
                  required
                  fullWidth
                  name="number"
                  label="Phone Number"
                  type="phonenumber"
                  id="number"
                />
            </Grid>

            <Grid item xs={12}>
            <TextField
                  fullWidth
                  name="numberStaff"
                  label="Number of Staff Avilable"
                  type="staffnumber"
                  id="staffnumber"
                  autoComplete="new-number"
                />
            </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I acknowledge that all info in this form is correct"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{navigate("/sub")}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}