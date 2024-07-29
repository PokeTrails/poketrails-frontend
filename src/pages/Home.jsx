import { Container, Grid, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import image1 from "../assets/main-pages/party.webp"
import image2 from "../assets/main-pages/trails.jpeg"
import image3 from "../assets/main-pages/store.jpg"
import image4 from "../assets/main-pages/pokedex.png"

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
});

const Home = () => {
  return (
    <Container>
      <Typography variant="h6" align="center" gutterBottom>
        Select from an option below
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item sm={6} md={3}>
          <Box>
            <Image src={image1} alt="Image 1" />
            <Button
              component={Link}
              to="/party"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Party
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box>
            <Image src={image2} alt="Image 2" />
            <Button
              component={Link}
              to="/trails"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Trails
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box>
            <Image src={image3} alt="Image 3" />
            <Button
              component={Link}
              to="/store"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Store
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} md={3}>
          <Box>
            <Image src={image4} alt="Image 4" />
            <Button
              component={Link}
              to="/pokedex"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Pokédex
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
