import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Background = ({ backgroundImg, backgroundColour, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        textAlign: 'center',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay color */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: backgroundColour,
          opacity: 0.9,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2, // Ensure content is above overlay
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

Background.propTypes = {
  backgroundImg: PropTypes.string.isRequired,
  backgroundColour: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Background;
