import { useState, useEffect } from 'react';
import useError from './useError';


// Deprecated, check not needed as egg functionality completed from server-side

const useCheckFirstLogin = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const { setError, clearError } = useError();
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const checkFirstLogin = async () => {
      try {

        // Commented until backend is implemented
        // const response = await axios.get('/user', {
        //   headers: { Authorization: `Bearer ${jwt}` },
        // });
        // setIsFirstLogin(response.data.isFirstLogin);

        setIsFirstLogin(true);
      } catch (err) {
        setError('Error: Unable to fetch user data');
      }
    };

    checkFirstLogin();
  }, [jwt, setError]);

  return { isFirstLogin, error: useError().error, clearError };
};

export default useCheckFirstLogin;
