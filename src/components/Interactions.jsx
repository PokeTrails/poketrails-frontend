// import axios from 'axios';
import { Button, Box } from '@mui/material';

import ComponentBox from './ComponentBox';

export default function Interactions() {

    const componentDetails = {
        heading: 'Interact',
    }

    // Create function to check if valid Pokemon to interact with (egg pokemon or on trail)

    // Create function to check if pokemon can evolve

    // Convert buttons into seperate components and pass through props/check conditions
  return (

    // General box for the component
    <ComponentBox componentDetails={componentDetails}>

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
    </ComponentBox>
  );
}
