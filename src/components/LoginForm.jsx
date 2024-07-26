import * as React from 'react';
import { useState } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';

const apiURL = import.meta.env.VITE_API_SERVER_URL;

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password) {
      alert('Please enter a password');
      return;
    }
    try {
      const response = await axios.post(`${apiURL}/login`, {
        username,
        password,
      });
      console.log(response.data);
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert(error);
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
        <Button type="submit" variant="contained" size="medium" sx={{width: "60%", marginTop: "10px"}}>Log In</Button>
    </Box>
  );
}