import { Box } from '@mui/material';
import { useState } from 'react';

import SelectedPokemon from '../components/SelectedPokemon';
import PokemonParty from '../components/UserParty';
import Interactions from '../components/Interactions';
import TrailLog from '../components/TrailLog';

export default function Party() {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`; // URL to fetch data from

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'row' },
          justifyContent: { md: 'center' },
          alignItems: { xs: 'center', md: 'flex-start' },
          width: '100%',
          maxHeight: { md: '50vh' },
          flexGrow: 1,
        }}
      >
        <SelectedPokemon jwt={jwt} apiURL={apiURL} pokemonID={selectedPokemon} />
        <Interactions jwt={jwt} apiURL={apiURL} pokemonID={selectedPokemon} />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <TrailLog />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: { xs: 2, md: 0 }, width: '100%' }}>
        <TrailLog />
      </Box>
      <PokemonParty apiURL={apiURL} jwt={jwt} onPokemonSelect={handlePokemonSelect} />
    </Box>
  );
}
