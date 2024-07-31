import { CssBaseline, GlobalStyles } from '@mui/material/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

// All pages/components are imported here
import lightTheme from '../styles/themes/theme';
import Navbar from '../components/Navbar';
import Login from './Login';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Home from './Home';
import Redirect from './Redirect';
import UserSettings from './UserSettings';
import Store from './Store';
import MainStore from './MainStore';
import StoreLab from './StoreLab';
import Pokedex from './Pokedex';
import Party from './Party';
import Trails from './Trails';
import WildTrail from './WildTrail';
import RockyTrail from './RockyTrail';
import FrostyTrail from './FrostyTrail';
import WetTrail from './WetTrail';

export default function App() {
  return (
    
    <BrowserRouter>
      {/* ThemeProvider is used to apply the lightTheme to the entire app */}
      <ThemeProvider theme={lightTheme}>
      {/* CssBaseline is used to remove any default CSS styling */}
      <CssBaseline />
      {/* Overrides the background colour and replaces it with theme colour so all pages have theming */}
      <GlobalStyles styles={{ html: { backgroundColor: lightTheme.palette.background.default } }} />
        {/* Loads Navbar component on all routes */}
        <Navbar />
        {/* Defines routes for the application */}
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/send" element={<StoreLab />} />
          <Route path="/store/items" element={<MainStore />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/party" element={<Party />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/trails/wild" element={<WildTrail />} />
          <Route path="/trails/wet" element={<WetTrail />} />
          <Route path="/trails/rocky" element={<RockyTrail />} />
          <Route path="/trails/frosty" element={<FrostyTrail />} />
          <Route path="/user-settings" element={<UserSettings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
