import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Container, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import appLogo from '../assets/app_logo.png';

const pages = ['Home', 'Party', 'Trails', 'Pokédex', 'Store'];
const settings = ['User Settings', 'Logout'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const jwt = localStorage.getItem('jwt');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (page) => {
    if (page === 'Home') {
      navigate('/?redirect=home'); // Pass 'home' as a query parameter
    } else {
      navigate('/?redirect=' + page.toLowerCase().replace('é', 'e')); // Pass the page name as a query parameter
    }
    handleCloseNavMenu();
  };

  const handleSettingsClick = (setting) => {
    if (setting === 'Logout') {
      localStorage.removeItem('jwt');
      navigate('/login');
    } else if (setting === 'User Settings') {
      navigate('/?redirect=user-settings'); // Pass 'home' as a query parameter
    }
    handleCloseUserMenu();
  };

  const getCurrentPage = () => {
    const path = location.pathname.substring(1); // Remove leading '/'
    if (path === '') return 'home';
    return path.toLowerCase().replace('é', 'e').replace('-', ' '); // Replace dashes with spaces and handle special characters
  };

  const currentPage = getCurrentPage();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'red',
              textDecoration: 'none',
            }}
          >
            <img src={appLogo} alt="Application Logo" height={50} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    color: currentPage === page.toLowerCase().replace('é', 'e') ? 'primary.main' : 'inherit',
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={appLogo} alt="Application Logo" height={50} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{
                  my: 2,
                  color: currentPage === page.toLowerCase().replace('é', 'e') ? 'primary.main' : 'black',
                  display: 'block',
                  '&:hover': { color: 'action.hover', backgroundColor: 'action.shadow' },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {jwt && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingsClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
