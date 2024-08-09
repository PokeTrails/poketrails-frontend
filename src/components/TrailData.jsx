import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CompletedTrail from '../components/CompletedTrail';
import { capitaliseName } from '../utils';

import useGetTrailData from '../hooks/useGetTrailData';
import useSendPokemonOnTrail from '../hooks/useSendPokemonOnTrail';
import usePopup from '../hooks/usePopup';
import useCheckTrailTime from '../hooks/useCheckTrailTime'; // Import the new hook

import TrailPopup from '../components/TrailPopup';

const formatTime = (time) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
};

export default function TrailData({ pokemonName, trail, pokemonID }) {
  const { currentlyOnTrail, wildCompleted, rockyCompleted, frostyCompleted, wetCompleted } = useGetTrailData(pokemonID) || {};
  const { sendPokemonOnTrail } = useSendPokemonOnTrail();
  const { showPopup, popupData, closePopup } = usePopup();
  const { timeLeft, loading } = useCheckTrailTime(pokemonID);

  const [countdown, setCountdown] = useState(timeLeft);

  useEffect(() => {
    if (currentlyOnTrail && timeLeft !== null) {
      setCountdown(timeLeft);
    }
  }, [timeLeft, currentlyOnTrail]);

  useEffect(() => {
    if (currentlyOnTrail && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prevTime => (prevTime > 0 ? prevTime - 1000 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentlyOnTrail, countdown]);

  const handleButtonClick = async () => {
    if (pokemonID && trail) {
      const result = await sendPokemonOnTrail(pokemonID, trail);
      if (result.timeLeft) {
        setCountdown(result.timeLeft);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'space-between', // Center vertically
        height: {xs: '100%', md: '30vh'}, // Ensure the Box takes full height of its parent
        textAlign: 'center' // Center text content
      }}
    >
      {/* Render details of completed trails */}
      <Box sx={{ mt: {xs: 0, md: 5} }}>
        {pokemonName && (
          <>
            <CompletedTrail completeTotal={wildCompleted} trailType="Wild" textColour="#188831" />
            <CompletedTrail completeTotal={rockyCompleted} trailType="Rocky" textColour="#C47C53" />
            <CompletedTrail completeTotal={frostyCompleted} trailType="Frosty" textColour="#6FABD7" />
            <CompletedTrail completeTotal={wetCompleted} trailType="Wet" textColour="#015D9F" />
          </>
        )}
      </Box>

      <Box>
        {/* Render whether Pokémon is ready to go on trail or not */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' }, mt: {xs: 2}, mb: 2 }}
        >
          {pokemonName ? `${capitaliseName(pokemonName)} is ready to explore the ${trail} trail` : ''}
        </Typography>

        {/* Render Button if Pokemon is not on trail */}
        {!currentlyOnTrail && (
          <Button
            variant="contained"
            size="medium"
            disabled={countdown > 0 || loading} // Disable button if countdown is active or loading
            sx={{ 
              width: {xs: '100%', md: '80%', lg: '70%'}, 
              height: {xs: '40px', md: '50px'}, 
              fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '18px' }
            }}
            onClick={handleButtonClick} // Handle button click
          >
            {countdown > 0 ? `${formatTime(countdown)}` : `Send ${pokemonName}?`} 
          </Button>
        )}

        {/* Render Button if Pokemon is on trail */}
        {currentlyOnTrail && (
          <Button
            variant="contained"
            size="medium"
            disabled={countdown > 0 || loading} // Disable button if countdown is active or loading
            sx={{ 
              width: {xs: '100%', md: '80%', lg: '70%'}, 
              height: {xs: '40px', md: '50px'}, 
              fontSize: { xs: '13px', sm: '14px', md: '16px', lg: '18px' }
            }}
            onClick={handleButtonClick} // Handle button click
          >
            {countdown > 0 ? `${formatTime(countdown)}` : `Claim rewards`} 
          </Button>
        )}
      </Box>

      {showPopup && <TrailPopup data={popupData} onClose={closePopup} />}
    </Box>
  );
}

TrailData.propTypes = {
  trail: PropTypes.string.isRequired,
  pokemonName: PropTypes.string,
  pokemonID: PropTypes.string,
};
