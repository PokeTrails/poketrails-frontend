import { Box } from '@mui/material';
import appLogo from '../assets/app_logo.png';

function AppLogo() {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        width: { xs: '300px', sm: '400px', md: '500px', lg: '650px' },
        height: 'auto',
        marginTop: '5%',
      }}
    >
      <img
        src={appLogo}
        alt="Application Logo"
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
}

export default AppLogo;
