import { Box, Typography } from '@mui/material';
import voucherLogo from '../assets/store_images/voucher.png';

export default function Balance() {
    return (
        <Box
            sx={{
                alignSelf: 'center',
                pr: {xs: 1 , md: 2},
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // Align items vertically centered
            }}
        >
            {/* Egg Voucher Balance */}
            <Box
                component="img"
                src={voucherLogo}
                alt="Voucher Logo"
                sx={{
                    height: { xs: '1.5em', md: '2.2em' }, // Responsive height
                    transform: 'rotate(30deg)',
                    mr: {xs: '3px', md: '8px'},
                    mb: '2px',
                }}
            />
            <Typography
                fontSize={{ xs: '16px', md: '20px' }} // Responsive font size
                sx={{ mr: {xs: 1, md: 2 } }}
            >
                1
            </Typography>

            {/* Pokedollar Balance */}
            <Typography
                fontSize={{ xs: '16px', md: '20px' }} // Responsive font size
                fontWeight={500}
            >
                ₽
            </Typography>
            <Typography
                fontSize={{ xs: '16px', md: '20px' }} // Responsive font size
                fontWeight={500}
            >
                200
            </Typography>
        </Box>
    );
}
