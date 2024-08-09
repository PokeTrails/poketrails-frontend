import { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import PokemonParty from './UserParty';
import SelectedPokemon from './SelectedPokemon';

import useGetTrailData from '../hooks/useGetTrailData';
import useLoading from '../hooks/useLoading';

import DonatePokemon from './DonatePokemon';
import ProfessorChat from './ProfessorChat';
import ProfessorStoreHeading from './ProfessorStoreHeading';

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

  const { currentlyOnTrail } = useGetTrailData(selectedPokemon) || {};

  return (
    // Overall Box Component holding everything
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

        {/* Heading for Component */}
        <ProfessorStoreHeading 
        componentHeadingColour={componentDetails.componentHeadingColour}
        headingColour={headingColour}
        heading={componentDetails.heading}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mb: 2,
          }}
        >
        {/* Selected Pokemon Display */}
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
            {/* Loading Animation when switching Pokemon before showing donate component */}
            {isLoading ? (
              'Loading...'
            ) : pokemonName ? (
              <DonatePokemon 
              pokemonName={pokemonName}
              pokemonID={selectedPokemon}
              apiURL={apiURL}
              currentlyOnTrail={currentlyOnTrail}
              jwt={jwt} />
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
            {/* Professor Analysis component for Tablet/Desktop */}
            <ProfessorChat
              componentBackgroundColour={componentDetails.componentBackgroundColour}
              componentHeadingColour={componentDetails.componentHeadingColour}
              pokemonName={pokemonName}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>

        {/* Pokemon Party Component */}
      <PokemonParty
        componentBackgroundColour={componentDetails.componentBackgroundColour}
        componentHeadingColour={componentDetails.componentHeadingColour}
        tileColour={componentDetails.tileColour}
        apiURL={apiURL}
        jwt={jwt}
        onPokemonSelect={handlePokemonSelect}
      />

      {/* Professor Chat Component for Mobile Displays */}
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
              pokemonName={pokemonName}
            />
          </Box>
    </>
  );
}

DonateComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  headingColour: PropTypes.string,
};
