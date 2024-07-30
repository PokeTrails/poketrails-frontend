import { useState } from 'react';

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
}

export default useLoading;
