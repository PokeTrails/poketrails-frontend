import { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';
import PurchasePopup from './PurchasePopup';
import StoreButton from './StoreButton';

export default function PurchaseItem({ itemData, jwt }) {
  const [error, setError] = useState(null);
  const { isLoading } = useLoading();

  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  // Use usePopup hook for managing popup state and actions
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  const handleButtonClick = async () => {
    try {
      const response = await axios.patch(`${apiURL}/store/buy/${itemData._id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      
      // Set popup data based on server response
      openPopup({
        title: 'Purchase Successful',
        message: `You have successfully purchased ${itemData.itemName}.`,
        type: 'success',
      });
      
    } catch (err) {
      console.log('Error:', err);
      // Handle error
      setError('Failed to complete purchase');
      openPopup({
        title: 'Purchase Failed',
        message: 'There was an issue completing your purchase. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box',
        mb: 4
      }}
    >
      {/* Item level and purchase button */}
      <StoreButton itemData={itemData} handleButtonClick={handleButtonClick} />

      {/* Render the Purchase Popup component */}
      {showPopup && <PurchasePopup data={popupData} onClose={closePopup} />}
      
    </Box>
  );
}

PurchaseItem.propTypes = {
  itemData: PropTypes.shape({
    id: PropTypes.string, 
    itemName: PropTypes.string,
    sprite: PropTypes.string,
    eggHatched: PropTypes.bool,
    level: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEgg: PropTypes.bool,
  }).isRequired,
};
