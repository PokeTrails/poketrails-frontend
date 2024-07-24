import { createTheme } from '@mui/material/styles';

// Created a light theme with custom component styles
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#FF7070',
    },
    secondary: {
      main: '#C9EECF',
      light: '#F5EBFF',
      contrastText: '#000',
    },
    background: {
      default: "#C9EECF",
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
  },
});

export default lightTheme;