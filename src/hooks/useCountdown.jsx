import { useState, useEffect } from 'react';

const useCountdown = (initialTime, isActive) => {
  const [countdown, setCountdown] = useState(initialTime);

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
