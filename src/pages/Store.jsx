import MenuGridLayout from '../components/MenuGridLayout';

import pokemonPageImg from '../assets/store_images/pokemon_page.png';
import storePageImg from '../assets/store_images/store_page.png';
import backgroundImg from '../assets/store_images/main-background.jpg';

const pageOptions = {
  wild: {
    menuText: "Visit Store",
    menuImage: storePageImg,
    menuPath: "/store/items",
    imageAlt: "Wild Trail Icon",
  },
  rocky: {
    menuText: "Submit Pokémon",
    menuImage: pokemonPageImg,
    menuPath: "/store/send",
    imageAlt: "Rocky Trail icon",
  },
};

const pageDetails = {
  pageHeading: "Professor Store",
  pageText: "Welcome to the Professor Store!",
  headingColour: "#357387",
  textColour: "#000",
  backgroundColour: "#bce3ff",
  backgroundImg: backgroundImg,
};

const Store = () => {
  return (
    <MenuGridLayout
      pageOptions={pageOptions}
      pageDetails={pageDetails}
    />
  );
};

export default Store;
