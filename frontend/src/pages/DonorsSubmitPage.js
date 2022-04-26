import React from 'react';
import background from "../media/PrayingForYou.png"; 
import { Grid, Typography, Button} from '@mui/material';

export default function DonorsSubmit() {
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Typography sx={{fontSize: "2em", width: "40vw", ml: "58vw", pt: "25vh"}} > Thanks for submiting your form...Hold on tight we are searching for the best match for you. </Typography>
          <Grid> 
            <Button className='Donate' sx={{position:'fixed', top: 500, right: 100}} variant='contained'>Continue</Button>
           </Grid> 
        </div>
    )
}