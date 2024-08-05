import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function TrailData({ pokemonName }) {
    console.log(pokemonName)
  return (
    <Box>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>

      {pokemonName && (
        <Button
        variant="contained"
        size="medium"
        sx={{ width: { xs: '100%', md: '70%' }, height: '50px', fontSize: { xs: '16px', md: '18px' } }}
      >
        Send {pokemonName}?
      </Button>
      )}
      
    </Box>
  );
}

TrailData.propTypes = {
  pokemonName: PropTypes.string
};
