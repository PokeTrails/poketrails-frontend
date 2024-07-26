import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as ReactLink } from 'react-router-dom';

import AppLogo from '../components/AppLogo';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%" }}>
        <AppLogo />
        <LoginForm />
        <Typography variant="body1" paragraph>
          Don't have an account?{' '}
          <MuiLink component={ReactLink} to="/signup" underline="hover">
            Sign up here!
          </MuiLink>
        </Typography>
        <Typography variant="body1">
          <MuiLink href="mailto:support@poketrails.tech" underline="hover">
            Forgot your password?
          </MuiLink>
        </Typography>
      </Box>
    </>
  );
}

export default Login;
