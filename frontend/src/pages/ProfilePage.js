import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// spacing={1}

export default function ImageAvatars() {
  return (
    <Stack direction="center" variant="square">
      <Avatar
        alt="Avatar"
        src="https://i.pravatar.cc/300"
        sx={{ width: 500, height: 500, ml: 10 }}
      />
    </Stack>
  );
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          My Profile
        </Typography>
        <Typography variant="body2">
          <br>Age: </br>
          <br>Blood Type:</br>
          <br>Email:</br>
          <br>Location:</br>
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


