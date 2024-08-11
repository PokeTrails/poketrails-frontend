import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const InteractionButton = ({ onClick, disabled, label }) => {

  // Returns the button component for interactions page
  return (
    <Button
      variant="contained"
      size="large"
      sx={{ width: "70%", height: { xs: '40px', md: '60px' }, fontSize: { xs: '16px', md: '20px' } }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

InteractionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default InteractionButton;
