import { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';
import PurchasePopup from './PurchasePopup';
import StoreButton from './StoreButton';

export default function PurchaseItem({ itemData }) {
  const jwt = localStorage.getItem('jwt');

  const [error, setError] = useState(null);
  const { isLoading } = useLoading();

  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  // Use usePopup hook for managing popup state and actions
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  const handleButtonClick = async () => {
    try {
      // Determine action based on item level
      const isUpgrading = itemData.level > 0;
      const action = isUpgrading ? 'upgrading' : 'buying';

      // Send request based on action
      const response = await axios.patch(`${apiURL}/store/buy/${itemData._id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Set popup data based on action
      if (itemData.isEgg) {
        openPopup({
          title: 'Purchase Successful',
          message: `Purchase successful, take good care of that egg!`,
          type: 'success',
        });
      } else if (isUpgrading) {
        openPopup({
          title: 'Upgrade Successful',
          message: `Upgrade successful! ${itemData.itemName} has been upgraded to level ${itemData.level + 1}.`,
          type: 'success',
        });
      } else {
        openPopup({
          title: 'Purchase Successful',
          message: `You have successfully purchased the ${itemData.itemName}.`,
          type: 'success',
        });
      }
      
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
