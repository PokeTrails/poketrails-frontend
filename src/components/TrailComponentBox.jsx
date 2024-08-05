import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';
import TrailLog from './TrailLog';
import TrailData from '../components/TrailData';

export default function TrailComponentBox({ componentDetails }) {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  console.log(selectedPokemon)

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <>
      {/* Overall Box Component holding everything */}
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'rgba(164, 218, 195, 0.5)',
          width: { xs: '100vw', md: '100vw' },
          maxWidth: '1200px',
          borderRadius: 2,
        }}
      >
        {/* Heading Box for Component name */}
        <Box
          sx={{
            backgroundColor: 'rgba(122, 220, 185, 0.6)',
            pt: 1,
            pb: 0.5,
            mb: 1,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography variant="h4" fontSize={{ xs: '20px', md: '25px' }} gutterBottom textAlign="center">
            {componentDetails.heading}
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
              overflow: 'hidden'
            }}
          >
            {selectedPokemon ? (
              <SelectedPokemon jwt={jwt} apiURL={apiURL} pokemonID={selectedPokemon} />
            ) : (
              <Typography variant="body1" textAlign="center" sx={{pl: 3}}>
                Select a Pokémon to get started
              </Typography>
            )}
          </Box>

          {/* Shows Trail Data for Pokémon */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              mt: { xs: 2, md: 0 }
            }}
          >
            <TrailData apiURL={apiURL} selectedPokemon={selectedPokemon} />
          </Box>

          {/* Holds Trail Log */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              flex: 1,
              pr: 2,
            }}
          >
            <TrailLog />
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
        <TrailLog />
      </Box>

      <PokemonParty apiURL={apiURL} jwt={jwt} onPokemonSelect={handlePokemonSelect} />
    </>
  );
}

TrailComponentBox.propTypes = {
  componentDetails: PropTypes.object,
};
