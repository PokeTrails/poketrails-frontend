import { useState, useEffect } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import usePopup from '../hooks/usePopup';
import DonatePopup from '../components/DonatePopup';
import usePokemonCount from '../hooks/usePokemonCount'; // Import the custom hook
import useLoading from '../hooks/useLoading'; // Import the useLoading hook

export default function DonatePokemon({ pokemonName, pokemonID, jwt, apiURL }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { openPopup, closePopup, showPopup, popupData } = usePopup();
  const { isLoading, setIsLoading } = useLoading(); // Initialize useLoading hook
  const { pokemonCount, loading: countLoading, error: countError } = usePokemonCount(jwt, apiURL);

  // Set loading state based on the countLoading state
  useEffect(() => {
    if (countLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [countLoading, setIsLoading]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSendPokemon = async () => {
    if (!pokemonID || !jwt) return;

    setIsSending(true);
    setError(null);

    try {
      // Send Pokémon donation request to the server
      const response = await axios.patch(`${apiURL}/pokemon/donate/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      // Sets donation popup to true and assigns response data
      openPopup(response.data);
    } catch (err) {
      console.error('Error sending Pokémon:', err);
      setError('Failed to send Pokémon.');
    } finally {
      setIsSending(false);
    }
  };

  // If loading, show loading message
  if (countError) return <Typography color="error">Failed to fetch Pokémon count.</Typography>;
  
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
      
      {/* Show amount user will receive from donation */}
      <Typography
        variant="body1"
        gutterBottom
        sx={{ 
          fontSize: { xs: '13px', sm: '14px', md: '20px' }, 
          fontWeight: 600
        }}
      >
        You will receive{' '}
        <Typography
          component="span"
          sx={{
            fontSize: { xs: '13px', sm: '16px', md: '22px' },
            fontWeight: 600,
          }}
        >
          ₽
        </Typography>
        100
      </Typography>


      {/* Confirmation Checkbox to enable donation button */}
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


      {/* Button to send Pokemon, requires pokemon name to be passed through */}
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
          {isSending ? <CircularProgress size={24} /> : `Send ${pokemonName}?`}
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}


      {/* If openPopup has set value to true, show donation popup component */}
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

DonatePokemon.propTypes = {
  pokemonName: PropTypes.string,
  pokemonID: PropTypes.string,
  jwt: PropTypes.string.isRequired,
  apiURL: PropTypes.string.isRequired,
};
