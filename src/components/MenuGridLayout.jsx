import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box } from '@mui/material';
import MenuItem from './MenuItem'; // Ensure this path is correct

const MenuGridLayout = ({ pageText, pageOptions }) => {
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
};

export default MenuGridLayout;
