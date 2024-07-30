
import MenuGridLayout from '../components/MenuGridLayout';

import partyImg from '../assets/main_pages/party.webp';
import trailImg from '../assets/main_pages/trails.jpeg';
import storeImg from '../assets/main_pages/store.jpg';
import pokedexImg from '../assets/main_pages/pokedex.png';
import backgroundImg from '../assets/main_background.jpg';

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

const pageDetails = {
  pageHeading: "Main Menu",
  pageText: "Select from one of the options below",
  headingColour: "#FF7070",
  textColour: "#000",
  backgroundColour: "#C9EECF",
  backgroundImg: backgroundImg,
};


const Home = () => {
  return (
    <MenuGridLayout
    pageDetails={pageDetails}
    pageOptions={pageOptions}
    iconSize={3}
    />
  );
};

export default Home;
