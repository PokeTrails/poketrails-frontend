import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, TextField, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import eggSprite from '../assets/pokemon_egg_animated.gif';
import shinyIcon from '../assets/shiny_icon.png';

export default function SelectedPokemon({ jwt, apiURL, pokemonID }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  // Fetch Pokémon data when component mounts or when pokemonID changes
  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonID) return;

      setIsLoading(true);

      try {
        const response = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setPokemonData(response.data);
        setError(null);

        // If Pokémon is an egg, set timeLeft to the time left to hatch
        if (response.data.eggHatched === false && response.data.timeLeft) {
          setTimeLeft(response.data.timeLeft);
        }
      } catch (err) {
        console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, err);
        setError('Failed to fetch Pokémon data.');
        setPokemonData(null);
        setTimeLeft(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonID, apiURL, jwt]);

  // Update timeLeft every second if it's not null
  useEffect(() => {
    let timer;
    if (timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [timeLeft]);

  // Format milliseconds to HH:MM:SS
  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return '00:00:00';

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Capitalize the first letter of a Pokémon name
  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Edit the nickname of the Pokémon
  const handleEditClick = () => {
    if (pokemonData) {
      setNewNickname(pokemonData.nickname || ''); // Set input field with current nickname or empty string
      setIsEditing(true);
    }
  };

  // Save the new nickname to the server
  const handleSaveClick = async () => {
    if (!pokemonData) return;

    try {
      await axios.patch(`${apiURL}/pokemon/nickname/${pokemonID}`, { nickname: newNickname }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setPokemonData(prevData => ({ ...prevData, nickname: newNickname }));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update nickname:', err);
      setError('Failed to update nickname.');
    }
  };

  // Cancel editing and revert to non-edit mode
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '80vw', md: '30vh' }, // Adjust width for smaller screens
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        mr: 2,
        ml: 2,
      }}
    >
      {/* Display error message if there is an error */}
      {error && <Typography color="error">{error}</Typography>}

      {pokemonData ? (
        <>
          {/* Box for displaying Pokémon sprite */}
          <Box
            sx={{
              borderRadius: 2,
              width: '100%',
              position: 'relative',
              backgroundColor: '#A4DAC3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '75%', // 4:3 aspect ratio
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={pokemonData.eggHatched ? pokemonData.sprite : eggSprite}
                alt={pokemonData.nickname || 'Pokémon'}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  transform: {
                    xs: 'scale(1)',
                    sm: 'scale(1.2)',
                    md: 'scale(1.5)',
                    lg: 'scale(2)',
                  },
                }}
              />
            </Box>
          </Box>

          {/* Box for displaying Pokémon details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '100%',
              pb: 2,
              paddingTop: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Edit mode or display mode for nickname */}
              {isEditing ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    sx={{ mr: 1 }}
                  />
                  <IconButton onClick={handleSaveClick}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelClick}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="h4"
                      fontSize={{ xs: '20px', md: '25px' }}
                      fontWeight="bold"
                      textAlign="center"
                      sx={{ mr: 1, cursor: 'pointer' }}
                      onClick={handleEditClick}
                    >
                      {capitalizeName(pokemonData.nickname)}
                    </Typography>
                    {pokemonData.isShiny && (
                      <Box
                        component="img"
                        src={shinyIcon}
                        alt="Shiny"
                        sx={{
                          width: { xs: 20, md: 30 },
                          height: { xs: 20, md: 30 },
                          marginTop: { xs: 'auto', md: 'auto' },
                          marginBottom: { xs: 'auto', md: 'auto' },
                        }}
                      />
                    )}
                  </Box>

                  {/* Display species name if it is different from the nickname */}
                  {(pokemonData.nickname?.toLowerCase() !== pokemonData.species?.toLowerCase()) && (
                    <Typography
                      variant="h6"
                      fontSize={{ xs: '16px', md: '18px' }}
                      textAlign="center"
                      sx={{ pt: 1 }}
                    >
                      {`(${capitalizeName(pokemonData.species)})`}
                    </Typography>
                  )}
                </>
              )}
            </Box>

            {/* Display happiness or time left to hatch */}
            <Box>
              <Typography
                variant="h6"
                fontSize={{ xs: '16px', md: '18px' }}
                textAlign="center"
                sx={{ pt: 2 }}
              >
                {pokemonData.eggHatched ? 'Happiness' : 'Time Left to Hatch'}
              </Typography>

              {/* Show Happiness if Pokémon has hatched */}
              {pokemonData.eggHatched ? (
                <>
                  <Box sx={{ width: '100%', mb: 1, pt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(pokemonData.current_happiness / pokemonData.target_happiness) * 100 || 0}
                      sx={{ height: 10, borderRadius: 5, width: { xs: '150px', sm: '300px' } }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    fontSize={{ xs: '16px', md: '18px' }}
                    textAlign="center"
                  >
                    {pokemonData.current_happiness || 0} / {pokemonData.target_happiness || 0}
                  </Typography>
                </>
              ) : (
                // Show time left to hatch if Pokémon is an egg
                <Typography
                  variant="h6"
                  fontSize={{ xs: '16px', md: '18px' }}
                  textAlign="center"
                >
                  {formatTime(timeLeft)}
                </Typography>
              )}
            </Box>
          </Box>
        </>
      ) : !isLoading ? (
        <Typography>Select a Pokémon to view details</Typography>
      ) : null}
    </Box>
  );
}

SelectedPokemon.propTypes = {
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  pokemonID: PropTypes.string,
};
