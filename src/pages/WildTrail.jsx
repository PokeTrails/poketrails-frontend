import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/trail_images/wild_trail.png';
import TrailComponentBox from "../components/TrailComponentBox";

const componentDetails = {
  trail: "Wild"
};

export default function WildTrail() {
    return (
      // Import background component and pass through page specifc image/colours
      <Background backgroundImg={backgroundImg} backgroundColour="#C9EECF">
        <Box sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}>
          {/* Main Component to render */}
          <TrailComponentBox componentDetails={componentDetails}/>
        </Box>
      </Background>
    );
  }