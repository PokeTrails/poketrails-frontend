import { useState } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

export default function DonatePokemon({ pokemonName }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
          fontSize: { xs: '13px', sm: '14px', md: '16px' }, 
          fontWeight: 500
        }}
      >
        You will receive (BALANCE HERE)
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
          disabled={!isChecked} // Button disabled until checkbox is checked
        >
          Send {pokemonName}?
        </Button>
      )}
    </Box>
  );
}

DonatePokemon.propTypes = {
  pokemonName: PropTypes.string,
};
