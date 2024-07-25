import { createTheme } from '@mui/material/styles';

// Created a light theme with custom component styles
const lightTheme = createTheme({
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
