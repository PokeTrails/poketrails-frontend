import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box } from '@mui/material';
import MenuItem from './MenuItem'; // Ensure this path is correct

const MenuGridLayout = ({ pageOptions, pageDetails }) => {
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
      <Box>
        <Typography variant="h3" align="center" sx={{ fontSize: {xs: '35px', md: '40px'}, mt: 4, color: pageDetails.headingColour}}>
          {pageDetails.pageHeading}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" align="center" sx={{ fontSize: {xs: '18px', md: '20px'}, mt: 4, mb: {xs: 5, md: 12}, color: pageDetails.textColour }}>
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
  );
};

MenuGridLayout.propTypes = {
  pageText: PropTypes.string.isRequired,
  pageOptions: PropTypes.object.isRequired,
  pageDetails: PropTypes.object,
};

export default MenuGridLayout;
