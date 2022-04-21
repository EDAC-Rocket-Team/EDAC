import background from "../media/puppy.png"; 
import { Typography} from '@mui/material'

export default function Under18() {
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Typography sx={{fontSize: "2em", width: "40vw", ml: "58vw", pt: "25vh"}} > Thank you for trying but you dont meet criteria. Try again in a few!</Typography>
        </div>
)
}