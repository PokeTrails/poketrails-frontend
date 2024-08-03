import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';

import { capitaliseName } from '../utils';

const HatchPopup = ({ data, onClose, onReload }) => {
  const handleClose = () => {
    onClose();
    if (onReload) onReload(); // Reload the page or refresh the party
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
        backgroundColor: '#FFF',
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        zIndex: 1200,
        textAlign: 'center',
        overflow: 'hidden', // Ensure confetti doesn't overflow
      }}
    >
      {/* Confetti effect */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
        tweenDuration={5000}
        gravity={0.2}
        colors={['#ff0000', '#00ff00', '#0000ff']}
      />

      <Typography variant="h6" gutterBottom>
        Pokémon Hatched!
      </Typography>
      {data && (
        <Box>
          <img src={data.sprite} alt={data.species} style={{ maxWidth: '100%' }} />
          <Typography variant="h6" gutterBottom>
            {capitaliseName(data.species)}
          </Typography>
          <Typography variant="body1">
            Mythical: {data.is_mythical ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body1">
            Legendary: {data.is_legendary ? 'Yes' : 'No'}
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
