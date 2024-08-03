import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import eggSprite from '../assets/pokemon_egg_animated.gif'; // Import egg sprite

export default function SelectedPokemon({ jwt, apiURL, pokemonID }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

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

        if (response.data.eggHatched === false) {
          setTimeLeft(response.data.timeLeft); // Initialize timeLeft
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

  useEffect(() => {
    let timer;
    if (timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [timeLeft]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '40vh', md: '40vh' },
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '50vw', md: '30vh' },
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        mr: 2,
        ml: 2,
      }}
    >
      {error && <Typography color="error">{error}</Typography>}

      {pokemonData && (
        <>
          <Box
            sx={{
              borderRadius: 2,
              width: '100%',
              position: 'relative',
              backgroundColor: '#A4DAC3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={pokemonData.eggHatched ? pokemonData.sprite : eggSprite}
                alt={pokemonData.species}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  transform: {
                    xs: 'scale(2)',
                    md: 'scale(3)',
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '100%',
              paddingTop: 2,
            }}
          >
            <Typography
              variant="h4"
              fontSize={{ xs: '20px', md: '25px' }}
              fontWeight="bold"
              textAlign="center"
            >
              {capitalizeName(pokemonData.species)}
            </Typography>

            <Box>
              <Typography
                variant="h6"
                fontSize={{ xs: '16px', md: '18px' }}
                textAlign="center"
              >
                {pokemonData.eggHatched ? 'Happiness' : 'Time Left to Hatch'}
              </Typography>
              <Typography
                variant="h6"
                fontSize={{ xs: '16px', md: '18px' }}
                textAlign="center"
              >
                {pokemonData.eggHatched
                  ? `${pokemonData.current_happiness} / ${pokemonData.target_happiness}`
                  : formatTime(timeLeft)} {/* Display time left in HH:MM:SS */}
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {!pokemonData && !isLoading && !error && <Typography>Select a Pokémon to view details</Typography>}
    </Box>
  );
}

SelectedPokemon.propTypes = {
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  pokemonID: PropTypes.string,
};
