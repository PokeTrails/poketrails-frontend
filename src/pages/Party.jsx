import { useState } from 'react';
import { Box, Alert } from '@mui/material';
import SelectedPokemon from '../components/SelectedPokemon';
import PokemonParty from '../components/UserParty';
import Interactions from '../components/Interactions';
import TrailLog from '../components/TrailLog';
import Background from '../components/Background';

import backgroundImg from '../assets/main_background.jpg';

export default function Party() {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [alert, setAlert] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAlert = (message, severity) => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000); // Clear alert after 5 seconds
  };

  return (
    <Background backgroundImg={backgroundImg} backgroundColour="#C9EECF">
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', overflow: 'auto', pb: 2 }}>
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
          <Interactions
            jwt={jwt}
            apiURL={apiURL}
            pokemonID={selectedPokemon}
            onAlert={handleAlert} // Pass alert handler
          />
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <TrailLog />
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: { xs: 2, md: 0 }, width: '100%' }}>
          <TrailLog />
        </Box>
        <PokemonParty apiURL={apiURL} jwt={jwt} onPokemonSelect={handlePokemonSelect} />
      </Box>

      {alert && (
        <Box sx={{ position: 'fixed', bottom: 16, left: 16, width: 'calc(100% - 32px)' }}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Box>
      )}
    </Background>
  );
}
