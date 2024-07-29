
import MenuGridLayout from '../components/MenuGridLayout';

import pokemonPageImg from '../assets/store_images/pokemon_page.png';
import storePageImg from '../assets/store_images/store_page.png';

const pageOptions = {
  wild: {
    menuText: "Visit Store",
    menuImage: pokemonPageImg,
    menuPath: "/trails/wild",
    imageAlt: "Wild Trail Icon",
  },
  rocky: {
    menuText: "Submit Pokémon",
    menuImage: storePageImg,
    menuPath: "/trails/rocky",
    imageAlt: "Rocky Trail icon",
  },
};

const pageText = "Welcome to the Professor Store!"

const Store = () => {
  return (
    <MenuGridLayout
    pageText={pageText}
    pageOptions={pageOptions}
    />
  );
};

export default Store;
