import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import sprite from '../assets/pikachu.gif'; // Temporary sprite

import { capitaliseName } from '../utils';

const DonatePopup = ({ nickname, popupData, onClose, onReload }) => {
  const [isDonating, setIsDonating] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const spriteRef = useRef(null);

  useEffect(() => {
    // Start the animation and change messages
    const timer = setTimeout(() => {
      setIsDonating(false);
      setShowConfirmation(true);
    }, 3000); // Animation duration of 3 seconds

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const handleClose = () => {
    onClose();
    if (onReload) onReload();
  };

  nickname = capitaliseName(nickname);

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
      {isDonating ? (
        <>
          <Typography variant="h6" gutterBottom>
            Bye Bye {nickname}!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              position: 'relative',
            }}
          >
            <img
              ref={spriteRef}
              src={sprite} // Use temporary sprite
              alt={nickname}
              style={{
                maxWidth: '100%',
                position: 'absolute',
                animation: 'fadeOutAndShrink 3s forwards',
              }}
            />
          </Box>
        </>
      ) : (
        showConfirmation && (
        <>
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                {nickname} has been sent to Professor Oak!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                You gained:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 600 }}>
                ₽{popupData.reward_received} 
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontWeight: 600 }}>
                +{popupData.userExperienceIncreased} Player EXP
            </Typography>
        </>
        )
      )}
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
      <style>
        {`
          @keyframes fadeOutAndShrink {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.5);
            }
          }
        `}
      </style>
    </Box>
  );
};

DonatePopup.propTypes = {
  nickname: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func,
  popupData: PropTypes.object.isRequired,
};

export default DonatePopup;
