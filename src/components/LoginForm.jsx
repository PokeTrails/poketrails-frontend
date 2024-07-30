import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Box, TextField, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Typography } from '@mui/material';

export default function LoginForm() {
  const apiURL = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!password) {
      setError('Please enter a password');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/login`, {
        username,
        password,
      });
      
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt);
      
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError('Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form"
    onSubmit={handleSubmit}
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: "20px" }}>
        <TextField
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ m: 1, width: '25ch' }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
        
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          size="medium" 
          sx={{ width: "60%", marginTop: "10px" }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Log In'}
        </Button>
    </Box>
  );
}
