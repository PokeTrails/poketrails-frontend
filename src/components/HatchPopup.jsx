import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const HatchPopup = ({ data, onClose, onReload }) => {
  const handleClose = () => {
    onClose();
    if (onReload) onReload(); // Reload the page or refresh the party
  };

  // Determine the background color based on legendary or mythical status
  const backgroundColor = data?.is_legendary || data?.is_mythical ? '#36013f' : '#FFF';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80vw', sm: '50vw', md: '30vw' },
        maxWidth: '500px',
        backgroundColor,
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        zIndex: 1200,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Pokémon Hatched!
      </Typography>
      {data && (
        <Box>
          <img src={data.sprite} alt={data.species} style={{ maxWidth: '100%' }} />
          <Typography variant="h6" gutterBottom>
            {data.species}
          </Typography>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

HatchPopup.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func,
};

export default HatchPopup;
