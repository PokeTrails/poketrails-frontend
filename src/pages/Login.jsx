import { Box, Typography, Link } from '@mui/material';

import AppLogo from '../components/AppLogo'; // Adjust the import path as needed
import LoginForm from '../components/LoginForm'; // Adjust the import path as needed

function Login() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "5%"}}>
          <AppLogo />
          <LoginForm />
          <Typography variant="body1" paragraph>
            Don't have an account? <Link href="/signup">Sign up here!</Link>
          </Typography>
          <Typography variant="body1">
            <Link href="mailto:support@poketrails.tech">Forgot your password?</Link>
          </Typography>
      </Box>
    </>
  );
}

export default Login;
