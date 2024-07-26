import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as ReactLink } from 'react-router-dom';

import AppLogo from "../components/AppLogo";
import SignupForm from "../components/SignupForm";

export default function Signup(){
    return(    
    <>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%"}}>
            <AppLogo />
            <SignupForm />
            <Typography variant="body1" paragraph sx={{marginTop: "20px"}}>
                Already have an account? {' '}
                <MuiLink component={ReactLink} to="/" underline="hover">
                 Log in here!
                </MuiLink>
            </Typography>
        </Box>
    </>
    )
}