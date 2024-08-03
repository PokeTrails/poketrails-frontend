import { Box, Typography } from '@mui/material';

export default function TrailLog() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        height: { xs: '30vh', md: '40vh' },
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '100vw', md: '30vh' },
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
          Trail Log
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          overflow: 'auto',
          height: 'calc(100% - 54px)',
        }}
      >
        <Typography variant="body1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique pariatur aliquid sit dolor delectus nobis officiis enim itaque excepturi, fugiat provident doloremque, saepe rem perspiciatis? Quasi optio quisquam iure vel!
          Voluptates quod quaerat animi alias porro necessitatibus quis possimus nam. Natus in, modi sequi qui deserunt quis illum sint temporibus cum ullam eum reprehenderit cumque at. Totam nesciunt placeat vitae?
          Impedit animi voluptatibus dolorem recusandae ex at quod fugiat fugit vitae.
        </Typography>
      </Box>
    </Box>
  );
}
