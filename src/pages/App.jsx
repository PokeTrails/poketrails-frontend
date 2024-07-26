import * as React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import lightTheme from '../styles/themes/theme';
import Navbar from '../components/Navbar';
import Login from './Login';
import Signup from './Signup';

export default function App() {
  return (
    
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { backgroundColor: lightTheme.palette.background.default } }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
