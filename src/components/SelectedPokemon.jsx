import { Box, Typography, LinearProgress, CircularProgress, TextField, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { capitaliseName, formatTime } from '../utils';
import usePokemonData from '../hooks/usePokemonData';
import useEditNickname from '../hooks/useEditNickname';
import useHatchPokemon from '../hooks/useHatchPokemon';

import eggSprite from '../assets/pokemon_egg_animated.gif';
import shinyIcon from '../assets/shiny_icon.png';
import HatchPopup from './HatchPopup';

export default function SelectedPokemon({ jwt, apiURL, pokemonID, currentHappiness }) {
  const { pokemonData, isLoading, error, timeLeft, setPokemonData } = usePokemonData(apiURL, pokemonID, jwt);

  const {
    isEditing,
    newNickname,
    setNewNickname,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  } = useEditNickname(apiURL, pokemonID, jwt, setPokemonData);

  const {
    isHatching,
    popupData,
    showPopup,
    handleHatchClick,
    handleClosePopup,
  } = useHatchPokemon(apiURL, pokemonID, jwt);

  return (
    <Box
      sx={{
        borderRadius: 2,
        pb: 3,
        backgroundColor: 'rgba(175, 228, 206, 0.6)',
        width: { xs: '80vw', md: '30vh' },
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        mr: 2,
        ml: 2,
      }}
    >
      {error && <Typography color="error">{error}</Typography>}

      <Box
        sx={{
          borderRadius: 2,
          width: '100%',
          position: 'relative',
          backgroundColor: pokemonData?.isShiny ? 'rgba(255,254,0,0.12)' : 'rgba(164, 218, 195, 0.5)', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '75%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ width: '70%' }} />
          ) : pokemonData ? (
            <Box
              component="img"
              src={pokemonData.eggHatched ? pokemonData.sprite : eggSprite}
              alt={pokemonData.nickname || 'Pokémon'}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: {
                  xs: 'scale(1)',
                  sm: 'scale(1.2)',
                  md: 'scale(1.5)',
                  lg: 'scale(2)',
                },
              }}
            />
          ) : (
            <Typography>Select a Pokémon to view</Typography>
          )}
        </Box>
      </Box>

      {pokemonData && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
            pb: 2,
            paddingTop: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isEditing ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={handleSaveClick}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick}>
                  <CancelIcon />
                </IconButton>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '20px', md: '25px' }}
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mr: 1, cursor: 'pointer' }}
                    onClick={() => handleEditClick(pokemonData.nickname)}
                  >
                    {capitaliseName(pokemonData.nickname)}
                  </Typography>
                  {pokemonData.isShiny && (
                    <Box
                      component="img"
                      src={shinyIcon}
                      alt="Shiny"
                      sx={{
                        width: { xs: 20, md: 30 },
                        height: { xs: 20, md: 30 },
                        marginTop: { xs: 'auto', md: 'auto' },
                        marginBottom: { xs: 'auto', md: 'auto' },
                      }}
                    />
                  )}
                </Box>

                {(pokemonData.nickname?.toLowerCase() !== pokemonData.species?.toLowerCase()) && (
                  <Typography
                    variant="h6"
                    fontSize={{ xs: '16px', md: '18px' }}
                    textAlign="center"
                    sx={{ pt: 1 }}
                  >
                    {`(${capitaliseName(pokemonData.species)})`}
                  </Typography>
                )}
              </>
            )}
          </Box>

          <Box>
            <Typography
              variant="h6"
              fontSize={{ xs: '16px', md: '18px' }}
              textAlign="center"
              sx={{ pt: 2 }}
            >
              {pokemonData.eggHatched ? 'Happiness' : 'Time Left to Hatch:'}
            </Typography>

            {pokemonData.eggHatched ? (
              <>
                <Box sx={{ width: '100%', mb: 1, pt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(currentHappiness || pokemonData.current_happiness) / pokemonData.target_happiness * 100 || 0}
                    sx={{ height: 10, borderRadius: 5, width: { xs: '150px', sm: '300px' } }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ pt: 1 }}
                  textAlign="center"
                >
                  {`${currentHappiness || pokemonData.current_happiness} / ${pokemonData.target_happiness}`}
                </Typography>
              </>
            ) : (
              <>
                {timeLeft > 0 && (
                  <Typography
                    variant="h6"
                    fontSize={{ xs: '18px', md: '20px' }}
                    textAlign="center"
                  >
                    {formatTime(timeLeft)}
                  </Typography>
                )}
                {timeLeft <= 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleHatchClick}
                    disabled={isHatching}
                    sx={{ mt: 2, mr: {xs: 2, md: 2}, width: '100%' }}
                  >
                    Hatch now!
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      )}

      {showPopup && (
        <HatchPopup
          data={popupData}
          onClose={handleClosePopup}
        />
      )}
    </Box>
  );
}

SelectedPokemon.propTypes = {
  jwt: PropTypes.string.isRequired,
  apiURL: PropTypes.string.isRequired,
  pokemonID: PropTypes.string.isRequired,
  currentHappiness: PropTypes.number,
};
