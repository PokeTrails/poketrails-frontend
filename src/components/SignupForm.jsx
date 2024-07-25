import React from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import femaleSprite from '../assets/trainer_sprites/female.png';
import maleSprite from '../assets/trainer_sprites/male.png';

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [selectedSprite, setSelectedSprite] = React.useState('female'); // Default selected sprite

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSpriteChange = (event) => {
    setSelectedSprite(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            maxWidth: '600px',
          }}
        >
          <TextField
            label="Username"
            id="username"
            sx={{ m: 1, width: '100%' }}
          />
          <TextField
            label="Trainer name"
            id="trainer-name"
            sx={{ m: 1, width: '100%' }}
          />
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            maxWidth: '600px',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Select a Trainer Sprite:
          </Typography>

          
            <RadioGroup
              value={selectedSprite}
              onChange={handleSpriteChange}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={femaleSprite}
                      alt="Female Trainer Sprite"
                      style={{ width: 'auto', height: '150px' }}
                    />
                    <Typography>Female</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={maleSprite}
                      alt="Male Trainer Sprite"
                      style={{ width: 'auto', height: '150px' }}
                    />
                    <Typography>Male</Typography>
                </Box>
              }
            />
            </Box>
          </RadioGroup>
          
        </Box>
      </Box>
      <Button variant="contained" size="large" sx={{ width: '25%', marginTop: '10px' }}>Sign Up</Button>
    </Box>
  );
}
