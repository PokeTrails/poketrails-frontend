import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

import useCheckFirstLogin from '../hooks/useCheckFirstLogin';
import useGetEgg from '../hooks/useGetEgg';

function SignupPopup({ data, onClose }) {
  const { title, message, type } = data;
  const { eggResponse, error, clearError, getEgg } = useGetEgg();
  const { isFirstLogin, error: checkFirstLoginError, clearError: clearCheckFirstLoginError } = useCheckFirstLogin();


  useEffect(() => {
    // Check if this is the user's first login
    if (localStorage.getItem('firstLogin') === 'true' && isFirstLogin) {
      // Fetch the egg and show the popup
      getEgg();
      // Remove the flag to prevent this from happening again
      localStorage.removeItem('firstLogin');
    }
  }, [getEgg, isFirstLogin]);

  // Display the response or error from the hook if needed
  useEffect(() => {
    if (eggResponse) {
      console.log(eggResponse);
    }
    if (error) {
      console.error(error);
      clearError(); // Optionally clear the error after logging
    }
  }, [eggResponse, error, clearError]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        backgroundColor: 'background.paper',
        padding: 3,
        boxShadow: 3,
        zIndex: 1300,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" color={type === 'success' ? 'success.main' : 'error.main'}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, whiteSpace: 'pre-line' }}
      >
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
}

SignupPopup.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignupPopup;
