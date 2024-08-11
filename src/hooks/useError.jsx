import { useState } from 'react';

// Custom hook to manage error state
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
