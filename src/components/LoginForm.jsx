import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Box, TextField, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Typography } from '@mui/material';
import pikachuLoading from '../assets/pikachu.gif';
import useError from '../hooks/useError';
import useLoading from '../hooks/useLoading';

export default function LoginForm() {
  // Add the API server URL
  const apiURL = import.meta.env.VITE_API_SERVER_URL;
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Add the useLoading and useError hooks
  const { isLoading, setIsLoading } = useLoading();
  const { error, setError, clearError } = useError();

  // Add the password visibility functions
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Add the handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();

    // Confirm password exists or return and error
    if (!password) {
      setError('Please enter a password');
      return;
    }

    // Set loading to true while the request is being made
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/login`, {
        username,
        password,
      });

      // Redirect to the home page and save JWT to localstorage if successful
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt);
      navigate('/home');

    } catch (error) {
      // Log the error to the console and set an error message
      console.error(error);
      setError('Invalid username or password.');

    } finally {
      // Set loading to false after the request is complete
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: "20px" }}
    >
      {/* Username Field */}
      <TextField
        label="Username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
      />

      {/* Password Field */}
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
      

      {/* Display error message if there is one */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}


      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="contained" 
        size="medium" 
        sx={{ width: "60%", marginTop: "10px" }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Log In'}
      </Button>



      {/* Loading Pikachu image if isLoading is True */}
      {isLoading && (
        <img src={pikachuLoading} alt="Pikachu loading" style={{ marginTop: '20px', width: '100px', height: 'auto' }} />
      )}

      {/* Loading message if isLoading is True */}
      {isLoading && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          Loading please wait...
        </Typography>
      )}
    </Box>
  );
}
