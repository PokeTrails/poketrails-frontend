import { useState } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import usePopup from '../hooks/usePopup';
import DonatePopup from '../components/DonatePopup';

export default function DonatePokemon({ pokemonName, pokemonID, jwt, apiURL }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { openPopup, closePopup, showPopup, popupData } = usePopup();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSendPokemon = async () => {
    if (!pokemonID || !jwt) return;

    setIsSending(true);
    setError(null);

    try {
      const response = await axios.patch(`${apiURL}/pokemon/donate/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      openPopup(response.data);
    } catch (err) {
      console.error('Error sending Pokémon:', err);
      setError('Failed to send Pokémon.');
    } finally {
      setIsSending(false);
    }
  };

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

      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="I confirm that I want to send this Pokémon"
        sx={{ 
          mt: 1, 
          mb: 2,
          '& .MuiFormControlLabel-label': { // Custom CSS for the label text
            fontSize: { xs: '13px', sm: '13px', md: '15px' },
          },
        }}
      />

      {pokemonName && (
        <Button
          variant="contained"
          size="medium"
          sx={{ 
            width: { xs: '100%', md: '80%', lg: '70%' }, 
            height: { xs: '40px', md: '50px' }, 
            fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '18px' } 
          }}
          disabled={!isChecked || isSending} // Disable button if checkbox is not checked or sending is in progress
          onClick={handleSendPokemon} // Call the function when clicked
        >
          {isSending ? <CircularProgress size={24} /> : `Send ${pokemonName}?`}
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

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
