import { useState } from 'react';
import axios from 'axios';
import useError from './useError';

const useGetEgg = () => {
  const [eggResponse, setResponse] = useState('');
  const { error, setError, clearError } = useError();

  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  const getEgg = async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      await axios.post(`${apiURL}/pokemon`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setResponse('Egg successfully received');
    } catch (err) {
      setError('Error: There was an error receiving the egg');
    }
  };

  return { eggResponse, error, clearError, getEgg };
};

export default useGetEgg;
