import { Box, Typography, Link } from '@mui/material';

import AppLogo from "../components/AppLogo";
import SignupForm from "../components/SignupForm";

function Signup(){
    return(    
    <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%"}}>
            <AppLogo />
            <SignupForm />
            <Typography variant="body1" paragraph sx={{marginTop: "20px"}}>
                Already have an account? <Link to="/">Log in here!</Link>
            </Typography>
        </Box>
    </>
    )
}

export default Signup;