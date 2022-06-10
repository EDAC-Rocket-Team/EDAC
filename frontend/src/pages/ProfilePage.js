import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import Copyright from './Copyright';



export default function ImageAvatars() {
  let navigate = useNavigate();
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
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
    <Grid  container
  direction="row"
  justifyContent="center"
  alignItems="center"
  sx={{mt: 20,}}
  >
     <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', mr:5 }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      maxWidth:265
                    }}
                    image={`https://avatars.dicebear.com/api/croodles-neutral/${card.email}.svg`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}> </CardContent> 
                  </Card>
    <Box sx={{ maxWidth: 350 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
    <Button className='Back'sx={{position: 'fixed', top: 10, right: 10, mt: 10}} variant='contained' onClick={() => {navigate(-1)}}>Back</Button>
    <Button className='update'sx={{position: 'fixed', top: 50, right: 10, mt: 10}} variant='contained' onClick={() => {navigate()}}>Update</Button>
    <Button className='Delete'sx={{position: 'fixed', top: 90, right: 10, mt: 10}} variant='contained' onClick={() => {navigate()}}>Delete</Button>
    </Grid>
    <Copyright sx={{mt: 20}}></Copyright>

    </div>
  );
}