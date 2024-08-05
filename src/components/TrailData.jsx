import { Box, Typography, Button } from '@mui/material';

export default function TrailData() {

  return (
    <Box>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Wild Trail Completed:
      </Typography>
      <Button
        variant="contained"
        size="medium"
        sx={{ width: {xs: '100%', md: '70%'}, height: '50px', fontSize: { xs: '16px', md: '18px' } }}
      >
        Send Pokémon?
      </Button>
    </Box>
  );
}