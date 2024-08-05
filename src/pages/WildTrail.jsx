import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/trail_images/wild_trail.png';
import TrailComponentBox from "../components/TrailComponentBox";

const componentDetails = {
  trail: "Wild",
  componentHeadingColour: "rgba(122, 220, 185, 0.6)",
  componentBackgroundColour: "rgba(164, 218, 195, 0.5)",
  tileColour: "rgba(164, 218, 195, 0.7)",
};

const headingColour = "#3F7541";
const backgroundColour = "#C9EECF";

export default function WildTrail() {
    return (
      // Import background component and pass through page specifc image/colours
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