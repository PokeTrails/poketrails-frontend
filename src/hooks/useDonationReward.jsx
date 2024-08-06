import { useState, useEffect } from 'react';
import axios from 'axios';
import useLoading from '../hooks/useLoading'; // Import your custom useLoading hook

function useDonationReward(pokemonID, jwt, apiURL) {
  const [reward, setReward] = useState(null);
  const { isLoading, setIsLoading } = useLoading();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonID || !jwt) return;

    const fetchReward = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await axios.get(`${apiURL}/pokemon/donate/reward/${pokemonID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setReward(response.data.expected_reward);
      } catch (err) {
        console.error('Error fetching donation reward:', err);
        setError('Failed to fetch donation reward.');
      } finally {
        setIsLoading(false); // Set loading state to false after request
      }
    };

    fetchReward();
  }, [pokemonID, jwt, apiURL, setIsLoading]); // Include setIsLoading in the dependency array

  return { reward, isLoading, error };
}

export default useDonationReward;
