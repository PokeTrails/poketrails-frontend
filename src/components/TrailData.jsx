import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CompletedTrail from '../components/CompletedTrail';
import { capitaliseName } from '../utils';

export default function TrailData({ pokemonName, trail }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: {xs: '100', md: '20vh'}, // Ensure the Box takes full height of its parent
        textAlign: 'center' // Center text content
      }}
    >
      {/* Render details of completed trails */}
      <Box sx={{ mb: 2 }}>
      {pokemonName && (
        <>
            <CompletedTrail trailType="Wild" textColour="#188831" />
            <CompletedTrail trailType="Rocky" textColour="#C47C53" />
            <CompletedTrail trailType="Frosty" textColour="#6FABD7" />
            <CompletedTrail trailType="Wet" textColour="#015D9F" />
        </>
      )}
      </Box>

      {/* Render whether Pokémon is ready to go on trail or not */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: { xs: '15px', md: '16px' } }}
        >
          {pokemonName ? `${capitaliseName(pokemonName)} is ready to explore the ${trail} trail` : ''}
        </Typography>
      </Box>

      {/* Render Button if Pokemon is ready to go on trail and if not an egg */}
      <Box>
        {pokemonName && (
          <Button
            variant="contained"
            size="medium"
            sx={{ width: '100%', height: '50px', fontSize: { xs: '16px', md: '18px' } }}
          >
            Send {pokemonName}?
          </Button>
        )}
      </Box>
    </Box>
  );
}

TrailData.propTypes = {
  trail: PropTypes.string.isRequired,
  pokemonName: PropTypes.string,
};
