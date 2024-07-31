import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const UserParty = ({ apiURL, jwt }) => {
  
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Your Pokémon Party</Typography>
      <ul>
        {pokemonData.map((pokemon) => (
          <li key={pokemon.id}>
            <Typography variant="body1">{pokemon.species}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

UserParty.propTypes = {
    apiURL: PropTypes.string.isRequired,
    jwt: PropTypes.string.isRequired,
};

export default UserParty;
