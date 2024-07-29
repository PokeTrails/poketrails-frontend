import PropTypes from 'prop-types';

import { Container, Grid, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import image1 from "../assets/main-pages/party.webp";
import image2 from "../assets/main-pages/trails.jpeg";
import image3 from "../assets/main-pages/store.jpg";
import image4 from "../assets/main-pages/pokedex.png";

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
});

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
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={6} sm={6} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image src={image1} alt="Image 1" />
            <Button
              component={Link}
              to="/party"
              variant="contained"
              sx={{ mt: 4, width: '50%' }}
            >
              Party
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image src={image2} alt="Image 2" />
            <Button
              component={Link}
              to="/trails"
              variant="contained"
              sx={{ mt: 4, width: '50%' }}
            >
              Trails
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image src={image3} alt="Image 3" />
            <Button
              component={Link}
              to="/store"
              variant="contained"
              sx={{ mt: 4, width: '50%' }}
            >
              Store
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image src={image4} alt="Image 4" />
            <Button
              component={Link}
              to="/pokedex"
              variant="contained"
              sx={{ mt: 4, width: '50%' }}
            >
              Pokédex
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

MenuGridLayout.propTypes = {
    pageText: PropTypes.string.isRequired,
  };


export default MenuGridLayout;
