import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../styles/themes/theme';
import Navbar from '../components/Navbar';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
