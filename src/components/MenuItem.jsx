import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
});

const MenuItem = ({ menuImage, path, text, alt }) => {
  return (
    <Grid item xs={6} sm={6} md={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image src={menuImage} alt={alt} />
        <Button
          component={Link}
          to={path}
          variant="contained"
          sx={{ mt: 4, width: '50%' }}
        >
          {text}
        </Button>
      </Box>
    </Grid>
  );
};

MenuItem.propTypes = {
    menuImage: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default MenuItem;