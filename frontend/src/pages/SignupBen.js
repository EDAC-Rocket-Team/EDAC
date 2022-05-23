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
import {useNavigate} from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import AppHar from '@mui/material/AppBar';
import Copyright from './Copyright';
import userdata from '../userdata';
import { formLabelClasses } from '@mui/material';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/croodles-neutral';

let svg = createAvatar(style, {
  seed: 'custom-seed',
});

const theme = createTheme();

export default function SignupBen() {
  
  const [centerName, setCenterName]= useState("");
  const [medicalZone, setMedicalZone] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);

  let navigate = useNavigate();

  const onSubmit = () => {
    if (acknowledge === true && address !== '' && centerName !== '' && medicalZone !== '' && emailAdress !== '' && password !== '' && confirmPassword!== '' && password === confirmPassword && (phoneNumber !== "961" || phoneNumber !== "96" || phoneNumber !== "9" || phoneNumber !== "")) {
      console.log({centerName, medicalZone, emailAdress, password, confirmPassword, phoneNumber, address, acknowledge})
      navigate('/grid')
    } 
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up for Hospitals/Medical Center
          </Typography>
          <Box sx={{ mt: 3 }}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="centerName"
                  label="Medical Center Name"
                  value = {centerName}
                  onChange = {(e) => {setCenterName(e.target.value)}}
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="medicalZoneLabel">Medical Zone</InputLabel>
                  <Select
                    id="medicalZone"
                    labelId="medicalZoneLabel"
                    label="Medical Zone"
                    value={medicalZone}
                    onChange = {(e)=>{setMedicalZone(e.target.value)}}
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
                  id="email"
                  label="Email Address"
                  value= {emailAdress}
                  onChange = {(e)=> {setEmailAdress(e.target.value)}}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value = {password}
                  onChange = {(e)=> {setPassword(e.target.value)}}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password" 
                  value={confirmPassword}
                  onChange= {(e)=>{setConfirmPassword(e.target.value)}}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value= {phoneNumber}
                  onChange= {(value)=>{(setPhoneNumber(value))}}
                  country={'lb'}
                  required
                  fullWidth
                  //this is to widen it to be the same as the rest @diana
                  inputstyle={{width: '100%', height: "4em"}}
                /> 
              </Grid> 
              <Grid item xs={12}>
                <TextField
                  id="address"
                  label="Address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                  multiline
                  maxRows={4}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={acknowledge} onChange={()=>{setAcknowledge(!acknowledge)}} color="primary" />}
                  label="I acknowledge that all info in this form is correct"
                />
              </Grid>
            </Grid>
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{onSubmit()}}>
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sin" variant="body2">
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