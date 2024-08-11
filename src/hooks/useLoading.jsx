import { useState } from 'react';

// Custom hook to manage loading state
function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
}

export default useLoading;
