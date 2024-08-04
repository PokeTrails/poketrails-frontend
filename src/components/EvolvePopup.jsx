import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const EvolvePopup = ({ data, onClose, onReload }) => {
  const [showNewSprite, setShowNewSprite] = useState(false);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setShowNewSprite(true);
      }, 1000); // Delay before showing the new sprite

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
        `{data.nickname}` is evolving!
      </Typography>
      {data && (
        <Box>
          <Box
            sx={{
              position: 'relative',
              height: '200px', // Adjust based on your sprite size
              width: 'auto',
              overflow: 'hidden',
              margin: 'auto',
            }}
          >
            <img
              src={data.oldSprite}
              alt="Old Sprite"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'opacity 1s',
                opacity: showNewSprite ? 0 : 1,
              }}
            />
            <img
              src={data.sprite}
              alt="New Sprite"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'opacity 1s',
                opacity: showNewSprite ? 1 : 0,
              }}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            {data.species}
          </Typography>
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
};

EvolvePopup.propTypes = {
  data: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    oldSprite: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onReload: PropTypes.func,
};

export default EvolvePopup;
