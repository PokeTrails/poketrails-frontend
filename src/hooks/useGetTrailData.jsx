import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetTrailData(pokemonID) {
  const [pokemonTrailData, setPokemonTrailData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pokemonID) return; // Only fetch data if pokemonID is present

      try {
        const jwt = localStorage.getItem('jwt');
        const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

        const response = await axios.get(`${apiURL}/pokemon/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = response.data;

        if (!data.eggHatched) {
          setPokemonTrailData(null); // Set data to null if the Pokemon is still an egg
        } else {
          setPokemonTrailData({
            currentlyOnTrail: data.currentlyOnTrail,
            wildCompleted: data.wildCompleted,
            rockyCompleted: data.rockyCompleted,
            frostyCompleted: data.frostyCompleted,
            wetCompleted: data.wetCompleted,
            onTrailTitle: data.onTrailTitle,
          });
        }
      } catch (err) {
        console.error('Error fetching Pokémon trail data:', err);
      }
    };

    fetchData();
  }, [pokemonID]); // Only run the effect when pokemonID changes

  return pokemonTrailData;
}
