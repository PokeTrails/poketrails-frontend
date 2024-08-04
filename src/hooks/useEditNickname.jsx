import { useState } from 'react';
import axios from 'axios';

export default function useEditNickname(apiURL, pokemonID, jwt, setPokemonData) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const handleEditClick = (currentNickname) => {
    setNewNickname(currentNickname || '');
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!newNickname) return;

    try {
      await axios.patch(`${apiURL}/pokemon/nickname/${pokemonID}`, { nickname: newNickname }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setPokemonData((prevData) => ({ ...prevData, nickname: newNickname }));
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update nickname:', err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    newNickname,
    setNewNickname,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  };
}
