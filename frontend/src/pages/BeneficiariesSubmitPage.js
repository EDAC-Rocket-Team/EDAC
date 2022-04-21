import background from "../media/ThankYou.png"; 
import { Typography} from '@mui/material';

export default function Beneficiarysubmit() {
    return (
        <div style={{ height: '100vh', width: '100vw', backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Typography sx={{fontSize: "2em", width: "40vw", ml: "58vw", pt: "25vh"}} >   Thanks for submiting your form...Hold on tight. We are searching for the best match for you.</Typography>
        </div>
)
}