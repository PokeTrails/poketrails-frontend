import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

import { capitaliseName } from '../utils';

const EvolvePopup = ({ data, onClose, onReload }) => {
  const [isEvolving, setIsEvolving] = useState(true);
  const [evolutionMessage, setEvolutionMessage] = useState('');
  const [showFinalSprite, setShowFinalSprite] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (data) {
      // Set initial message
      setEvolutionMessage(`${capitaliseName(data.oldNickName)} is evolving!`);

      // Handle evolution animation: fade in and out for 5 seconds, getting faster
      const speedIncreaseDuration = 5000;
      const startTime = Date.now();

      const speedInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const animationDuration = Math.max(1, 5 - (elapsedTime / 1000)); // Decrease duration to make it faster
        animationRef.current.style.animationDuration = `${animationDuration}s`;

        if (elapsedTime >= speedIncreaseDuration) {
          clearInterval(speedInterval);
          setIsEvolving(false);
          setShowFinalSprite(true);
          setEvolutionMessage(`${capitaliseName(data.oldNickName)} has evolved into ${capitaliseName(data.species)}!`);
        }
      }, 100);

      return () => clearInterval(speedInterval); // Cleanup on component unmount
    }
  }, [data]);

  const handleClose = () => {
    onClose();
    if (onReload) onReload();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80vw', sm: '50vw', md: '30vw' },
        maxWidth: '500px',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        zIndex: 1200,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {evolutionMessage}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px', // Adjust as needed
          position: 'relative',
        }}
      >
        {data && isEvolving && (
          <img
            ref={animationRef}
            src={data.oldSprite}
            alt={data.oldNickName}
            style={{
              maxWidth: '100%',
              position: 'absolute',
              animation: 'fadeInOut 2s infinite',
            }}
          />
        )}
        {data && showFinalSprite && (
          <img
            src={data.sprite}
            alt={data.species}
            style={{ maxWidth: '100%', position: 'absolute' }}
          />
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

EvolvePopup.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func,
};

export default EvolvePopup;
