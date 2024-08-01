import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const UserParty = ({ apiURL, jwt }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        setPokemonData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setError("Failed to fetch Pokémon data.");
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [apiURL, jwt]);

  const handlePokemonSelect = (event) => {
    setSelectedPokemon(event.target.value);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Party
      </Typography>
      <RadioGroup
        value={selectedPokemon}
        onChange={handlePokemonSelect}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {pokemonData.map((pokemon) => (
            <Grid
              item
              key={pokemon.species}
              xs={4}
              md={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value={pokemon.species}
                control={<Radio sx={{ display: 'none' }} />}
                label={
                  <Box
                    sx={{
                      border: 1,
                      borderColor: selectedPokemon === pokemon.species ? 'black' : 'transparent',
                      borderRadius: 2,
                      backgroundColor: selectedPokemon === pokemon.species ? '#85F2C4' : '#A4DAC3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: { xs: '100px', md: '150px' },
                      width: { xs: '100px', md: '150px' },
                    }}
                  >
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.species}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transform: 'scale(1.5)',
                      }}
                    />
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
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
};

export default UserParty;
