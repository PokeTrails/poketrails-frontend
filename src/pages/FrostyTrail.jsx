import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/trail_images/frosty_trail.png';
import TrailComponentBox from "../components/TrailComponentBox";

const componentDetails = {
  trail: "Frosty",
  componentHeadingColour: "rgba(161, 209, 220, 0.6)",
  componentBackgroundColour: "rgba(179, 229, 240, 0.5)",
  tileColour: "rgba(161, 209, 220, 0.6)",
};

const headingColour = "#1575CD";
const backgroundColour = "#C9EEE0";

export default function FrostyTrail() {
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

