import { Box } from "@mui/material";

import Background from "../components/Background";
import backgroundImg from '../assets/store_images/lab.jpg';
import DonateComponentBox from "../components/DonateComponentBox";

const componentDetails = {
  heading: "Professor Store",
  componentHeadingColour: "rgba(161, 204, 236, 0.8)",
  componentBackgroundColour: "rgba(188, 207, 244, 0.5)",
  tileColour: "rgba(204, 220, 245, 0.8)",
};

const headingColour = "#000";
const backgroundColour = "#BCE3FF";

export default function StoreLab() {
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
        <DonateComponentBox componentDetails={componentDetails} headingColour={headingColour}/>
      </Box>
    </Background>
  );
}

