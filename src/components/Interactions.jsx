// import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';

export default function Interactions() {

    // Create function to check if valid Pokemon to interact with (egg pokemon or on trail)

    // Create function to check if pokemon can evolve

    // Convert buttons into seperate components and pass through props/check conditions
  return (
    <Box sx={{ 
        mt: 2,
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: '50vw',
        }}>
  
        {/* Interact Title Heading Box */}
        <Box sx={{ 
          backgroundColor: '#7ADCB9',
          pt: 1,
          pb: 0.5,
          mb: 1,
            }}>
          <Typography variant="h4" fontSize={{xs: "25px", md: '30px'}} gutterBottom textAlign="center">
            Interact
          </Typography>
        </Box>
  
        {/* Buttons for Pokémon Interaction */}
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ width: "50%", height: '60px', marginTop: "10px", fontSize: '20px' }}
            >
            Talk
            </Button>
            <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ width: "50%", height: '60px', marginTop: "10px", fontSize: '20px' }}
            >
            Play
            </Button>
            <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ width: "50%", height: '60px', marginTop: "10px", fontSize: '20px' }}
            >
            Feed
            </Button>

            {/* Disabled button on default */}
            <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ width: "50%", height: '60px', marginTop: "10px", fontSize: '20px' }}
            disabled={true} // Add function here to check if Pokémon can evolve
            >
            Evolve?
            </Button>
    </Box>
      </Box>
  );
}
