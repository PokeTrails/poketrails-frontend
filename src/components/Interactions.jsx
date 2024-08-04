import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

export default function Interactions({ apiURL, jwt, pokemonID, onAlert, onHappinessChange }) {
  const [isEgg, setIsEgg] = useState(true);
  const [currentHappiness, setCurrentHappiness] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cryUrl, setCryUrl] = useState(''); // State to store Pokémon cry URL

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonID) return;

      try {
        const response = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        setIsEgg(response.data.eggHatched === false);
        setCurrentHappiness(response.data.current_happiness);
        onHappinessChange(response.data.current_happiness);

        // Store the cry URL
        setCryUrl(response.data.cries || ''); // Adjust property name if needed
      } catch (err) {
        console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, err);
        setIsEgg(true); // Assume it's an egg if there's an error
      }
    };

    fetchPokemonData();
  }, [apiURL, jwt, pokemonID, onHappinessChange]);

  const handleInteractionClick = async (action) => {
    setIsLoading(true);
  
    try {
      console.log(`Making request to ${apiURL}/pokemon/${action}/${pokemonID}`);
      const response = await axios.patch(`${apiURL}/pokemon/${action}/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      console.log('Response:', response.data);
  
      setCurrentHappiness(response.data.current_happiness);
      onHappinessChange(response.data.current_happiness);
  
      let message = '';
      let severity = 'info';
  
      if (response.status === 200) {
        if (response.data.happiness_increased) {
          message = `Happiness increased by ${response.data.happiness_increased}.`;
          severity = 'success';
        } else if (response.data.happiness_reduced) {
          message = `Happiness reduced by ${response.data.happiness_reduced}.`;
          severity = 'error';
        } else if (response.data.message) {
          message = response.data.message;
        }
      }
  
      onAlert(message, severity);
  
      if (action === 'talk' && cryUrl) {
        console.log('Playing cry sound from URL:', cryUrl);
        const audio = new Audio(cryUrl);
        audio.volume = 0.1;
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
          onAlert('Error playing the Pokémon cry sound.', 'error');
        });
      }
    } catch (err) {
      console.error(`Error handling ${action} interaction:`, err);
      let message = 'Failed to perform interaction.';
      let severity = 'error';
  
      if (err.response?.status === 400) {
        message = err.response.data.message || 'Error: Unable to interact. Please wait a moment.';
      }
  
      onAlert(message, severity);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '40vh', md: '40vh' },
        backgroundColor: 'rgba(164, 218, 195, 0.5)',
        minWidth: { xs: '150px', md: '250px' },
        width: { xs: '70%', md: '30vh' },
        maxWidth: '1200px',
        mr: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: 'rgba(122, 220, 185, 0.6)',
          pt: 1,
          pb: 0.5,
          mb: 1,
        }}
      >
        <Typography variant="h4" fontSize={{ xs: '20px', md: '25px' }} gutterBottom textAlign="center">
          Interact
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '80%',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "70%", height: { xs: '40px', md: '60px' }, fontSize: { xs: '16px', md: '20px' } }}
              disabled={isEgg}
              onClick={() => handleInteractionClick('talk')}
            >
              Talk
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "70%", height: { xs: '40px', md: '60px' }, fontSize: { xs: '16px', md: '20px' } }}
              disabled={isEgg}
              onClick={() => handleInteractionClick('play')}
            >
              Play
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ width: "70%", height: { xs: '40px', md: '60px' }, fontSize: { xs: '16px', md: '20px' } }}
              disabled={isEgg}
              onClick={() => handleInteractionClick('feed')}
            >
              Feed
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: "70%", height: { xs: '40px', md: '60px' }, fontSize: { xs: '16px', md: '20px' } }}
              disabled
            >
              Evolve?
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

Interactions.propTypes = {
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  pokemonID: PropTypes.string.isRequired,
  onAlert: PropTypes.func.isRequired,
  onHappinessChange: PropTypes.func.isRequired,
};
