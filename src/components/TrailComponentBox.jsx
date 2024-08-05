import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';

export default function TrailComponentBox({ componentDetails }) {
    const jwt = localStorage.getItem('jwt');
    const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
    
    const [selectedPokemon, setSelectedPokemon] = useState(null);

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
            width: { xs: '100%', md: '100%' },
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '30vw',
                maxHeight: '50vh',
                flexGrow: 1,
            }}>
                <SelectedPokemon jwt={jwt} apiURL={apiURL} pokemonID={selectedPokemon} />
            </Box>
        </Box>
        <PokemonParty apiURL={apiURL} jwt={jwt} onPokemonSelect={handlePokemonSelect} />
    </>
  );
}

TrailComponentBox.propTypes = {
  componentDetails: PropTypes.object,
  children: PropTypes.node.isRequired,
};
