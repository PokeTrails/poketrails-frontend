import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch the number of Pokémon in the user's party
const usePokemonCount = (jwt, apiURL) => {
  const [pokemonCount, setPokemonCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonCount = async () => {
      try {
        const response = await axios.get(`${apiURL}/party`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setPokemonCount(response.data.slots.length);
      } catch (err) {
        console.error('Error fetching Pokémon count:', err);
        setError('Failed to fetch Pokémon count.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonCount();
  }, [jwt, apiURL]);

  return { pokemonCount, loading, error };
};

export default usePokemonCount;
