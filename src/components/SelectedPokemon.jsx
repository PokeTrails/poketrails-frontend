import { Box, Typography } from '@mui/material';

export default function SelectedPokemon() {
  return (
    <Box
      sx={{
        mt: 2,
        pb: 3,
        backgroundColor: '#AFE4CE',
        width: { xs: '100%', md: '30%' },
        maxWidth: '1200px',
        mx: 'auto',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {/* Box for Pokemon Sprite */}
      <Box
        sx={{
          width: '100%',
          paddingTop: '100%', // Square aspect ratio
          position: 'relative',
          borderRadius: 2,
          backgroundColor: '#A4DAC3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 2,
        }}
      >
        {/* Pokemon Sprite Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
                xs: 'scale(3)',
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
        </Box>
      </Box>
    </Box>
  );
}
