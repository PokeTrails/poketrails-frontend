import { Box, Typography } from '@mui/material';

export default function SelectedPokemon() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        height: {xs: '40vh', md: '40vh'},
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '50vw', md: '30vh'},
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        mr: 2,
        ml: 2,
      }}
    >
      {/* Box for Pokemon Sprite */}
      <Box
        sx={{
            borderRadius: 2,
            width: '100%',
            position: 'relative',
            backgroundColor: '#A4DAC3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            //   border: 2,     // Shiny pokemon border check here
            //   borderColor: 'red',
            flex: 2,
        }}
      >
        {/* Pokemon Sprite Image */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/129.gif"
            alt="magikarp"
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              transform: {
                xs: 'scale(2)',
                md: 'scale(3)',
              },
            }}
          />
        </Box>
      </Box>

      {/* Box for Pokemon Details */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
          paddingTop: 2,
        }}
      >
        {/* Pokemon Name/Species */}
        <Typography
          variant="h4"
          fontSize={{ xs: '20px', md: '25px' }}
          fontWeight="bold"
          textAlign="center"
        >
          Magikarp
        </Typography>

        {/* Hapiness Details */}
        <Box>
            <Typography
            variant="h6"
            fontSize={{ xs: '16px', md: '18px' }}
            textAlign="center"
            >
            Happiness
            </Typography>
            <Typography
            variant="h6"
            fontSize={{ xs: '16px', md: '18px' }}
            textAlign="center"
            >
            Happiness
            </Typography>
            
        </Box>
      </Box>
    </Box>
  );
}
