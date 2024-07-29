
import MenuGridLayout from '../components/MenuGridLayout';

import partyImg from '../assets/main_pages/party.webp';
import trailImg from '../assets/main_pages/trails.jpeg';
import storeImg from '../assets/main_pages/store.jpg';
import pokedexImg from '../assets/main_pages/pokedex.png';

const pageOptions = {
  party: {
    menuText: "Party",
    menuImage: partyImg,
    menuPath: "/party",
    imageAlt: "Party Page Icon",
  },
  trails: {
    menuText: "Trails",
    menuImage: trailImg,
    menuPath: "/trails",
    imageAlt: "Trail page icon",
  },
  store: {
    menuText: "Store",
    menuImage: storeImg,
    menuPath: "/store",
    imageAlt: "Store Page Icon",
  },
  pokedex: {
    menuText: "Pokédex",
    menuImage: pokedexImg,
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
