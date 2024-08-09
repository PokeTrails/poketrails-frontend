import { useState } from 'react';
import { Box, Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';
import PurchasePopup from './PurchasePopup';
import StoreButton from './StoreButton';
import useGetBalance from '../hooks/useGetBalance';

export default function PurchaseItem({ itemData }) {
  const jwt = localStorage.getItem('jwt');
  const [error, setError] = useState(null);
  const [loadingDialogOpen, setLoadingDialogOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

  const { balance, vouchers } = useGetBalance();

  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  const handleButtonClick = async () => {
    setIsLoading(true);
    setLoadingDialogOpen(true);

    try {
      const response = await axios.patch(`${apiURL}/store/buy/${itemData._id}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (itemData.isEgg) {
        openPopup({
          title: 'Purchase Successful',
          message: `We've added an egg to your party, take good care of it!`,
          type: 'success',
        });
      } else if (itemData.level > 0) {
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
      const errorMessage = err.response?.data?.message || 'There was an issue completing your purchase. Please try again.';
      setError(errorMessage);
      openPopup({
        title: 'Purchase Failed',
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      setLoadingDialogOpen(false);
    }
  };

  const isButtonDisabled = itemData.isEgg
    ? vouchers < itemData.price
    : balance < itemData.price || itemData.level === 3;

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
      <StoreButton 
        itemData={itemData} 
        handleButtonClick={handleButtonClick} 
        disabled={isButtonDisabled}
      />

      {showPopup && <PurchasePopup data={popupData} onClose={closePopup} />}

      <Dialog open={loadingDialogOpen} onClose={() => setLoadingDialogOpen(false)}>
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
