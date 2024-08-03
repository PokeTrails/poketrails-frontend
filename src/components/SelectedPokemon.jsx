import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function SelectedPokemon({ jwt, apiURL, pokemonID }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Start with false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemonID) return; // Skip fetching if no pokemonID is provided

      setIsLoading(true); // Start loading when a new ID is set

      try {
        const response = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setPokemonData(response.data);
        setError(null); // Clear previous errors
      } catch (err) {
        console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, err);
        setError('Failed to fetch Pokémon data.');
        setPokemonData(null); // Clear previous data
      } finally {
        setIsLoading(false); // Stop loading when done
      }
    };

    fetchPokemonData();
  }, [pokemonID, apiURL, jwt]);

  // Capitalize the Pokémon name
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
      {isLoading && <Typography>Loading...</Typography>}

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
                src={pokemonData.sprite}
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
                Happiness
              </Typography>
              <Typography
                variant="h6"
                fontSize={{ xs: '16px', md: '18px' }}
                textAlign="center"
              >
                {pokemonData.current_happiness} / {pokemonData.target_happiness}
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
