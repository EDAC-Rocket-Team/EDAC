import { Typography, Button } from '@mui/material'

export default function CarlaPage() {
    return (
    //JSX starts here
      <div>    
        <Typography sx={{fontSize: 50}}>EDAC</Typography>
        <Button variant='contained'>Donate</Button>
        <Button variant='contained'>Beneficiary</Button>
        <Button variant='contained'>Sign In</Button>
      </div>
    );
  }