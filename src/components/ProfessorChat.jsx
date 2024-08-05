import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { generateOakMessage } from '../utils';

export default function ProfessorChat({ componentBackgroundColour, componentHeadingColour, pokemonName, isLoading }) {
  return (
    // Overall Component Box
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '30vh', md: '50vh' },
        pb: 3,
        backgroundColor: componentBackgroundColour || 'rgba(164, 218, 195, 0.5)',
        width: { xs: '100vw', md: '35vw' },
        maxWidth: '550px',
        maxHeight: '500px',
        mt: 0,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: componentHeadingColour || 'rgba(122, 220, 185, 0.6)',
          pt: 1,
          pb: 0.5,
          mb: 1,
        }}
      >
        {/* Heading for Component */}
        <Typography variant="h4" fontSize={{ xs: '15px', md: '25px' }} gutterBottom textAlign="center">
          Professor Analysis
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          overflow: 'auto',
          height: 'calc(100% - 54px)',
        }}
      >
        {/* If isLoading is true, display loading text; otherwise, show the generated message */}
        <Typography variant="body1">
          {isLoading
            ? ''
            : pokemonName
            ? generateOakMessage(pokemonName)
            : "Sorry, I can't do much with that."}
        </Typography>
      </Box>
    </Box>
  );
}

ProfessorChat.propTypes = {
  componentBackgroundColour: PropTypes.string,
  componentHeadingColour: PropTypes.string,
  pokemonName: PropTypes.string,
  isLoading: PropTypes.bool,
};
