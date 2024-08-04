import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

import { capitaliseName } from '../utils';

const EvolvePopup = ({ data, onClose, onReload }) => {
  const handleClose = () => {
    onClose();
    if (onReload) onReload();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80vw', sm: '50vw', md: '30vw' },
        maxWidth: '500px',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        zIndex: 1200,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >

      <Typography variant="h6" gutterBottom>
        `${capitaliseName(data.nickname)}` is evolving!
      </Typography>
      {data && (
        <Box>
          <img src={data.sprite} alt={data.species} style={{ maxWidth: '100%' }} />
          <Typography variant="h6" gutterBottom>
            {capitaliseName(data.species)}
          </Typography>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

EvolvePopup.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func,
};

export default EvolvePopup;
