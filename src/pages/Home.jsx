
import MenuGridLayout from '../components/MenuGridLayout';

import partyImage from '../assets/main-pages/party.webp';
import trailImage from '../assets/main-pages/trails.jpeg';
import storeImage from '../assets/main-pages/store.jpg';
import pokedexImage from '../assets/main-pages/pokedex.png';

const pageOptions = {
  party: {
    menuText: "Party",
    menuImage: partyImage,
    menuPath: "/party",
    imageAlt: "Party Page Icon",
  },
  trails: {
    menuText: "Trails",
    menuImage: trailImage,
    menuPath: "/trails",
    imageAlt: "Trail page icon",
  },
  store: {
    menuText: "Store",
    menuImage: storeImage,
    menuPath: "/store",
    imageAlt: "Store Page Icon",
  },
  pokedex: {
    menuText: "Pokédex",
    menuImage: pokedexImage,
    menuPath: "/pokedex",
    imageAlt: "Pokédex Page Icon",
  },
};

const pageText = "Select from one of the options below"

const Home = () => {
  return (
    <MenuGridLayout
    pageText={pageText}
    pageOptions={pageOptions}
    />
  );
};

export default Home;
