import { useEffect, useState } from 'react';
import axios from 'axios';

const useCheckTrailTime = (pokemonID) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const jwt = localStorage.getItem('jwt'); // Get JWT from local storage

  useEffect(() => {
    if (pokemonID) {
      const fetchTimeLeft = async () => {
        try {
          const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/pokemon/${pokemonID}`;
          const response = await axios.get(apiURL, {
            headers: {
              Authorization: `Bearer ${jwt}` // Include JWT in headers
            }
          });
          setTimeLeft(response.data.timeLeft); // Adjust based on API response structure
          setLoading(false);
        } catch (error) {
          console.error('Error fetching trail time:', error);
        }
      };

      fetchTimeLeft();

      const interval = setInterval(() => {
        fetchTimeLeft();
      }, 10000); // Adjust interval as needed

      return () => clearInterval(interval);
    }
  }, [pokemonID, jwt]); // Add jwt to dependency array

  return { timeLeft, loading };
};

export default useCheckTrailTime;
