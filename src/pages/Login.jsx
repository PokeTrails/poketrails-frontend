import * as React from 'react';
import { Box } from '@mui/material';
import AppLogo from '../components/AppLogo'; // Adjust the import path as needed
import LoginForm from '../components/LoginForm'; // Adjust the import path as needed

function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <AppLogo />
        <LoginForm />
        <p>
          Don't have an account? Sign up <a href="./signup">here</a>
        </p>
        <p>
          <a href="mailto:support@poketrails.tech">Forgot your password?</a>
        </p>
      </Box>
    </>
  );
}

export default Login;
