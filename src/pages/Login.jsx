import * as React from 'react';
import { Box, Typography } from '@mui/material';

import AppLogo from '../components/AppLogo'; // Adjust the import path as needed
import LoginForm from '../components/LoginForm'; // Adjust the import path as needed

function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%"}}>
          <AppLogo />
        <LoginForm />
        <Typography variant="body1" paragraph>
            Don't have an account? Sign up <a href="/signup">here</a>
        </Typography>
        <Typography variant="body1">
          <a href="mailto:support@poketrails.tech">Forgot your password?</a>
        </Typography>
      </Box>
    </>
  );
}

export default Login;
