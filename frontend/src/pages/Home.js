import React from 'react';
import { Typography, Button, Grid } from '@mui/material'
import background from "../media/heart.png";
import {useNavigate} from "react-router-dom";
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import AppHar from './AppHar';
import Copyright from './Copyright';
import { Paper } from '@mui/material';

// import { Link } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center' }} >
        
        

        
        <Grid container spacing={5} direction="column" justifyContent="space-between" alignItems="center" sx={{height: "100vh"}}>
            <Grid item>
                <Typography sx={{fontSize: 50, mt: "20vh"}}>EDAC</Typography>
            </Grid>
            <Grid>
                <Paper>
                <Typography align='center'>Sign up Now!</Typography> </Paper>
                <Button className='Donate' variant='contained' sx={{mr: 5}} onClick={()=>{navigate("/sud")}}>Donate</Button>
                <Button className='Beneficiary' variant='contained' onClick={()=>{navigate("/sub")}}>Hosptial</Button>
                <Button className='SignIn' sx={{ position: 'fixed', top: 80, right: 10}} variant="contained" onClick={() =>{navigate("/sin") }}>Sign In</Button>
                <Copyright sx={{mt:10}}></Copyright>
                
            </Grid>
            <AppHar/>
        </Grid>
        
        </div>
       
    );
  }