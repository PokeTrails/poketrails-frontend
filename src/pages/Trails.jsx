
import MenuGridLayout from '../components/MenuGridLayout';

import wildTrailImg from '../assets/trail_images/wild_trail.png';
import rockyTrailImg from '../assets/trail_images/rocky_trail.png';
import frostyTrailImg from '../assets/trail_images/frosty_trail.png';
import wetTrailImg from '../assets/trail_images/wet_trail.png';

const pageOptions = {
  wild: {
    menuText: "Wild Trail",
    menuImage: wildTrailImg,
    menuPath: "/trails/wild",
    imageAlt: "Wild Trail Icon",
  },
  rocky: {
    menuText: "Rocky Trail",
    menuImage: rockyTrailImg,
    menuPath: "/trails/rocky",
    imageAlt: "Rocky Trail icon",
  },
  frosty: {
    menuText: "Frosty Trail",
    menuImage: frostyTrailImg,
    menuPath: "/trails/frosty",
    imageAlt: "Frosty Trail Icon",
  },
  burning: {
    menuText: "Wet Trail",
    menuImage: wetTrailImg,
    menuPath: "/trails/wet",
    imageAlt: "Wet Trail Icon",
  },
};

const pageText = "Select from one of the trails below"

const Trails = () => {
  return (
    <MenuGridLayout
    pageText={pageText}
    pageOptions={pageOptions}
    />
  );
};

export default Trails;
