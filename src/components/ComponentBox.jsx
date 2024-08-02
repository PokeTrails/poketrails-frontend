import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function ComponentBox({ componentDetails, children }){
    return (
        <Box sx={{ 
            mt: 2,
            pb: 3,
            backgroundColor: '#AFE4CE',
            width: '50vw',
            }}>

            <Box sx={{ 
                backgroundColor: '#7ADCB9',
                pt: 1,
                pb: 0.5,
                mb: 1,
                    }}>
          <Typography variant="h4" fontSize={{xs: "25px", md: '30px'}} gutterBottom textAlign="center">
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