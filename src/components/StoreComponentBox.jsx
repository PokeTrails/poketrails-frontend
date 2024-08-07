import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import StoreInventory from './StoreInventory';
import ProfessorStoreHeading from './ProfessorStoreHeading';
import SelectedItem from './SelectedItem';
import PurchaseItem from './PurchaseItem';
import ItemDescription from './ItemDescription';

import useGetItemDetails from '../hooks/useGetItemDetails';

export default function StoreComponentBox({ componentDetails, headingColour }) {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const [selectedItem, setSelectedItem] = useState(null);
  const { itemData, error, isLoading } = useGetItemDetails(selectedItem);

  const handleItemSelect = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <>
      <Box
        sx={{
          mt: { xs: 0, md: 2 },
          backgroundColor: componentDetails.componentBackgroundColour,
          width: { xs: '100vw', md: '1200px', lg: '2000px' },
          maxWidth: { xs: '100%', md: '90vw' },
          borderRadius: 2,
          minHeight: '40vh',
        }}
      >
        {/* Heading for Component */}
        <ProfessorStoreHeading 
          componentHeadingColour={componentDetails.componentHeadingColour}
          headingColour={headingColour}
          heading={componentDetails.heading}
        />

        <Box
          sx={{
            display: { xs: 'flex', md: 'flex' },
            flexDirection: 'row',
            width: '100%',
            mb: 2,
            mt: 4,
          }}
        >
          {/* Selected Item Display */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: {xs: 6},
            }}
          >
            <SelectedItem 
              itemData={itemData}
              tileColour={componentDetails.tileColour} 
              componentBackgroundColour={componentDetails.componentBackgroundColour} 
            />
          </Box>

          {/* Item Name and Description */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'block' },
              justifyContent: 'center',
              alignItems: 'center',
              flex: { xs: '1 1 100%' },
              pr: {xs: 2},
            }}
          >
            {itemData && (
              <ItemDescription 
                itemData={itemData} 
                tileColour={componentDetails.tileColour} 
                componentBackgroundColour={componentDetails.componentBackgroundColour} 
              />
            )}
          </Box>
        </Box>

        {/* Purchase Item */}
        {itemData && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PurchaseItem
              itemData={itemData} 
              tileColour={componentDetails.tileColour} 
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              jwt={jwt}
            />
          </Box>
        )}
      </Box>

      {/* Store Inventory Component */}
      <StoreInventory
        componentBackgroundColour={componentDetails.componentBackgroundColour}
        componentHeadingColour={componentDetails.componentHeadingColour}
        tileColour={componentDetails.tileColour}
        apiURL={apiURL}
        jwt={jwt}
        onItemSelect={handleItemSelect}
      />
    </>
  );
}

StoreComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  headingColour: PropTypes.string,
};
