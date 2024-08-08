import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

function SignupPopup({ data, onClose }) {
  const { title, message, type } = data;


  useEffect(() => {
    // Check if this is the user's first login
    if (localStorage.getItem('firstLogin') === 'true') {
      localStorage.removeItem('firstLogin');
    }
  }, []);

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
