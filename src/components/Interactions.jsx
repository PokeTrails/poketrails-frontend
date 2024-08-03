import { Button, Box, Typography } from '@mui/material';

export default function Interactions() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '40vh', md: '40vh' },
        backgroundColor: '#AFE4CE',
        width: { xs: '50vw', md: '30vh' },
        maxWidth: '1200px',
        mr: 2,
      }}
    >
      <Box
        sx={{
            borderRadius: 2,
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
          justifyContent: 'space-evenly',
          height: '80%',
          alignItems: 'center',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
        >
          Talk
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
        >
          Play
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
        >
          Feed
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ width: "70%", height: {xs: '40px', md: '60px'}, fontSize: { xs: '16px', md: '20px' } }}
          disabled={true}
        >
          Evolve?
        </Button>
      </Box>
    </Box>
  );
}
