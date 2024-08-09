import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import CompletedTrail from '../components/CompletedTrail';
import { capitaliseName, formatTime } from '../utils';
import useGetTrailData from '../hooks/useGetTrailData';
import useSendPokemonOnTrail from '../hooks/useSendPokemonOnTrail';
import useRetrievePokemonFromTrail from '../hooks/useRetrievePokemonFromTrail';
import usePopup from '../hooks/usePopup';
import useCheckTrailTime from '../hooks/useCheckTrailTime';
import useCountdown from '../hooks/useCountdown'; // Import the custom hook
import SendPokemonPopup from '../components/SendPokemonPopup';
import RetrievePokemonPopup from '../components/RetrievePokemonPopup';

export default function TrailData({ pokemonName, trail, pokemonID }) {
  const [sending, setSending] = useState(false);
  const [retrieving, setRetrieving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Track initial loading state

  const { currentlyOnTrail, wildCompleted, rockyCompleted, frostyCompleted, wetCompleted, onTrailTitle } = useGetTrailData(pokemonID) || {};
  const { sendPokemonOnTrail } = useSendPokemonOnTrail();
  const { retrievePokemonFromTrail, loading: retrieveLoading } = useRetrievePokemonFromTrail();
  const { popupData, openPopup, closePopup } = usePopup();
  const { timeLeft, loading } = useCheckTrailTime(pokemonID);

  // Use the custom countdown hook
  const countdown = useCountdown(timeLeft, currentlyOnTrail);

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // Adjust the duration if needed
    return () => clearTimeout(timer);
  }, []);

  const handleSendPokemonClick = async () => {
    if (pokemonID && trail) {
      setSending(true);
      const result = await sendPokemonOnTrail(pokemonID, trail);
      setSending(false);
      openPopup(result);
    }
  };

  const handleRetrievePokemonClick = async () => {
    if (pokemonID) {
      setRetrieving(true);
      const result = await retrievePokemonFromTrail(pokemonID);
      setRetrieving(false);
      if (result.error) {
        console.error('Error:', result.error);
      } else {
        openPopup(result);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: { xs: '100%', md: '30vh' },
        textAlign: 'center'
      }}
    >
      {initialLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ mt: { xs: 0, md: 5 } }}>
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
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontSize: { xs: '13px', sm: '14px', md: '16px' }, mt: { xs: 2 }, mb: 2 }}
            >
              {!currentlyOnTrail ? `${capitaliseName(pokemonName)} is ready to explore the ${trail} trail` : `${capitaliseName(pokemonName)} is already exploring the ${onTrailTitle}.`}
            </Typography>

            {!currentlyOnTrail && (
              <Button
                variant="contained"
                size="medium"
                disabled={countdown > 0 || loading || sending}
                sx={{ 
                  width: { xs: '100%', md: '80%', lg: '70%' }, 
                  height: { xs: '40px', md: '50px' }, 
                  fontSize: { xs: '13px', sm: '14px', md: '16px' },
                  position: 'relative'
                }}
                onClick={handleSendPokemonClick}
              >
                {sending ? (
                  <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                ) : (
                  countdown > 0 ? `${formatTime(countdown)}` : `Send ${pokemonName}?`
                )}
              </Button>
            )}

            {currentlyOnTrail && (
              <Button
                variant="contained"
                size="medium"
                disabled={countdown > 0 || loading || retrieving}
                sx={{ 
                  width: { xs: '100%', md: '80%', lg: '70%' }, 
                  height: { xs: '40px', md: '50px' }, 
                  fontSize: { xs: '13px', sm: '14px', md: '16px' },
                  position: 'relative'
                }}
                onClick={handleRetrievePokemonClick}
              >
                {retrieving ? (
                  <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                ) : (
                  countdown > 0 ? `${formatTime(countdown)}` : `Claim rewards`
                )}
              </Button>
            )}
          </Box>
        </>
      )}

      {popupData && (
        !currentlyOnTrail ? (
          <SendPokemonPopup pokemonName={capitaliseName(pokemonName)} trail={trail} data={popupData} onClose={closePopup} />
        ) : (
          <RetrievePokemonPopup pokemonName={capitaliseName(pokemonName)} trail={trail} data={popupData} onClose={closePopup} />
        )
      )}
    </Box>
  );
}

TrailData.propTypes = {
  trail: PropTypes.string.isRequired,
  pokemonName: PropTypes.string,
  pokemonID: PropTypes.string,
};
