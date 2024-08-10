import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';
import TrailLog from './TrailLog';
import TrailData from '../components/TrailData';
import useLoading from '../hooks/useLoading';
import useGetTrailData from '../hooks/useGetTrailData';

export default function TrailComponentBox({ componentDetails, headingColour }) {
  const { isLoading, setIsLoading } = useLoading();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const { trailLogData, currentlyOnTrail }= useGetTrailData(selectedPokemon) || {};

  const handlePokemonSelect = useCallback((pokemon) => {
    setIsLoading(true);
    setSelectedPokemon(pokemon);
  }, [setIsLoading]);

  const handlePokemonNameChange = useCallback((name) => {
    setPokemonName(name);
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    if (selectedPokemon) {
      // Assuming fetching data might be async
      setIsLoading(false); // Ensure loading state is reset after selecting a Pokémon
    }
  }, [selectedPokemon, setIsLoading]);

  return (
    <>
      <Box
        sx={{
          mt: { xs: 0, md: 2 },
          backgroundColor: componentDetails.componentBackgroundColour,
          width: { xs: '100vw', md: '1200px', lg: '2000px' },
          maxWidth: { xs: '100%', md: '90vw' },
          borderRadius: 2,
          position: 'relative', // Ensure spinner can overlay this container
        }}
      >
        {/* Heading Box for Component name */}
        <Box
          sx={{
            backgroundColor: componentDetails.componentHeadingColour,
            pt: 1,
            pb: 0.5,
            mb: 1,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography
            sx={{ color: headingColour }}
            variant="h4"
            fontSize={{ xs: '20px', md: '25px' }}
            fontWeight={500}
            gutterBottom
            textAlign="center"
          >
            {componentDetails.trail} Trail
          </Typography>
        </Box>

        {/* Main Content goes here */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mb: 2,
          }}
        >
          {/* Show spinner if loading, currently not being utilised as not updating state from anywhere */}
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10, // Ensure spinner is on top
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Holds Selected Pokémon */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                maxHeight: '50vh',
                overflow: 'hidden',
              }}
            >
              {/* Render selected pokemon component */}
              <SelectedPokemon
                componentBackgroundColour={componentDetails.componentBackgroundColour}
                tileColour={componentDetails.tileColour}
                pokemonID={selectedPokemon}
                onPokemonNameChange={handlePokemonNameChange}
              />
            </Box>

            {/* Shows Trail Data for Pokémon */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                mt: { xs: 2, md: 0 },
                mr: { xs: 2, md: 4, lg: 9 },
                ml: { xs: 0, lg: 4 },
                mb: { xs: 2, md: 8 },
                maxWidth: '40vw',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {pokemonName ? (
                <TrailData trail={componentDetails.trail} pokemonName={pokemonName} pokemonID={selectedPokemon} />
              ) : (
                'Please select a valid Pokémon'
              )}
            </Box>

            {/* Holds Trail Log */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                flex: 1,
                pr: 2,
              }}
            >
              <TrailLog
                componentBackgroundColour={componentDetails.componentBackgroundColour}
                componentHeadingColour={componentDetails.componentHeadingColour}
                trailLogData={trailLogData}
                currentlyOnTrail={currentlyOnTrail}
                pokemonName={pokemonName}
              />
            </Box>
          </Box>
        </Box>

        {/* Trail Log renders below box on XS screens */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            mt: 2,
          }}
        >
          <TrailLog
            componentBackgroundColour={componentDetails.componentBackgroundColour}
            componentHeadingColour={componentDetails.componentHeadingColour}
            trailLogData={trailLogData}
            currentlyOnTrail={currentlyOnTrail}
            pokemonName={pokemonName}
          />
        </Box>        
      </Box>
      <PokemonParty
      componentBackgroundColour={componentDetails.componentBackgroundColour}
      componentHeadingColour={componentDetails.componentHeadingColour}
      tileColour={componentDetails.tileColour}
      onPokemonSelect={handlePokemonSelect}
  />
  </>
  );
}

TrailComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  headingColour: PropTypes.string,
};
