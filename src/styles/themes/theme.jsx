import * as React from 'react';
import { createTheme } from '@mui/material/styles';

// Can create duplicate instance if want dark and light
// Only has light theme for now
const lightTheme = createTheme({
    palette: {    
      primary: {
        main: '#FF7070',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#C9EECF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#000',
      },
      background: {
        default: "#C9EECF"
      },
    }
  });

export default lightTheme;