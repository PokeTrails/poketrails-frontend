import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

import femaleSprite from '../assets/trainer_sprites/female_static.png';
import maleSprite from '../assets/trainer_sprites/male_static.png';
import femaleSpriteAnimated from '../assets/trainer_sprites/female_animated.png';
import maleSpriteAnimated from '../assets/trainer_sprites/male_animated.png';

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [selectedSprite, setSelectedSprite] = React.useState('female'); // Default selected sprite
  const [username, setUsername] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const apiURL = import.meta.env.VITE_API_SERVER_URL;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSpriteChange = (event) => {
    setSelectedSprite(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${apiURL}/user/create`, {
        username,
        password,
        trainerSprite: selectedSprite
      });
      console.log(response.data);
      alert('Signup successful');
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Box component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ m: 1, width: '100%' }}
          />
          <TextField
            label="Trainer name"
            id="trainer-name"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            sx={{ m: 1, width: '100%' }}
          />
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                control={<Radio sx={{ display: 'none' }} />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      '& img': {
                        transition: 'transform 0.3s ease',
                        transform: selectedSprite === 'female' ? 'scale(1.1)' : 'scale(1)',
                      },
                    }}
                  >
                    <img
                      src={selectedSprite === 'female' ? femaleSpriteAnimated : femaleSprite}
                      alt="Female Trainer Sprite"
                      style={{ width: 'auto', height: '150px' }}
                    />
                  </Box>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio sx={{ display: 'none' }} />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      '& img': {
                        transition: 'transform 0.3s ease',
                        transform: selectedSprite === 'male' ? 'scale(1.1)' : 'scale(1)',
                      },
                    }}
                  >
                    <img
                      src={selectedSprite === 'male' ? maleSpriteAnimated : maleSprite}
                      alt="Male Trainer Sprite"
                      style={{ width: 'auto', height: '150px' }}
                    />
                  </Box>
                }
              />
            </Box>
          </RadioGroup>
        </Box>
      </Box>
      <Button type="submit" variant="contained" size="large" sx={{ width: { sm: '50%', md: '30%' }, marginTop: '10px' }}>Sign Up</Button>
    </Box>
  );
}