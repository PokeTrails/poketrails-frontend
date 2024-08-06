import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';

import Balance from "./Balance";

export default function ProfessorStoreHeading({ headingColour, componentHeadingColour }) {
    return (
        <Box
            sx={{
                position: 'relative', // To position Balance absolutely
                backgroundColor: componentHeadingColour,
                pt: 1,
                pb: 0.5,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center the heading text horizontally
                width: '100%', // Ensure full width
            }}
        >
            {/* Centered Heading Text */}
            <Typography
                sx={{
                    color: headingColour,
                    position: 'relative', // Position relative to adjust text center
                }}
                variant="h4"
                fontSize={{ xs: '20px', md: '25px' }}
                fontWeight={500}
                gutterBottom
            >
                Professor Store
            </Typography>

            {/* User Balance and Egg Vouchers */}
            <Box
                sx={{
                    position: 'absolute', // Position absolutely within the relative container
                    right: 0, // Align to the right
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Balance />
            </Box>
        </Box>
    );
}

ProfessorStoreHeading.propTypes = {
    headingColour: PropTypes.string,
    componentHeadingColour: PropTypes.string,
};
