import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

function StoreButton({ itemData, handleButtonClick }) {
  const buttonText = itemData.isEgg || itemData.level === 0
    ? 'Buy'
    : itemData.level === 3
    ? 'Fully Upgraded'
    : `Upgrade to Level ${itemData.level + 1}`;

  const buttonColor = itemData.isEgg || itemData.level === 0
    ? 'primary'
    : itemData.level === 3
    ? 'grey'
    : '#4FC493'; // Button color for upgrade
  
  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        width: { xs: '200px', md: '300px' },
        height: { xs: '100px', md: '0px' },
      }}>
        {!itemData.isEgg && (
          <Box sx={{ }}>
            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: itemData.level === 1 ? 600 : 400 }}>Level 1</span> &rarr;
              <span style={{ fontWeight: itemData.level === 2 ? 600 : 400 }}>Level 2</span> &rarr;
              <span style={{ fontWeight: itemData.level === 3 ? 600 : 400 }}>Level 3</span>
            </Typography>
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        sx={{ 
          width: '90%', 
          maxWidth: '300px', 
          height: '15%', 
          backgroundColor: buttonColor, 
          fontSize: { xs: '14px', md: '16px' }, 
          color: itemData.level === 3 ? 'grey' : 'white' // Set text color if needed
        }}
        onClick={handleButtonClick}
        disabled={itemData.level === 3 && !itemData.isEgg}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

StoreButton.propTypes = {
  itemData: PropTypes.shape({
    level: PropTypes.number,
    isEgg: PropTypes.bool,
  }).isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default StoreButton;
