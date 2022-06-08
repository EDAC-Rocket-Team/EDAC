import React from 'react';
import background from "../media/PrayingForYou.png"; 
import { Grid, Typography, Button, Paper} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function DonorsSubmit() {
    let navigate = useNavigate();
    return (
        
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center" 
         style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
           <Paper sx={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                    <Typography align='center' sx={{fontSize: "2em", width: "40vw"}} > Thanks for submiting your form...Hold on tight we are searching for the best match for you. </Typography>
            </Paper>
            <Button sx={{mt: 10}} className='Donate' variant='contained' onClick={()=>{navigate("/donors")}}>Continue</Button>
           
        </Grid>
    )
}