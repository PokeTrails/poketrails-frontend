import { useState } from 'react';

function usePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const openPopup = (data) => {
    setPopupData(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    window.location.reload();
    setPopupData(null);
  };

  return {
    showPopup,
    popupData,
    openPopup,
    closePopup,
  };
}

export default usePopup;
