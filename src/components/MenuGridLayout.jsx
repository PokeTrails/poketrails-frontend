import PropTypes from 'prop-types';

import { Container, Grid, Typography, Box } from '@mui/material';
import MenuItem from './MenuItem';
import Background from './Background';

const MenuGridLayout = ({ pageOptions, pageDetails, iconSize }) => {
  return (
    <Background
      backgroundImg={pageDetails.backgroundImg}
      backgroundColour={pageDetails.backgroundColour}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          textAlign: 'center',
          mt: 4,
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
                iconSize={iconSize}
              />
            );
          })}
        </Grid>
      </Container>
      </Background>
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
  iconSize: PropTypes.number.isRequired
};

export default MenuGridLayout;
