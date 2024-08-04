import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import InteractionButton from './InteractionButton';
import usePlayCryAudio from '../hooks/usePlayCryAudio'; // Adjust the path as necessary

export default function Interactions({ apiURL, jwt, pokemonID, onAlert, onHappinessChange }) {
  const [isEgg, setIsEgg] = useState(true);
  const [currentHappiness, setCurrentHappiness] = useState(0);
  const [targetHappiness, setTargetHappiness] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cryUrl, setCryUrl] = useState('');

  const playCryAudio = usePlayCryAudio(onAlert);

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
        setTargetHappiness(response.data.target_happiness || 0);
        setCurrentLevel(response.data.current_level || 0);
        setMaxLevel(response.data.max_level || 0);
        onHappinessChange(response.data.current_happiness);

        setCryUrl(response.data.cries || '');
      } catch (err) {
        console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, err);
        setIsEgg(true);
      }
    };

    fetchPokemonData();
  }, [apiURL, jwt, pokemonID, onHappinessChange]);

  const handleInteractionClick = async (action) => {
    setIsLoading(true);
  
    try {
      const response = await axios.patch(`${apiURL}/pokemon/${action}/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      setCurrentHappiness(response.data.current_happiness);
      onHappinessChange(response.data.current_happiness);
  
      let message = '';
      let severity = 'info';
  
      if (response.status === 200) {
        if (response.data.happiness_increased) {
          message = `Happiness increased by ${response.data.happiness_increased}.`;
          playCryAudio(cryUrl, 1);
          severity = 'success';
        } else if (response.data.happiness_reduced) {
          message = `Happiness reduced by ${response.data.happiness_reduced}.`;
          playCryAudio(cryUrl, 0.7);
          severity = 'error';
        } else if (response.data.message) {
          message = response.data.message;
        }
      }
  
      onAlert(message, severity);
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

  // Check if the evolve button should be rendered
  const renderEvolveButton = currentLevel < maxLevel;
  
  // Check if the evolve button can be enabled
  const pokemonCanEvolve = !isEgg && currentHappiness >= targetHappiness;

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
            <InteractionButton
              onClick={() => handleInteractionClick('talk')}
              disabled={isEgg}
              label="Talk"
            />
            <InteractionButton
              onClick={() => handleInteractionClick('play')}
              disabled={isEgg}
              label="Play"
            />
            <InteractionButton
              onClick={() => handleInteractionClick('feed')}
              disabled={isEgg}
              label="Feed"
            />
            {renderEvolveButton && (
              <InteractionButton
                onClick={() => handleInteractionClick('evolve')}
                disabled={!pokemonCanEvolve}
                label="Evolve?"
              />
            )}
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
