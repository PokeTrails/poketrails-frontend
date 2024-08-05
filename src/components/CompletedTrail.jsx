import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function CompletedTrail({ trailType, textColour }) {
  return (
    <>
        <Typography
        variant="h6"
        textAlign="center"
        gutterBottom
        sx={{
            fontSize: { xs: '13px', md: '16px' },
            fontWeight: 'bold',
            color: textColour,
            }}
            >
        {trailType} Trail Completed:
        </Typography>
    </>
  );
}

CompletedTrail.propTypes = {
  trailType: PropTypes.string.isRequired,
  textColour: PropTypes.string.isRequired,
};
