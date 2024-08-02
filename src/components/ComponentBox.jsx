import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function ComponentBox({ componentDetails, children }) {
  return (
    <Box
      sx={{
        mt: 2,
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '100%', md: '40%' },
        maxWidth: '1200px',
        mx: 'auto',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#7ADCB9',
          pt: 1,
          pb: 0.5,
          mb: 1,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <Typography variant="h4" fontSize={{ xs: '20px', md: '25px' }} gutterBottom textAlign="center">
          {componentDetails.heading}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

ComponentBox.propTypes = {
  componentDetails: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
