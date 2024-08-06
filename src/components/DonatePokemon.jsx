import { useState, useEffect } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import usePopup from '../hooks/usePopup'; // Custom hook for managing popup state
import DonatePopup from '../components/DonatePopup'; // Component for displaying donation result
import usePokemonCount from '../hooks/usePokemonCount'; // Custom hook for fetching Pokémon count
import useLoading from '../hooks/useLoading'; // Custom hook for managing loading state
import useDonationReward from '../hooks/useDonationReward'; // Custom hook for fetching donation reward
import useError from '../hooks/useError'; // Import the custom hook for error handling

// Component for handling Pokémon donation
export default function DonatePokemon({ pokemonName, pokemonID, jwt, apiURL }) {
  // State to manage checkbox status
  const [isChecked, setIsChecked] = useState(false);
  // State to manage sending status
  const [isSending, setIsSending] = useState(false);

  // Error state management from custom hook
  const { error, setError, clearError } = useError();
  // Popup state management from custom hook
  const { openPopup, closePopup, showPopup, popupData } = usePopup();
  // Loading state management from custom hook
  const { isLoading, setIsLoading } = useLoading();
  // Fetch Pokémon count using custom hook
  const { pokemonCount, loading: countLoading, error: countError } = usePokemonCount(jwt, apiURL);
  // Fetch donation reward using custom hook
  const { reward, isLoading: rewardLoading, error: rewardError } = useDonationReward(pokemonID, jwt, apiURL);

  // Effect to set loading state based on Pokémon count and reward fetching
  useEffect(() => {
    if (countLoading || rewardLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [countLoading, rewardLoading, setIsLoading]);

  // Effect to handle errors from Pokémon count and reward fetching
  useEffect(() => {
    if (countError) setError('Failed to fetch Pokémon count.');
    if (rewardError) setError('Failed to fetch donation reward.');
  }, [countError, rewardError, setError]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSendPokemon = async () => {
    if (!pokemonID || !jwt) return;

    setIsSending(true);
    clearError(); // Clear any previous errors

    try {
      // Send donation request to the server
      const response = await axios.patch(`${apiURL}/pokemon/donate/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // Show popup with response data
      openPopup(response.data);
    } catch (err) {
      console.error('Error sending Pokémon:', err);
      setError('Failed to send Pokémon.');
    } finally {
      setIsSending(false);
    }
  };

  // Display error messages
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: { xs: '100%', md: '30vh' },
        textAlign: 'center',
        padding: 2,
      }}
    >
      {/* Prompt for donation */}
      <Typography
        variant="body1"
        gutterBottom
        sx={{ 
          fontSize: { xs: '13px', sm: '14px', md: '16px' }, 
          fontWeight: 600
        }}
      >
        Would you like to send this Pokémon to Professor Oak?
      </Typography>
      
      {/* Show the amount user will receive from donation */}
      <Typography
        variant="body1"
        gutterBottom
        sx={{ 
          fontSize: { xs: '13px', sm: '14px', md: '20px' }, 
          fontWeight: 600
        }}
      >
        {rewardLoading ? (
          <>Calculating Pokémon Value <Typography component="span" sx={{ fontSize: { xs: '13px', sm: '16px', md: '22px' }, fontWeight: 600 }}>...</Typography></>
        ) : (
          <>You will receive{' '}
            <Typography
              component="span"
              sx={{
                fontSize: { xs: '13px', sm: '16px', md: '22px' },
                fontWeight: 600,
              }}
            >
              ₽
            </Typography>
            {reward || 100}
          </>
        )}
      </Typography>

      {/* Checkbox to confirm donation */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
            disabled={isLoading || pokemonCount <= 1} // Disable checkbox if loading or only 1 Pokémon left
          />
        }
        label={isLoading
          ? "Loading..."
          : pokemonCount <= 1
          ? "You can't donate your last Pokémon"
          : "I confirm that I want to send this Pokémon"}
        sx={{ 
          mt: 1, 
          mb: 2,
          '& .MuiFormControlLabel-label': { // Custom CSS for the label text
            fontSize: { xs: '13px', sm: '13px', md: '15px' },
          },
        }}
      />

      {/* Button to send Pokémon */}
      {pokemonName && (
        <Button
          variant="contained"
          size="medium"
          sx={{ 
            width: { xs: '100%', md: '80%', lg: '70%' }, 
            height: { xs: '40px', md: '50px' }, 
            fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '18px' } 
          }}
          disabled={!isChecked || isSending || isLoading || pokemonCount <= 1} // Disable button if not checked, sending, loading, or only 1 Pokémon left
          onClick={handleSendPokemon}
        >
          {isSending ? "Sending..." : `Send ${pokemonName}?`} {/* Show sending text or button text */}
        </Button>
      )}

      {/* Show donation result popup if applicable */}
      {showPopup && (
        <DonatePopup
          popupData={popupData}
          onClose={closePopup}
          nickname={pokemonName}
        />
      )}
    </Box>
  );
}

// Define prop types for the component
DonatePokemon.propTypes = {
  pokemonName: PropTypes.string, // Name of the Pokémon to be donated
  pokemonID: PropTypes.string, // ID of the Pokémon to be donated
  jwt: PropTypes.string.isRequired, // JWT token for authentication
  apiURL: PropTypes.string.isRequired, // Base URL for API requests
};
