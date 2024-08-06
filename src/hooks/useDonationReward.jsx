import { useState, useEffect } from 'react';
import axios from 'axios';

function useDonationReward(pokemonID, jwt, apiURL) {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonID || !jwt) return;

    const fetchReward = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchReward();
  }, [pokemonID, jwt, apiURL]);

  return { reward, loading, error };
}

export default useDonationReward;
