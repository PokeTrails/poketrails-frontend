import { useState, useEffect } from 'react';

// Custom hook to manage countdown state
const useCountdown = (initialTime, isActive) => {
  const [countdown, setCountdown] = useState(initialTime);

  // Update countdown every second
  useEffect(() => {
    let timer;

    if (isActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, countdown]);

  useEffect(() => {
    setCountdown(initialTime);
  }, [initialTime]);

  return countdown;
};

export default useCountdown;
