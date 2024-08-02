import PokemonParty from '../components/UserParty';

export default function Party() {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/pokemon`; // URL to fetch data from

  return (
    <div>
      <PokemonParty apiURL={apiURL} jwt={jwt} />
    </div>
  );
}
