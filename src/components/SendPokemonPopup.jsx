import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const SendPokemonPopup = ({ data, onClose, pokemonName, trail }) => (
  <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '400px',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2
    }}
  >
    <Typography variant="h6" component="div" gutterBottom>
      Sending {pokemonName}
    </Typography>
    <Typography variant="body1" component="div">
      {pokemonName} is being sent on the {trail} trail. <br /> It will return in about {data.timeLeft}.
    </Typography>
    <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
      Close
    </Button>
  </Box>
);

SendPokemonPopup.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  pokemonName: PropTypes.string.isRequired,
  trail: PropTypes.string.isRequired,
};

export default SendPokemonPopup;
