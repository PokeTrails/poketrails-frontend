import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const SelectTrainerSprite = ({ selectedSprite, spriteId, staticSprite, animatedSprite }) => {
  const [currentSprite, setCurrentSprite] = useState(staticSprite);

  useEffect(() => {
    if (selectedSprite === spriteId) {
      setCurrentSprite(animatedSprite);

      const revertToStatic = setTimeout(() => {
        setCurrentSprite(staticSprite);
      }, 2500);

      return () => clearTimeout(revertToStatic);
    } else {
      setCurrentSprite(staticSprite);
    }
  }, [selectedSprite, spriteId, staticSprite, animatedSprite]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        // border: selectedSprite === spriteId ? '2px solid #FF7070' : 'none',
        // borderRadius: '6px',
        // padding: '10px',
        '& img': {
          transition: 'transform 0.3s ease, filter 0.3s ease',
          transform: selectedSprite === spriteId ? 'scale(1.1)' : 'scale(0.9)',
          filter: selectedSprite === spriteId ? 'none' : 'grayscale(100%)',
        },
      }}
    >
      <img
        src={currentSprite}
        alt={`${spriteId} Trainer Sprite`}
        style={{ width: 'auto', height: '150px' }}
      />
    </Box>
  );
};

SelectTrainerSprite.propTypes = {
  selectedSprite: PropTypes.string.isRequired,
  spriteId: PropTypes.string.isRequired,
  staticSprite: PropTypes.string.isRequired,
  animatedSprite: PropTypes.string.isRequired,
};

export default SelectTrainerSprite;
