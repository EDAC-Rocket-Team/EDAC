import React from 'react';
import {useNavigate} from "react-router-dom";
import { Grid, Typography, Button} from '@mui/material';

export default function GridUsers() {
 let navigate = useNavigate();
    return(
        <div>
        <h1>this is it</h1>
            <Button className='GridUsers' sx={{position:'fixed', top: 500, right: 100}} variant='contained' onClick={()=>{navigate("/grid")}}>User for Carla</Button>
            </div>
    )
}