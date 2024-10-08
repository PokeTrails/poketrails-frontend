import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, CircularProgress, TextField, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import eggSprite from '../assets/pokemon_egg_animated.gif';
import shinyIcon from '../assets/shiny_icon.png';

import { capitaliseName, formatTime } from '../utils';
import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';

import HatchPopup from './HatchPopup';

export default function SelectedPokemon({ componentBackgroundColour, tileColour, pokemonID, currentHappiness, onPokemonNameChange }) {

  // Initialise state variables
  const [pokemonData, setPokemonData] = useState(null);
  const { isLoading, setIsLoading } = useLoading();
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [isHatching, setIsHatching] = useState(false);

  // Get JWT and apiURL data
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  // Fetch Pokémon data for the selected Pokémon
  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonID) return;

      setIsLoading(true);

      // Fetch Pokémon data
      try {
        const response = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setPokemonData(response.data);
        setError(null);

        if (response.data.eggHatched === false) {
          setTimeLeft(response.data.timeLeft);
        }

        // Lift the Pokémon name to the parent component
        if (onPokemonNameChange) {
          onPokemonNameChange(response.data.nickname);
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
  }, [pokemonID, apiURL, jwt, onPokemonNameChange]);

  useEffect(() => {
    let timer;
    if (timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleEditClick = () => {
    if (pokemonData) {
      setNewNickname(pokemonData.nickname || '');
      setIsEditing(true);
    }
  };

  const handleSaveClick = async () => {
    if (!pokemonData) return;

    // Update the nickname
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

  // Handle cancel button click
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Handle hatch button click
  const handleHatchClick = async () => {
    setIsHatching(true);
    try {
      const response = await axios.patch(`${apiURL}/pokemon/hatch/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      openPopup(response.data);
    } catch (err) {
      console.error('Failed to hatch Pokémon:', err);
      setError('Failed to hatch Pokémon.');
    } finally {
      setIsHatching(false);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        pb: 3,
        backgroundColor: componentBackgroundColour || 'rgba(164, 218, 195, 0.5)',
        width: { xs: '80vw', md: '20vw' },
        maxWidth: '550px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        mr: 2,
        ml: 2,
      }}
    >
      {error && <Typography color="error">{error}</Typography>}

      <Box
        sx={{
          borderRadius: 2,
          width: '100%',
          position: 'relative',
          backgroundColor: pokemonData?.isShiny ? 'rgba(255,254,0,0.12)' : tileColour, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '75%',
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
          {/* Display a loading spinner while fetching data */}
          {isLoading ? (
            <CircularProgress sx={{ width: '70%' }} />
          ) : pokemonData ? (
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
          ) : (
            <Typography>Select a Pokémon to view</Typography>
          )}
        </Box>
      </Box>

      {/* Display Pokémon nickname and species */}
      {pokemonData && (
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
                    {capitaliseName(pokemonData.nickname)}
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

                {(pokemonData.nickname?.toLowerCase() !== pokemonData.species?.toLowerCase()) && (
                  <Typography
                    variant="h6"
                    fontSize={{ xs: '16px', md: '18px' }}
                    textAlign="center"
                    sx={{ pt: 1 }}
                  >
                    {`(${capitaliseName(pokemonData.species)})`}
                  </Typography>
                )}
              </>
            )}
          </Box>

          <Box>
            <Typography
              variant="h6"
              fontSize={{ xs: '16px', md: '18px' }}
              textAlign="center"
              sx={{ pt: 2 }}
            >
              {pokemonData.eggHatched ? 'Happiness' : 'Time Left to Hatch:'}
            </Typography>

            {pokemonData.eggHatched ? (
              <>
                <Box sx={{ width: '100%', mb: 1, pt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(currentHappiness || pokemonData.current_happiness) / pokemonData.target_happiness * 100 || 0}
                    sx={{ height: 10, borderRadius: 5, width: { xs: '150px', sm: '300px', md: '15vw' } }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ pt: 1 }}
                  textAlign="center"
                >
                  {`${currentHappiness || pokemonData.current_happiness} / ${pokemonData.target_happiness}`}
                </Typography>
              </>
            ) : (
              <>
                {timeLeft > 0 && (
                  <Typography
                    variant="h6"
                    fontSize={{ xs: '18px', md: '20px' }}
                    textAlign="center"
                  >
                    {formatTime(timeLeft)}
                  </Typography>
                )}
                {timeLeft <= 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleHatchClick}
                    disabled={isHatching}
                    sx={{ mt: 2, mr: {xs: 2, md: 2}, width: '100%' }}
                  >
                    Hatch now!
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      )}

      {/* Render the HatchPopup component */}
      {showPopup && <HatchPopup data={popupData} onClose={closePopup} />}
    </Box>
  );
}

SelectedPokemon.propTypes = {
  componentBackgroundColour: PropTypes.string,
  tileColour: PropTypes.string,
  jwt: PropTypes.string,
  apiURL: PropTypes.string,
  pokemonID: PropTypes.string,
  currentHappiness: PropTypes.number,
  onPokemonNameChange: PropTypes.func,
};
