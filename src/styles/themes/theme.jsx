import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/saira/300.css';
import '@fontsource/saira/400.css';
import '@fontsource/saira/500.css';
import '@fontsource/saira/700.css';

// Created a light theme with custom component styles
const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Saira',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#FF7070',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C9EECF',
      light: '#F5EBFF',
      contrastText: '#000',
    },
    background: {
      default: '#C9EECF',
    },
    action: {
      shadow: '#FF7070',
      hover: '#F0F0F0',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            borderRadius: 4, // Required to remove white pixel on corner of inputs
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 4, // Required to remove white pixel on corner of inputs
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'blue',
          '&:hover': {
            textDecoration: 'underline',
            color: '#FF7070',
          },
        },
      },
    },
  },
});

export default lightTheme;
