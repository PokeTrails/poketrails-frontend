import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import useLoading from '../hooks/useLoading';

export default function ItemDescription({ itemData }) {
  const [error, setError] = useState(null);
  const { isLoading } = useLoading();


  // Determine display level, if 'Max' show 'Max' directly
  const displayLevel = itemData?.level === 'Max' ? 'Max' : itemData?.level + 1;
  console.log(itemData.description)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '50%',
        maxWidth: '50vw',
        ml: { md: 4 },
        justifyContent: 'center', // Center content vertically
      }}
    >
      {itemData ? (
        <>
          {/* Item Name with Conditional Level */}
          <Typography
            variant="h5"
            sx={{ color: 'black', textAlign: 'left' }}
            fontWeight={600}
            fontSize={{ xs: '18px', md: '22px' }}
          >
            {itemData.isEgg 
              ? itemData.itemName 
              : `${itemData.itemName} Lvl ${displayLevel}`}
          </Typography>

          {/* Item Description */}
          <Typography
            variant="h6"
            fontSize={{ xs: '14px', md: '18px' }}
            sx={{ color: 'black', textAlign: 'left', mt: 1 }}
            whiteSpace="pre-line"
          >
            {itemData.description}
          </Typography>

          {/* Conditionally Render Upgrade Status */}
          {!itemData.isEgg && (
            <>
              <Typography
                variant="h6"
                fontWeight={600}
                fontSize={{ xs: '16px', md: '20px' }}
                sx={{ color: 'black', textAlign: 'left', mt: 2 }}
              >
                Upgradable?
              </Typography>
              <Typography
                variant="h6"
                fontWeight={500}
                fontSize={{ xs: '14px', md: '18px' }}
                sx={{ color: 'black', textAlign: 'left' }}
              >
                {itemData.isFullyUpgraded ? 'No' : 'Yes'}
              </Typography>
            </>
          )}
        </>
      ) : (
        <Typography variant="h6" sx={{ color: 'gray', textAlign: 'left' }}>
          No item selected
        </Typography>
      )}
    </Box>
  );
}

ItemDescription.propTypes = {
  itemData: PropTypes.shape({
    itemName: PropTypes.string,
    sprite: PropTypes.string,
    eggHatched: PropTypes.bool,
    level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Allow both number and string for level
    description: PropTypes.string,
    isEgg: PropTypes.bool,
    isFullyUpgraded: PropTypes.bool,
  }),
};
