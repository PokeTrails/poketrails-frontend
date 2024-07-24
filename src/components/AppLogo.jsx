import * as React from 'react';
import { Box } from '@mui/material';
import appLogo from '../assets/app_logo.png';

function AppLogo() {
    return (
        <Box sx={{ width: '650px', height: 'auto', marginTop: "5%" }}> {/* Adjust width as needed */}
            <img 
                src={appLogo} 
                alt="Application Logo" 
                style={{ width: '100%', height: 'auto' }} 
            />
        </Box>
    );
}

export default AppLogo;
