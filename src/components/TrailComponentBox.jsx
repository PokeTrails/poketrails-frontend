import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';
import TrailLog from './TrailLog';
import TrailData from '../components/TrailData';

export default function TrailComponentBox({ componentDetails, headingColour }) {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState(''); // New state for Pokémon name

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonNameChange = (name) => {
    setPokemonName(name);
  };

  return (
    <>
      {/* Overall Box Component holding everything */}
      <Box
        sx={{
          mt: {xs: 0, md: 2},
          backgroundColor: componentDetails.componentBackgroundColour,
          width: { xs: '100vw', md: '1200px', lg: '2000px' },
          maxWidth: { xs: '100%', md: '90vw' },
          borderRadius: 2,
        }}
      >
        {/* Heading Box for Component name */}
        <Box
          sx={{
            backgroundColor: componentDetails.componentHeadingColour,
            pt: 1,
            pb: 0.5,
            mb: 1,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography
            sx={{ color: headingColour }}
            variant="h4"
            fontSize={{ xs: '20px', md: '25px' }}
            fontWeight={500}
            gutterBottom
            textAlign="center"
          >
            {componentDetails.trail} Trail
          </Typography>
        </Box>

        {/* Main Content goes here */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mb: 2
          }}
        >
          {/* Holds Selected Pokémon */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              maxHeight: '50vh',
              overflow: 'hidden',
            }}
          >
            {/* Render selected pokemon component */}
            <SelectedPokemon
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              tileColour={componentDetails.tileColour}
              jwt={jwt}
              apiURL={apiURL}
              pokemonID={selectedPokemon}
              onPokemonNameChange={handlePokemonNameChange}
            />
          </Box>

          {/* Shows Trail Data for Pokémon */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              mt: { xs: 2, md: 0 },
              mr: {xs: 2, md: 4, lg: 0},
              ml: {xs: 0, lg: 4},
              mb: {xs: 2, md: 0},
              maxWidth: '40vw'
            }}
          >
            {/* If Pokemon name is undefined, set default message here */}
            {pokemonName ? (
              <TrailData trail={componentDetails.trail} pokemonName={pokemonName} />
            ) : (
              'Please select a valid Pokémon'
            )}
          </Box>

          {/* Holds Trail Log */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              flex: 1,
              pr: 2,
            }}
          >
            <TrailLog 
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              componentHeadingColour={componentDetails.componentHeadingColour}
            />
          </Box>
        </Box>
      </Box>

      {/* Trail Log renders below box on XS screens */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          mt: 2
        }}
      >
        <TrailLog
         componentBackgroundColour={componentDetails.componentBackgroundColour}
         componentHeadingColour={componentDetails.componentHeadingColour}
         />
      </Box>

      <PokemonParty
      componentBackgroundColour={componentDetails.componentBackgroundColour}
      componentHeadingColour={componentDetails.componentHeadingColour}
      tileColour={componentDetails.tileColour}
      apiURL={apiURL}
      jwt={jwt}
      onPokemonSelect={handlePokemonSelect} />
    </>
  );
}

TrailComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  headingColour: PropTypes.string,
};
