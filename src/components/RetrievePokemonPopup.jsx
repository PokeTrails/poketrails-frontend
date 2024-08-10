import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const RetrievePokemonPopup = ({ data, onClose, pokemonName, trail }) => (
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
      borderRadius: 2,
      zIndex: 2
    }}
  >
    <Typography variant="h6" component="div" gutterBottom>
      Your Pokémon has returned!
    </Typography>
    <img
      src={data.sprite}
      alt={pokemonName}
      style={{
        maxWidth: '100%',
        animation: 'fadeIn 3s forwards',
      }}
    />
    <Typography variant="body1" component="div">
      {pokemonName} has successfully returned from the {trail} trail! <br />
    </Typography>
    <Typography variant="body1" component="div">
      <br />
    </Typography>
    <Typography variant="body1" component="div">
      Happiness Earned: {data.runningHappiness}
    </Typography>
    <Typography variant="body1" component="div">
      Pokedollars Found: {data.runningBalance}
    </Typography>
    <Typography variant="body1" component="div">
      Egg Vouchers Found: {data.runningVoucher}
    </Typography>
    <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
      Close
    </Button>
    <style>
      {`
        @keyframes fadeIn {
          100% { opacity: 1; }
            0% { opacity: 0; }
          }
      `}
    </style>
  </Box>
);

RetrievePokemonPopup.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  pokemonName: PropTypes.string.isRequired,
  trail: PropTypes.string.isRequired,
};

export default RetrievePokemonPopup;
