import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box } from '@mui/material';
import MenuItem from './MenuItem'; // Ensure this path is correct

const MenuGridLayout = ({ pageOptions, pageDetails }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        textAlign: 'center',
        backgroundImage: `url(${pageDetails.backgroundImg})`,
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
            backgroundColor: pageDetails.backgroundColour,
            zIndex: 1,
          }}
        />

      <Container
        sx={{
          position: 'relative',
          zIndex: 2, // Ensure content is above overlay
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h3" align="center" sx={{ fontSize: { xs: '35px', md: '40px' }, mt: 4, color: pageDetails.headingColour }}>
            {pageDetails.pageHeading}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" align="center" sx={{ fontSize: { xs: '18px', md: '20px' }, mt: 4, mb: { xs: 5, md: 12 }, color: pageDetails.textColour }}>
            {pageDetails.pageText}
          </Typography>
        </Box>

        <Grid container spacing={5} justifyContent="center">
          {Object.keys(pageOptions).map((key) => {
            const { menuText, menuImage, menuPath, imageAlt } = pageOptions[key];
            return (
              <MenuItem
                key={key}
                menuImage={menuImage}
                menuPath={menuPath}
                menuText={menuText}
                imageAlt={imageAlt}
              />
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

MenuGridLayout.propTypes = {
  pageOptions: PropTypes.object.isRequired,
  pageDetails: PropTypes.shape({
    pageHeading: PropTypes.string.isRequired,
    pageText: PropTypes.string.isRequired,
    headingColour: PropTypes.string.isRequired,
    textColour: PropTypes.string.isRequired,
    backgroundColour: PropTypes.string,
    backgroundImg: PropTypes.string,
  }).isRequired,
};

export default MenuGridLayout;
