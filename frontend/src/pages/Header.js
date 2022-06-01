import React, { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material'
import background from "../media/heart.png";
import { useNavigate } from "react-router-dom";
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
import {buttonContext} from "../App";


export default function Header() {
  let navigate = useNavigate();
  // const [buttton, setButtton] = useState(false)


  return (
    <div>
    <AppBar position="fixed">

      <Toolbar>
        {/* {buttton ?
          console.log("true")
          : null
        } */}
        
        {/* <CameraIcon sx={{ mr: 2 }} ></CameraIcon> */}
        <Link href="/" variant="h6" color="white" noWrap underline="none">
          EDAC
        </Link>
      </Toolbar>
    </AppBar>
    </div>
  )
}