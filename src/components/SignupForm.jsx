import * as React from 'react';

import { Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from '@mui/material';

import femaleSprite from '../assets/trainer_sprites/female.png';
import maleSprite from '../assets/trainer_sprites/male.png';

export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'nowrap',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Username"
            id="username"
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            label="Trainer name"
            id="trainer-name"
            sx={{ m: 1, width: '25ch' }}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
            display: { xs: 'block', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold'}}
          >
            Select a Trainer Sprite:
          </Typography>
          <Box sx={{height: "200px"}}>
            <img
              src={femaleSprite}
              alt="Female Trainer Sprite"
              style={{ width: 'auto', height: '100%' }}
            />
            <img
              src={maleSprite}
              alt="Male Trainer Sprite"
              style={{ width: 'auto', height: '100%' }}
            />
          </Box>
        </Box>
      </Box>
      <Button variant="contained" size="large" sx={{ width: {sm: "50%", md: "30%"}, marginTop: '10px' }}>Sign Up</Button>
    </Box>
  );
}