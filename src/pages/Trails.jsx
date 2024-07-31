
import MenuGridLayout from '../components/MenuGridLayout';

import wildTrailImg from '../assets/trail_images/wild_trail.png';
import rockyTrailImg from '../assets/trail_images/rocky_trail.png';
import frostyTrailImg from '../assets/trail_images/frosty_trail.png';
import wetTrailImg from '../assets/trail_images/wet_trail.png';
import backgroundImg from '../assets/main_background.jpg';

// Page options to pass onto MenuGrid component to render as buttons
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

// Specific details to pass onto MenuGrid component to render
const pageDetails = {
  pageHeading: "Trails",
  pageText: "Select from one of the trails below",
  headingColour: "#66b768",
  textColour: "#000",
  backgroundColour: "#C9EECF",
  backgroundImg: backgroundImg,
};


const Trails = () => {
  return (
    <MenuGridLayout
    pageDetails={pageDetails}
    pageOptions={pageOptions}
    // Specifies size of icons to render for desktop screens
    iconSize={3}
    />
  );
};

export default Trails;
