import { useState } from 'react';
import axios from 'axios';

export default function useHatchPokemon(apiURL, pokemonID, jwt) {
  const [isHatching, setIsHatching] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleHatchClick = async () => {
    setIsHatching(true);
    try {
      const response = await axios.patch(`${apiURL}/pokemon/hatch/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setPopupData(response.data);
      setShowPopup(true);
    } catch (err) {
      console.error('Failed to hatch Pokémon:', err);
    } finally {
      setIsHatching(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload(); // Reload the page to get updated party data
  };

  return {
    isHatching,
    popupData,
    showPopup,
    handleHatchClick,
    handleClosePopup,
  };
}
