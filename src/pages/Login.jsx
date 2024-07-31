import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link as ReactLink } from 'react-router-dom';

import AppLogo from '../components/AppLogo';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%" }}>
        {/* Add the AppLogo and SignupForm components to the Login page */}
        <AppLogo />
        <LoginForm />

        {/* Link to the Sign Up page */}
        <Typography variant="body1" paragraph>
          Don't have an account?{' '}
          <MuiLink component={ReactLink} to="/signup" underline="hover">
            Sign up here!
          </MuiLink>
        </Typography>
        
        {/* Link to reset password */}
        <Typography variant="body1">
          <MuiLink href="mailto:support@poketrails.tech" underline="hover">
            Forgot your password?
          </MuiLink>
        </Typography>
      </Box>
    </>
  );
}