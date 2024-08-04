import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePokemonData(apiURL, pokemonID, jwt) {
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

  return { pokemonData, isLoading, error, timeLeft, setPokemonData };
}
