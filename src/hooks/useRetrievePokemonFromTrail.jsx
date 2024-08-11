import { useState } from 'react';
import axios from 'axios';

// Custom hook to retrieve Pokémon from the trail
const useRetrievePokemonFromTrail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrievePokemonFromTrail = async (pokemonID) => {
    setLoading(true);
    setError(null);
    const jwt = localStorage.getItem('jwt');

    try {
      const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/trail/finish`; // Adjust endpoint as needed
      const response = await axios.post(apiURL, {
        pokemonId: pokemonID
      }, {
        headers: {
          Authorization: `Bearer ${jwt}` // Include JWT in headers
        }
      });
      setLoading(false);


      return response.data;
      
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error('Error retrieving Pokémon from trail:', err);
      return { error: err.message };
    }
  };

  return { retrievePokemonFromTrail, loading, error };
};

export default useRetrievePokemonFromTrail;
