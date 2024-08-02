import { Box, Typography } from '@mui/material';

export default function TrailLog() {

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
        Trail Log
      </Typography>
    </Box>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique pariatur aliquid sit dolor delectus nobis officiis enim itaque excepturi, fugiat provident doloremque, saepe rem perspiciatis? Quasi optio quisquam iure vel!
        Voluptates quod quaerat animi alias porro necessitatibus quis possimus nam. Natus in, modi sequi qui deserunt quis illum sint temporibus cum ullam eum reprehenderit cumque at. Totam nesciunt placeat vitae?
        Impedit animi voluptatibus dolorem recusandae ex at quod fugiat fugit vitae. Quam quaerat facilis illo consectetur voluptate cupiditate facere sapiente reiciendis odit, magni, accusamus temporibus exercitationem provident corrupti, libero et.
        Consequatur, soluta! Ullam voluptate optio praesentium, animi eius nisi voluptas reiciendis excepturi nulla odit? Aliquid culpa adipisci perspiciatis, dolor excepturi magnam, error alias debitis porro praesentium similique, eos sit fugit?
        Possimus eveniet quasi illo! Nam voluptatem excepturi, obcaecati debitis cum asperiores! Quam explicabo dolor quae a aspernatur expedita, architecto alias vel beatae corrupti molestiae, reprehenderit, atque fuga neque eius in?
      </Box>
  </Box>
  );
}
