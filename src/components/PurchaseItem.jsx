import { useState } from 'react';
import { Box, Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';
import PurchasePopup from './PurchasePopup';
import StoreButton from './StoreButton';

export default function PurchaseItem({ itemData }) {
  const jwt = localStorage.getItem('jwt');
  const [error, setError] = useState(null);
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoading(); // Ensure useLoading provides setIsLoading
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  // Use usePopup hook for managing popup state and actions
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  const handleButtonClick = async () => {
    setIsLoading(true); // Start loading
    setLoadingDialogOpen(true); // Open loading dialog

    try {
      // Determine action based on item level
      const isUpgrading = itemData.level > 0;

      // Send request based on action
      const response = await axios.patch(`${apiURL}/store/buy/${itemData._id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Open the appropriate popup based on response and item status
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
      console.error('Error:', err);
      // Extract message from error response if available
      const errorMessage = err.response?.data?.message || 'There was an issue completing your purchase. Please try again.';
      
      // Handle error
      setError(errorMessage);
      openPopup({
        title: 'Purchase Failed',
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false); // End loading
      setLoadingDialogOpen(false); // Close loading dialog
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
        mb: 4,
      }}
    >
      {/* Item level and purchase button */}
      <StoreButton itemData={itemData} handleButtonClick={handleButtonClick} />

      {/* Render the Purchase Popup component */}
      {showPopup && <PurchasePopup data={popupData} onClose={closePopup} />}

      {/* Loading dialog */}
      <Dialog open={loadingDialogOpen} onClose={() => setLoadingDialogOpen(false)} >
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 200, minHeight: 200 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>Processing purchase...</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

PurchaseItem.propTypes = {
  itemData: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    itemName: PropTypes.string.isRequired,
    sprite: PropTypes.string,
    eggHatched: PropTypes.bool,
    level: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isEgg: PropTypes.bool.isRequired,
  }).isRequired,
};
