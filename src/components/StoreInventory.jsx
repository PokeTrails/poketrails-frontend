import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';

import itemImage from '../assets/store_images/happiness_share.png'; // Placeholder image for items

const StoreInventory = ({ componentBackgroundColour, componentHeadingColour, tileColour, apiURL, jwt, onItemSelect }) => {
  const [itemsData, setItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`${apiURL}/store`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const fetchedData = response.data;

        const updatedData = await Promise.all(
          fetchedData.map(async (item) => {
            if (item) {
              try {
                const itemResponse = await axios.get(`${apiURL}/store/view/${item._id}`, {
                  headers: {
                    Authorization: `Bearer ${jwt}`,
                  },
                });

                return {
                  id: item._id,
                  itemName: itemResponse.data.itemName,
                  price: itemResponse.data.price,
                  owned: itemResponse.data.owned,
                  isFullyUpgraded: itemResponse.data.isFullyUpgraded,
                  sprite: itemResponse.data.sprite || itemImage, // Placeholder or actual image
                };
              } catch (itemError) {
                console.error(`Error fetching details for item ID ${item._id}:`, itemError);
                return null; // Skip item if error occurs
              }
            }
            return null; // Slot is empty
          })
        );

        // Ensure there are exactly 6 items
        const slots = [...updatedData];
        while (slots.length < 6) {
          slots.push(null);
        }

        setItemsData(slots);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching item data:", err);
        setError("Failed to fetch item data.");
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [apiURL, jwt]);

  const handleItemSelect = (event) => {
    const selected = event.target.value;
    setSelectedItem(selected);
    onItemSelect(selected);
  };

  if (isLoading) {
    return <CircularProgress sx={{ mt: 2 }} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        mt: 2,
        pb: 3,
        backgroundColor: componentBackgroundColour || 'rgba(164, 218, 195, 0.5)',
        width: { xs: '100%', md: '90%' },
        maxWidth: '1200px',
        mx: 'auto',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: componentHeadingColour || 'rgba(122, 220, 185, 0.6)',
          pt: 1,
          pb: 0.5,
          mb: 1,
        }}
      >
        <Typography variant="h4" fontSize={{ xs: '20px', md: '25px' }} gutterBottom textAlign="center">
          Store Inventory
        </Typography>
      </Box>
      <RadioGroup
        value={selectedItem}
        onChange={handleItemSelect}
        sx={{
          pt: 2,
          pl: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {itemsData.map((item, index) => (
            <Grid
              item
              key={index}
              xs={4}
              md={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value={item?.id || `empty-${index}`}
                control={<Radio sx={{ display: 'none' }} />}
                disabled={!item || item.owned}
                label={
                  <Box
                    sx={{
                      border: 1,
                      borderColor: selectedItem === (item?.id || `empty-${index}`) ? 'black' : 'transparent',
                      borderRadius: 2,
                      backgroundColor: !item ? 'lightgrey' : selectedItem === item?.id ? '#85F2C4' : tileColour,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: '80px', sm: '100px', md: '120px' },
                      height: { xs: '80px', sm: '100px', md: '120px' },
                      margin: '8px',
                    }}
                  >
                    {item ? (
                      <img
                        src={item.sprite}
                        alt={item.itemName}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                      />
                    ) : (
                      <Typography variant="caption"></Typography>
                    )}
                  </Box>
                }
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
};

StoreInventory.propTypes = {
  componentBackgroundColour: PropTypes.string,
  componentHeadingColour: PropTypes.string,
  tileColour: PropTypes.string,
  apiURL: PropTypes.string.isRequired,
  jwt: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default StoreInventory;
