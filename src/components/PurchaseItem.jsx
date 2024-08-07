import { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import useLoading from '../hooks/useLoading';
import usePopup from '../hooks/usePopup';
import PurchasePopup from './PurchasePopup';
import StoreButton from './StoreButton';

export default function PurchaseItem({ itemData }) {
  const [error, setError] = useState(null);
  const { isLoading } = useLoading();

  // Use usePopup hook for managing popup state and actions
  const { showPopup, popupData, openPopup, closePopup } = usePopup();

  const handleButtonClick = () => {
    if (itemData.isEgg) {
      // Handle the "Buy" button logic
    } else if (itemData.level === 3) {
      // Handle the "Fully Upgraded" case
    } else {
      // Handle the "Upgrade" button logic
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
    itemName: PropTypes.string,
    sprite: PropTypes.string,
    eggHatched: PropTypes.bool,
    level: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEgg: PropTypes.bool,
  }).isRequired,
};
