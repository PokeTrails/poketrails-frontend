import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';

import eggSprite from '../assets/pokemon_egg_animated.gif';

const UserParty = ({ componentBackgroundColour, componentHeadingColour, tileColour, onPokemonSelect }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchPartyData = async () => {
      try {
        const response = await axios.get(`${apiURL}/party`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const fetchedData = response.data.slots;

        const updatedData = await Promise.all(
          fetchedData.map(async (pokemonID) => {
            if (pokemonID) {
              try {
                const pokemonResponse = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                });

                if (pokemonResponse.data.eggHatched === false) {
                  return {
                    id: pokemonID,
                    sprite: eggSprite,
                  };
                } else {
                  return {
                    id: pokemonResponse.data._id,
                    sprite: pokemonResponse.data.sprite
                  };
                }
              } catch (pokemonError) {
                console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, pokemonError);
                return null; // Keep slot as null if error occurs
              }
            }
            return null; // Slot is empty
          })
        );

        setPokemonData(updatedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setError("Failed to fetch Pokémon data.");
        setIsLoading(false);
      }
    };

    fetchPartyData();
  }, [apiURL, jwt]);

  const handlePokemonSelect = (event) => {
    const selected = event.target.value;
    setSelectedPokemon(selected);
    onPokemonSelect(selected);
  };

  const totalSlots = 6;
  const slots = Array.from({ length: totalSlots }, (_, index) => pokemonData[index] || { id: `empty-${index}` });

  if (isLoading) {
    return <CircularProgress sx={{ mt: 2 }}/>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        pb: 3,
        backgroundColor: componentBackgroundColour || 'rgba(164, 218, 195, 0.5)',
        width: { xs: '100%', md: '90%' },
        maxWidth: '1200px',
        mx: 'auto',
        borderRadius: 2
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
          Party
        </Typography>
      </Box>
      <RadioGroup
        value={selectedPokemon}
        onChange={handlePokemonSelect}
        sx={{
          pt: 2,
          pl: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {slots.map((pokemon, index) => (
            <Grid
              item
              key={index}
              xs={4}
              md={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value={pokemon.id}
                control={<Radio sx={{ display: 'none' }} />}
                disabled={pokemon.id.startsWith('empty')}
                label={
                  <Box
                    sx={{
                      border: 1,
                      borderColor: selectedPokemon === pokemon.id ? 'black' : 'transparent',
                      borderRadius: 2,
                      backgroundColor: pokemon.id.startsWith('empty') ? 'lightgrey' : selectedPokemon === pokemon.id ? '#85F2C4' : tileColour,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: '80px', sm: '100px', md: '120px' },
                      height: { xs: '80px', sm: '100px', md: '120px' },
                      margin: '8px',
                    }}
                  >
                    {!pokemon.id.startsWith('empty') && (
                      <img
                        src={pokemon.sprite}
                        alt={pokemon.id.startsWith('empty') ? 'empty slot' : 'pokemon'}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                      />
                    )}
                  </Box>
                }
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
};

UserParty.propTypes = {
  componentBackgroundColour: PropTypes.string,
  componentHeadingColour: PropTypes.string,
  tileColour: PropTypes.string,
  apiURL: PropTypes.string,
  jwt: PropTypes.string,
  onPokemonSelect: PropTypes.func.isRequired,
};

export default UserParty;
