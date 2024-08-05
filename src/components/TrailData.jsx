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
        justifyContent: 'space-between', // Center vertically
        height: {xs: '100', md: '30vh'}, // Ensure the Box takes full height of its parent
        textAlign: 'center' // Center text content
      }}
    >
      {/* Render details of completed trails */}
      <Box sx={{ mt: {xs: 0, md: 5} }}>
      {pokemonName && (
        <>
            <CompletedTrail trailType="Wild" textColour="#188831" />
            <CompletedTrail trailType="Rocky" textColour="#C47C53" />
            <CompletedTrail trailType="Frosty" textColour="#6FABD7" />
            <CompletedTrail trailType="Wet" textColour="#015D9F" />
        </>
      )}
      </Box>

     
      <Box>
         {/* Render whether Pokémon is ready to go on trail or not */}
        <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' }, mt: {xs: 2}, mb: 2 }}
            >
            {pokemonName ? `${capitaliseName(pokemonName)} is ready to explore the ${trail} trail` : ''}
            </Typography>

         {/* Render Button if Pokemon is ready to go on trail and if not an egg */}
        {pokemonName && (
          <Button
            variant="contained"
            size="medium"
            sx={{ width: {xs: '100%', md: '80%', lg: '70%'}, height: {xs: '40px', md: '50px'}, fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '18px' } }}
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
