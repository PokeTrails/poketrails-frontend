import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

import femaleSprite from '../assets/trainer_sprites/female_static.png';
import maleSprite from '../assets/trainer_sprites/male_static.png';
import femaleSpriteAnimated from '../assets/trainer_sprites/female_animated.png';
import maleSpriteAnimated from '../assets/trainer_sprites/male_animated.png';
import pikachuLoading from '../assets/pikachu.gif';

import useError from '../hooks/useError';
import useLoading from '../hooks/useLoading';
import SelectTrainerSprite from './SelectTrainerSprite';

export default function Signup() {

  // Declare states for form fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState('');
  const [username, setUsername] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // API URL from .env file
  const apiURL = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();

  // Import hooks for error and loading states
  const { error, setError, clearError } = useError();
  const { isLoading, setIsLoading } = useLoading();

  // Event handlers for password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Event handler for sprite selection
  const handleSpriteChange = (event) => {
    setSelectedSprite(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError(); // Clear any existing errors

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again');
      return;
    }

    // Set loading state to true to disable form submission
    setIsLoading(true);

    // Make a POST request to the API to create a new user
    try {
      const response = await axios.post(`${apiURL}/user/create`, {
        username,
        password,
        trainerName,
        trainerSprite: selectedSprite,
      });
      // Store the JWT token in local storage and navigate to the home page
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt);

      navigate('/home');
    } 
    // Catch any errors and set the error state
    catch (error) {
      console.error(error);
      setError(`An error occurred, please try again. ${error}`);
    } 
    // Set loading state to false after the request is complete
    finally {
      setIsLoading(false);
    }
  };

  return (
    // Form component with form fields and submit button
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Change flex direction based on screen size
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
          {/* Form fields for username, trainer name, password, and confirm password */}
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

          {/* Confirm password field with visibility toggle */}
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

        {/* Trainer sprite selection component */}
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
            {/* Options for selecting the trainer sprite, imported using external component */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel
                value="default_female"
                control={<Radio sx={{ display: 'none' }} />}
                label={
                  <SelectTrainerSprite
                    selectedSprite={selectedSprite}
                    spriteId="default_female"
                    staticSprite={femaleSprite}
                    animatedSprite={femaleSpriteAnimated}
                  />
                }
              />
              <FormControlLabel
                value="default_male"
                control={<Radio sx={{ display: 'none' }} />}
                label={
                  <SelectTrainerSprite
                    selectedSprite={selectedSprite}
                    spriteId="default_male"
                    staticSprite={maleSprite}
                    animatedSprite={maleSpriteAnimated}
                  />
                }
              />
            </Box>
          </RadioGroup>
        </Box>
      </Box>

      {/* Displays any errors if exists */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Submit button with loading spinner */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: { sm: '50%', md: '30%' }, marginTop: '10px' }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>

      {isLoading && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          Loading please wait...
        </Typography>
      )}

      {isLoading && (
        <img src={pikachuLoading} alt="Pikachu loading" style={{ marginTop: '20px', width: '100px', height: 'auto' }} />
      )}
      
    </Box>
  );
}
