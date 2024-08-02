import { Button, Box, Typography } from '@mui/material';

export default function Interactions() {

  return (
    <Box
    sx={{
      pb: 3,
      backgroundColor: '#AFE4CE',
      width: { xs: '100%', md: '30%' },
      maxWidth: '1200px',
      mr: 2,
    }}
  >
    <Box
      sx={{
        backgroundColor: '#7ADCB9',
        pt: 1,
        pb: 0.5,
        mb: 1,
      }}
    >
      <Typography variant="h4" fontSize={{ xs: '20px', md: '25px' }} gutterBottom textAlign="center">
        Interact
      </Typography>
    </Box>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: '60px', marginTop: "10px", fontSize: {xs: '18px', md: '20px'} }}
        >
          Talk
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: '60px', marginTop: "10px", fontSize: {xs: '18px', md: '20px'} }}
        >
          Play
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: '60px', marginTop: "10px", fontSize: {xs: '18px', md: '20px'} }}
        >
          Feed
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: '60px', marginTop: "10px", fontSize: {xs: '18px', md: '20px'} }}
          disabled={true}
        >
          Evolve?
        </Button>
      </Box>
  </Box>
  );
}
