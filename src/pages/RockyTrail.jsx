import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/trail_images/rocky_trail.png';
import TrailComponentBox from "../components/TrailComponentBox";

const componentDetails = {
  trail: "Rocky",
  componentHeadingColour: "rgba(224, 182, 118, 0.5)",
  componentBackgroundColour: "rgba(255, 228, 180, 0.5)",
  
  tileColour: "rgba(222, 202, 118, 0.3)",
};

const headingColour = "#c88023";
const backgroundColour = "#ebdab4";

export default function RockyTrail() {
  return (
    // Import background component and pass through page specifc image/colours
    <Background backgroundImg={backgroundImg} backgroundColour={backgroundColour}>
      <Box sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}>
        {/* Main Component to render */}
        <TrailComponentBox componentDetails={componentDetails} headingColour={headingColour}/>
      </Box>
    </Background>
  );
}

