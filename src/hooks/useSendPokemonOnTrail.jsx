import { useState } from 'react';
import axios from 'axios';
import useError from './useError';
import useLoading from './useLoading';

const useSendPokemonOnTrail = () => {
  const [error, setError] = useState(null);
  const { setError: setGlobalError, clearError } = useError();
  const { setIsLoading } = useLoading();

  const sendPokemonOnTrail = async (pokemonID, trail) => {
    clearError();
    setIsLoading(true);

    try {
      const jwt = localStorage.getItem('jwt');
      const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/trail/simulate`;

      const response = await axios.post(apiURL, {
        title: `${trail} Trail`,
        pokemonId: pokemonID,
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data; // Return the API response data
      
    } catch (err) {
      console.error('Error sending Pokémon on trail:', err);
      setGlobalError('Failed to send Pokémon on trail.');
      setError(err.message);
      return { error: err.message }; // Return error message in case of failure
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPokemonOnTrail, error };
};

export default useSendPokemonOnTrail;
