import { useState, useEffect } from 'react';
import axios from 'axios';

const jwt = localStorage.getItem('jwt');
const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

function useGetBalance() {
  const [balance, setBalance] = useState(null);
  const [vouchers, setVouchers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jwt) return;

    const getBalance = async () => {
      try {
        const response = await axios.get(`${apiURL}/user/balance`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setBalance(response.data.balance);
        setVouchers(response.data.vouchers);
      } catch (err) {
        console.error('Error:', err);
        setError('?');
      }
    };
    getBalance();
  });

  return { balance, vouchers, error };
}

export default useGetBalance;
