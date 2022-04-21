import { Typography, Button, Grid } from '@mui/material'
import './splashscreen.css';
import background from "../media/heart.png";


export default function HomeSplash() {
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center' }} >
        <Grid container spacing={5} direction="column" justifyContent="space-between" alignItems="center" sx={{height: "100vh"}}>
            <Grid item>
                <Typography sx={{fontSize: 50, mt: "20vh"}}>EDAC</Typography>
            </Grid>
            <Grid>
                <Button className='Donate' variant='contained' sx={{mr: 5}}>Donate</Button>
                <Button className='Beneficiary' variant='contained'>Beneficiary</Button>
            </Grid>
            <Button className='Sign In'sx={{position: 'fixed', top: 10, right: 10}} variant='contained' onClick={()=>{console.log('WTF Carla')}}>Sign In</Button>
        </Grid>
        </div>
    );
  }