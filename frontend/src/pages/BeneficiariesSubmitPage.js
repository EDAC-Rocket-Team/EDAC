import React from 'react';
import background from "../media/ThankYou.png"; 
import { Typography, Grid, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function Beneficiarysubmit() {
    let navigate = useNavigate();
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Typography sx={{fontSize: "2em", width: "40vw", ml: "58vw", pt: "25vh"}} >   Thanks for submiting your form...Hold on tight. We are searching for the best match for you.</Typography>
            <Grid> 
            <Button className='DBeneficiary' sx={{position:'fixed', top: 500, right: 100}} variant='contained' onClick={()=>{navigate("/grid")}}>Continue</Button>
           </Grid> 
        </div>
)
}