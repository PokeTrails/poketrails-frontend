import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { generateOakMessage } from '../utils';

export default function TrailLog( { componentBackgroundColour, componentHeadingColour, pokemonName } ) {

  return (
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
        <Typography variant="body1">
          {pokemonName && generateOakMessage(pokemonName) || "Sorry I can't do much with that."}
        </Typography>
      </Box>
    </Box>
  );
}

TrailLog.propTypes = {
  componentBackgroundColour: PropTypes.string,
  componentHeadingColour: PropTypes.string,
  pokemonName: PropTypes.string,
};