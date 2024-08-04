import { useState } from 'react';
import axios from 'axios';

export default function useEvolvePokemon(apiURL, pokemonID, jwt) {
  const [isEvolving, setIsEvolving] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleEvolveClick = async () => {
    setIsEvolving(true);
    try {
      const response = await axios.patch(`${apiURL}/pokemon/evolve/${pokemonID}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setPopupData(response.data);
      setShowPopup(true);
    } catch (err) {
      console.error('Failed to evolve Pokémon:', err);
    } finally {
      setIsEvolving(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload(); // Reload the page to get updated party data
  };

  return {
    isEvolving,
    popupData,
    showPopup,
    handleEvolveClick,
    handleClosePopup,
  };
}
