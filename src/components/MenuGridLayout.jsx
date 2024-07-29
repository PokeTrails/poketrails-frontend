import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box } from '@mui/material';
import MenuItem from './MenuItem'; // Ensure this path is correct

import image1 from '../assets/main-pages/party.webp';
import image2 from '../assets/main-pages/trails.jpeg';
import image3 from '../assets/main-pages/store.jpg';
import image4 from '../assets/main-pages/pokedex.png';

const MenuGridLayout = ({ pageText }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" align="center" sx={{ mt: 10, mb: 15 }}>
          {pageText}
        </Typography>
      </Box>
      <Grid container spacing={5} justifyContent="center">
        <MenuItem menuImage={image1} path="/party" text="Party" alt="Image 1" />
        <MenuItem menuImage={image2} path="/trails" text="Trails" alt="Image 2" />
        <MenuItem menuImage={image3} path="/store" text="Store" alt="Image 3" />
        <MenuItem menuImage={image4} path="/pokedex" text="Pokédex" alt="Image 4" />
      </Grid>
    </Container>
  );
};

MenuGridLayout.propTypes = {
  pageText: PropTypes.string.isRequired,
};

export default MenuGridLayout;
