import React, {useState, ChangeEvent} from 'react';
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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
// import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import Copyright from './Copyright';



const theme = createTheme(); 

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({
    handleChangeBlood : data.get("handleChangeBlood "),
    takesDrugs : data.get("takesDrugs"),
    state : data.get("state"),
    email: data.get('email'),
    password: data.get('password'),
  });
};
  

export default function SignupD() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      // password: data.get('password'),
    });
  };
  let navigate = useNavigate();

  const [bloodType, setBlood] = useState("NA")

  const handleChangeBlood = (e) => {
    setBlood(e.target.value)
    console.log(bloodType)
    }
  
  const [questionA, setQA] = useState("NA")

  const handleChangeQA = (e) => {
    setQA(e.target.value)
    console.log(questionA)
    } 

  
    const [state, setState] = useState({
      gilad: true,
      jason: false,
      antoine: true,
    });

    const [takesDrugs, setTakesDrugs] = useState(false) 
    const handleChangeQB = ( ) => {
      setTakesDrugs(!takesDrugs);
    };


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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
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
                <div style={{
                  margin: 'auto',
                  display: 'block',
                  width: "full"
                }}>
                  {/*<h3>How to create Date Picker in ReactJS?</h3> */}
                      <TextField
                      id="date"
                      label="Choose your birthdate"
                      type="date"
                      defaultValue="2000-01-01"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                < PhoneInput
                  country={'lb'}
                  required
                  // disabled
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  inputStyle={{width: '100%', height: "4em"}}
                  // change pattern later to match that existing in Lebanon
                  // some method in mui... similar in funcionality to "pattern"
                  // maybe using regex
                  // pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
                /> 
              </Grid> 


              <Grid item xs={12}>
                <h3>Health Information</h3> 
                          <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bloodType}
                      label="Blood Type"
                      onChange={handleChangeBlood}
                    >
                      <MenuItem value={"O RhD positive"}>O+</MenuItem>
                      <MenuItem value={"O RhD negative"}>O-</MenuItem>
                      <MenuItem value={"A RhD positive"}>A+</MenuItem>
                      <MenuItem value={"A RhD negative"}>A-</MenuItem>
                      <MenuItem value={"B RhD positive"}>B+</MenuItem>
                      <MenuItem value={"B RhD negative"}>B-</MenuItem>
                      <MenuItem value={"AB RhD positive"}>AB+ </MenuItem>
                      <MenuItem value={"AB RhD negative"}>AB- </MenuItem>
                    </Select>
                  </FormControl>
              </Grid> 


              <Grid item xs={12}>
                {/* <h6>Do you drink alcohol regularly?</h6> */}
                  <FormControl fullWidth>
                    <InputLabel id="qa">Do you drink alcohol regularly?</InputLabel>
                    <Select
                      labelId="qa"
                      id="qa"
                      value={questionA}
                      label="Do you drink alcohol regularly?"
                      onChange={handleChangeQA}
                      inputStyle={{width: '100%', height: "2em"}}
                    >
                      <MenuItem value={"Daily"}>yes, daily</MenuItem>
                      <MenuItem value={"Weekly"}>yes, weekly</MenuItem>
                      <MenuItem value={"Monthly"}>yes, monthly</MenuItem>
                      <MenuItem value={"Occassionally"}>yes, occassionally</MenuItem>
                      <MenuItem value={"No"}>no</MenuItem>
                    </Select>
                  </FormControl>
              </Grid> 

              {/*<Grid item xs={12}>
                <h6>Do you drink alcohol regularly?</h6> 
                          <FormControl fullWidth>
                    <InputLabel id="qa">QA</InputLabel>
                    <Select
                      labelId="qa"
                      id="qa"
                      value={questionA}
                      label="Blood"
                      onChange={handleChangeQA}
                      inputStyle={{width: '100%', height: "2em"}}
                    >
                      <MenuItem value={"Daily"}>Daily</MenuItem>
                      <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  
                      <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      <MenuItem value={"Occassionally"}>Occassionally</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
              </Grid> */}

              <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                  <FormLabel component="legend"></FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch checked={takesDrugs} onChange={handleChangeQB} name="gilad" />
                      }
                      label="Do you use recreational drugs?"
                    />
                    </FormGroup>
                    </FormControl>
              </Grid>
                    


              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive a text message, when blood donation of my type is needed."
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{navigate("/donor")}}>
            
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

