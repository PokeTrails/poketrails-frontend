import { Box } from '@mui/material';

import SelectedPokemon from '../components/SelectedPokemon';
import PokemonParty from '../components/UserParty';
import Interactions from '../components/Interactions';

export default function Party() {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/pokemon`; // URL to fetch data from

  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <SelectedPokemon />
      <Interactions />
      <PokemonParty apiURL={apiURL} jwt={jwt} />
    </Box>
  );
}
