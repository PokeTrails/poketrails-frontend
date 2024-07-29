import { CssBaseline, GlobalStyles } from '@mui/material/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import lightTheme from '../styles/themes/theme';
import Navbar from '../components/Navbar';
import Login from './Login';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Redirect from './Redirect';
import UserSettings from './UserSettings';
import Store from './Store';
import Pokedex from './Pokedex';
import Party from './Party';
import Trails from './Trails';

export default function App() {
  return (
    
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { backgroundColor: lightTheme.palette.background.default } }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/party" element={<Party />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/user-settings" element={<UserSettings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
