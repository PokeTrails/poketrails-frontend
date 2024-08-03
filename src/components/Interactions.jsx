import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function Interactions({ apiURL, jwt, pokemonID }) {
  const [isEgg, setIsEgg] = useState(true); // Start with true to disable buttons by default
  const [error, setError] = useState(null);

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
        setError(null);
      } catch (err) {
        console.error(`Error fetching details for Pokémon ID ${pokemonID}:`, err);
        setError('Failed to fetch Pokémon data.');
        setIsEgg(true); // Assume it's an egg if there's an error
      } 
    };

    fetchPokemonData();
  }, [apiURL, jwt, pokemonID]);

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
        {error && <Typography color="error">{error}</Typography>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
          disabled={isEgg} // Disable if isEgg is true
        >
          Talk
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
          disabled={isEgg} // Disable if isEgg is true
        >
          Play
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
          disabled={isEgg} // Disable if isEgg is true
        >
          Feed
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
          disabled={true}
        >
          Evolve?
        </Button>
      </Box>
    </Box>
  );
}

Interactions.propTypes = {
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  pokemonID: PropTypes.string.isRequired,
};
