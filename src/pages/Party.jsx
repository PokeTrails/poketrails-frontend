import { useState, useEffect } from 'react';
import { Box, Alert, Collapse } from '@mui/material';
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
  const [alerts, setAlerts] = useState([]);
  const [currentHappiness, setCurrentHappiness] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); // For handling fade out effect

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleAlert = (message, severity) => {
    setAlerts([{ message, severity }]); // Display the latest alert and clear the queue
    setFadeOut(false); // Reset fade-out
  };

  const handleHappinessChange = (newHappiness) => {
    setCurrentHappiness(newHappiness);
  };

  useEffect(() => {
    let fadeTimer;

    if (alerts.length > 0) {
      fadeTimer = setTimeout(() => {
        setFadeOut(true); // Start fade-out after 3 seconds
      }, 3000);
    }

    return () => clearTimeout(fadeTimer); // Cleanup timer on component unmount or alert change
  }, [alerts]);

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
          <SelectedPokemon jwt={jwt} apiURL={apiURL} pokemonID={selectedPokemon} currentHappiness={currentHappiness} />
          <Interactions
            jwt={jwt}
            apiURL={apiURL}
            pokemonID={selectedPokemon}
            onAlert={handleAlert}
            onHappinessChange={handleHappinessChange}
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

      {alerts.length > 0 && (
        <Collapse in={alerts.length > 0} sx={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              left: 16,
              width: 'calc(100% - 32px)',
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <Alert severity={alerts[0]?.severity}>{alerts[0]?.message}</Alert>
          </Box>
        </Collapse>
      )}
    </Background>
  );
}
