import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';
import useLoading from '../hooks/useLoading';
import DonatePokemon from './DonatePokemon';
import ProfessorChat from './ProfessorChat';

export default function DonateComponentBox({ componentDetails, headingColour }) {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;
  const { isLoading, setIsLoading } = useLoading();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const handlePokemonSelect = (pokemon) => {
    setIsLoading(true);
    setSelectedPokemon(pokemon);
  };

  const handlePokemonNameChange = (name) => {
    setPokemonName(name);
    setIsLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          mt: { xs: 0, md: 2 },
          backgroundColor: componentDetails.componentBackgroundColour,
          width: { xs: '100vw', md: '1200px', lg: '2000px' },
          maxWidth: { xs: '100%', md: '90vw' },
          borderRadius: 2,
        }}
      >
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
            {componentDetails.heading}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              maxHeight: '50vh',
              overflow: 'hidden',
            }}
          >
            <SelectedPokemon
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              tileColour={componentDetails.tileColour}
              jwt={jwt}
              apiURL={apiURL}
              pokemonID={selectedPokemon}
              onPokemonNameChange={handlePokemonNameChange}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pr: {sx: 0, md: 10}
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : pokemonName ? (
              <DonatePokemon pokemonName={pokemonName} />
            ) : (
              'Please select a valid Pokémon'
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              maxHeight: '50vh',
              overflow: 'hidden',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <ProfessorChat
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              componentHeadingColour={componentDetails.componentHeadingColour}
            />
          </Box>
        </Box>
      </Box>

      <PokemonParty
        componentBackgroundColour={componentDetails.componentBackgroundColour}
        componentHeadingColour={componentDetails.componentHeadingColour}
        tileColour={componentDetails.tileColour}
        apiURL={apiURL}
        jwt={jwt}
        onPokemonSelect={handlePokemonSelect}
      />
      <Box
            sx={{
              maxHeight: '50vh',
              mt: 2,
              display: { xs: 'block', md: 'none' },
            }}
          >
            <ProfessorChat
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              componentHeadingColour={componentDetails.componentHeadingColour}
            />
          </Box>
    </>
  );
}

DonateComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  headingColour: PropTypes.string,
};
