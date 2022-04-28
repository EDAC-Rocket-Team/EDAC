import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AppHar from './AppHar';
import { Grid } from '@mui/material';
import Copyright from './Copyright';
// spacing={1}



export default function ImageAvatars() {
  let navigate = useNavigate ();
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 50}} color="text.secondary" gutterBottom>
          Alex Boldwin
        </Typography>
        <Typography variant="h5" component="div">
        Blood Type:
        </Typography>
        <Typography sx={{ mb:1.5 }} color="text.secondary">
          Info
        </Typography>
        <Typography variant="body2">
          Age:
          <br />
          Email:
          <br/>
          Location
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Phone Number</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <div>
    <AppHar></AppHar>
    <Grid  container
  direction="row"
  justifyContent="center"
  alignItems="center"
  sx={{mt: 20}}
  >
      
      <Avatar
        
        alt="Avatar"
        src="https://i.pravatar.cc/300"
        sx={{ width: 250, height: 250, ml: 10, mr: 10}}
        
      />
    
    <Box sx={{ maxWidth: 350 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
    <Button className='Sign In'sx={{position: 'fixed', top: 10, right: 10, mt: 10}} variant='contained' onClick={()=>{navigate("/grid")}}>Back</Button>
    
    </Grid>
    <Copyright sx={{mt: 10}}></Copyright>

    </div>
  );
}