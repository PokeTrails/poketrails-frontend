import Box from '@mui/material/Box';

import AppLogo from "../components/AppLogo";
import SignupForm from "../components/SignupForm";

function Signup(){
    return(    
    <>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <AppLogo />
            <SignupForm />
            <p>
                Already have an account? Log in <a href="/">here</a>
            </p>
        </Box>
    </>
    )
}

export default Signup;