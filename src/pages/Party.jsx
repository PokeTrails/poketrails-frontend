import PokemonParty from '../components/UserParty';

export default function Party() {
  const jwt = localStorage.getItem('jwt');
  const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/api/pokemon`;

  return (
    <div>
      <PokemonParty apiURL={apiURL} jwt={jwt} />
    </div>
  );
}
