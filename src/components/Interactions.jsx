import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import InteractionButton from './InteractionButton';
import EvolvePopup from './EvolvePopup';

import useGetTrailData from '../hooks/useGetTrailData';
import usePlayCryAudio from '../hooks/usePlayCryAudio';
import usePopup from '../hooks/usePopup';

import { capitaliseName } from '../utils';

export default function Interactions({ componentBackgroundColour, componentHeadingColour, apiURL, jwt, pokemonID, onAlert, onHappinessChange }) {
  // State for Pokémon details
  const [isEgg, setIsEgg] = useState(true);
  const [currentHappiness, setCurrentHappiness] = useState(0);
  const [targetHappiness, setTargetHappiness] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cryUrl, setCryUrl] = useState('');

  const { currentlyOnTrail } = useGetTrailData(pokemonID) || {}; // Fixed parameter here

  const playCryAudio = usePlayCryAudio(onAlert);
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  // Fetch Pokémon data
  const fetchPokemonData = useCallback(async () => {
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
  }, [apiURL, jwt, pokemonID, onHappinessChange]);

  // Fetch Pokémon data on component mount
  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  // Handle interaction with Pokémon
  const handleInteractionClick = async (action) => {
    // Prevent interactions while loading
    setIsLoading(true);
    try {
      // Send interaction request to the server
      const response = await axios.patch(`${apiURL}/pokemon/${action}/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Update current happiness and display alert
      setCurrentHappiness(response.data.current_happiness);
      onHappinessChange(response.data.current_happiness);

      let message = '';
      let severity = 'info'; // Default severity

      // Display alert based on interaction response
      if (response.status === 200) {
        if (response.data.happiness_increased) {
          message = `Happiness increased by ${response.data.happiness_increased}.`;
          playCryAudio(cryUrl, 1);
          severity = 'success';
        } else if (response.data.happiness_reduced) {
          message = `Happiness reduced by ${response.data.happiness_reduced}.`;
          playCryAudio(cryUrl, 0.7); // Play cry at a lower pitch if happiness is reduced
          severity = 'error';
        } else if (response.data.message) {
          message = response.data.message;
        }
      }

      // Display alert
      onAlert(capitaliseName(message), severity);
    } catch (err) {
      console.error(`Error handling ${action} interaction:`, err);
      let message = 'Failed to perform interaction';
      let severity = 'error';

      if (err.response?.status === 400) {
        message = err.response.data.message || 'Error: Unable to interact. Please wait a moment';
      }

      onAlert(capitaliseName(message), severity);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Pokémon evolution
  const handleEvolveClick = async () => {
    setIsLoading(true);
    try {
      // Send evolution request to the server
      const response = await axios.patch(`${apiURL}/pokemon/evolve/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Open the evolution popup with the received data
      openPopup(response.data);
    } catch (err) {
      console.error('Failed to evolve Pokémon:', err);
      onAlert(capitaliseName('Failed to evolve Pokémon'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if Pokémon can evolve to enable the evolve button
  const pokemonCanEvolve = currentLevel < maxLevel && !isEgg && currentHappiness >= targetHappiness;

  return (
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '40vh', md: '40vh' },
        backgroundColor: componentBackgroundColour || 'rgba(164, 218, 195, 0.5)',
        minWidth: { xs: '150px', md: '250px' },
        width: { xs: '70%', md: '20vw' },
        maxHeight: '500px',
        maxWidth: '1200px',
        mr: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: componentHeadingColour || 'rgba(122, 220, 185, 0.6)',
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
        {currentlyOnTrail ? (
          // Render message if the Pokémon is on a trail
          <Typography variant="h6" color="textSecondary">
            This Pokémon is currently exploring a trail
          </Typography>
        ) : isLoading ? (
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

            {/* Render evolve button if Pokémon can evolve */}
            {currentLevel < maxLevel && (
              <InteractionButton
                onClick={handleEvolveClick}
                disabled={!pokemonCanEvolve}
                label="Evolve?"
              />
            )}
          </>
        )}
      </Box>

      {/* Render evolution popup component if Pokémon can evolve */}
      {showPopup && (
        <EvolvePopup
          data={popupData}
          onClose={closePopup}
        />
      )}
    </Box>
  );
}

Interactions.propTypes = {
  componentBackgroundColour: PropTypes.string,
  componentHeadingColour: PropTypes.string,
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  pokemonID: PropTypes.string,
  onAlert: PropTypes.func.isRequired,
  onHappinessChange: PropTypes.func.isRequired,
};
