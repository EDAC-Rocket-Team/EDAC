import React from 'react';
import { Typography, Button, Grid } from '@mui/material'
import background from "../media/heart.png";
import {useNavigate} from "react-router-dom";
// import { Link } from 'react-router-dom';

export default function HomeSplash() {
    let navigate = useNavigate();
    return (
     
        <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center' }} >
        <Grid container spacing={5} direction="column" justifyContent="space-between" alignItems="center" sx={{height: "100vh"}}>
            <Grid item>
                <Typography sx={{fontSize: 50, mt: "20vh"}}>EDAC</Typography>
            </Grid>
            <Grid>
                <Button className='Donate' variant='contained' sx={{mr: 5}} onClick={()=>{navigate("/sud")}}>Donate</Button>
                <Button className='Beneficiary' variant='contained' onClick={()=>{navigate("/sub")}}>Beneficiary</Button>
            </Grid>
            <Button className='Sign In'sx={{position: 'fixed', top: 10, right: 10}} variant='contained' onClick={()=>{navigate("/sin")}}>Sign In</Button>
        </Grid>
        
        </div>
    );
  }