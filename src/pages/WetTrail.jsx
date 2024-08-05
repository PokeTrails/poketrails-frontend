import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/trail_images/wet_trail.png';
import TrailComponentBox from "../components/TrailComponentBox";

const componentDetails = {
  trail: "Wet",
  componentHeadingColour: "rgba(43, 114, 100, 0.7)", // Lighter green with reduced opacity
  componentBackgroundColour: "rgba(114, 153, 139, 0.8)", // Lighter background with reduced opacity
  tileColour: "rgba(45, 130, 100, 0.4)", // Lighter tile color with reduced opacity
};

const headingColour = "rgba(31, 183, 168, 1)"; // Lighter heading color with reduced opacity
const backgroundColour = "rgba(43, 114, 100, 0.8)"; // Lighter background color with reduced opacity

export default function WetTrail() {
  return (
    // Import background component and pass through page-specific image/colours
    <Background backgroundImg={backgroundImg} backgroundColour={backgroundColour}>
      <Box sx={{
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}>
        {/* Main Component to render */}
        <TrailComponentBox componentDetails={componentDetails} headingColour={headingColour}/>
      </Box>
    </Background>
  );
}
