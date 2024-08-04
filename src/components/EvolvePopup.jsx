import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const EvolvePopup = ({ data, onClose, onReload }) => {
  const [isEvolving, setIsEvolving] = useState(true);
  const [evolutionMessage, setEvolutionMessage] = useState('');
  const animationRef = useRef(null);

  useEffect(() => {
    if (data) {
      // Set initial message
      setEvolutionMessage(`${data.oldNickName} is evolving!`);
      
      // Handle evolution animation
      const animationDuration = 5000; // 5 seconds
      const pauseDuration = 1000; // 1 second

      const timer = setTimeout(() => {
        setIsEvolving(false);
        setEvolutionMessage(`${data.oldNickName} has evolved into ${data.species}!`);
      }, animationDuration + pauseDuration);

      // Clean up timer on unmount
      return () => clearTimeout(timer);
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
      {data && isEvolving && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px', // Adjust as needed
          }}
        >
          <img
            ref={animationRef}
            src={data.oldSprite}
            alt={data.species}
            style={{
              maxWidth: '100%',
              animation: `evolveAnimation 5s linear`,
            }}
          />
        </Box>
      )}
      {data && !isEvolving && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <img
            src={data.sprite}
            alt={data.species}
            style={{ maxWidth: '100%' }}
          />
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
      <style>
        {`
          @keyframes evolveAnimation {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
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
