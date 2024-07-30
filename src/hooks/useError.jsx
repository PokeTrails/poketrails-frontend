import { useState } from 'react';

function useError() {
  const [error, setError] = useState('');

  const clearError = () => setError('');
  
  return {
    error,
    setError,
    clearError,
  };
}

export default useError;
