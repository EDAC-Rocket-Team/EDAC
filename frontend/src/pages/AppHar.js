import React from 'react';
import { Typography, Button, Grid } from '@mui/material'
import background from "../media/heart.png";
import {useNavigate} from "react-router-dom";
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Link from '@mui/material/Link';

export default function AppHar() {
    let navigate = useNavigate();
    return (
        <AppBar position="fixed">
        <Toolbar>
        <Button className='Sign In'sx={{position: 'fixed', top: 10, right: 10}} variant='contained' onClick={()=>{navigate("/sin")}}>Sign In</Button>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Link href="/" variant="h6" color="white" noWrap underline="none">
            EDAC 
          </Link>
        </Toolbar>
      </AppBar>
    )
}