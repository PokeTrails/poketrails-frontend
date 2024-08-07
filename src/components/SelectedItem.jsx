import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import voucherIcon from '../assets/store_images/voucher.png';
import useLoading from '../hooks/useLoading';
import eggSprite from '../assets/pokemon_egg_animated.gif';
import itemSprite from '../assets/store_images/happiness_share.png';

export default function SelectedItem({
  componentBackgroundColour,
  tileColour,
  jwt,
  apiURL,
  itemData
}) {
  const [error, setError] = useState(null);
  const { isLoading } = useLoading();  

  // Determine the price display based on whether the item is an egg
  const priceText = itemData.isEgg
    ? `${itemData.price} `  // Just the price text for eggs
    : `₽${itemData.price}`;  // Price with ruble symbol for other items

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',  // Adjust to column for better mobile display
        alignItems: 'center', // Centers content horizontally
        justifyContent: 'center',
        height: 'auto',
        width: {xs: '50%', md: '100%'},
      }}
    >
      {/* Item Sprite with Square Background */}
      <Box
        sx={{
          backgroundColor: 'rgba(188, 196, 244, 0.8)',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          justifyContent: 'center',
          marginBottom: 2,
          width: {xs: '120px', md: '300px'},
          height: {xs: '120px', md: '300px'},
        }}
      >
        <Box
          component="img"
          src={itemSprite || eggSprite}
          alt='Item Sprite'
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Item Price Details */}
      <Typography fontWeight='600' fontSize={{ xs: '18px', md: '20px' }} variant="h6">
        Price:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
        {itemData.isEgg && (
          <Box
            component="img"
            src={voucherIcon}
            alt='Voucher Icon'
            sx={{
              width: 40,
              rotate: '30deg',
              height: 'auto',
              mr: 1
            }}
          />  
        )}
        <Typography fontWeight='500' fontSize={{ xs: '18px', md: '20px' }} variant="h6" sx={{ mr: 1 }}>
          {priceText}
        </Typography>
      </Box>
    </Box>
  );
}

SelectedItem.propTypes = {
  componentBackgroundColour: PropTypes.string,
  tileColour: PropTypes.string,
  jwt: PropTypes.string.isRequired,
  apiURL: PropTypes.string.isRequired,
  itemData: PropTypes.shape({
    price: PropTypes.number.isRequired,
    isEgg: PropTypes.bool.isRequired,
  }).isRequired,
};
