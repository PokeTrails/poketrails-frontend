import { Typography, Box, Button, Container } from '@mui/material';

export default function InDevelopment() {
  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        textAlign: 'center', 
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight={600}
        sx={{ mb: 2 }}
      >
        Well this is awkward..
      </Typography>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ mb: 2 }}
      >
        There's not much to see here right now as this page is still in development. <br /> Come back a bit later and hopefully we'll have something up!
      </Typography>
      <Box 
        sx={{ 
          mb: 3 
        }}
      >
        <img 
          src="https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif" 
          width="auto" 
          height="auto" 
          alt="Development GIF" 
        />
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </Container>
  );
}
