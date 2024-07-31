import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const UserParty = ({ apiURL, jwt }) => {
  
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Pokémon data from the API
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        // Set the Pokémon data, stop loading, and clear any errors
        setPokemonData(response.data);
        setIsLoading(false);

      } catch (err) {
        // Log the error to the console and set an error message
        console.error("Error fetching Pokémon data:", err);
        setError("Failed to fetch Pokémon data.");
        setIsLoading(false);
      }
    };

    // Call the fetchPokemonData function
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
            <img src={pokemon.sprite} alt={pokemon.species} />
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
