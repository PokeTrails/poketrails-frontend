import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch item details
function useGetItemDetails(itemID) {
  const [itemData, setItemData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch item details when itemID changes
  useEffect(() => {
    if (!itemID) {
      setItemData(null);
      setError('No item selected.');
      return;
    }

    const jwt = localStorage.getItem('jwt');
    const apiURL = `${import.meta.env.VITE_API_SERVER_URL}`;

    const fetchItemDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiURL}/store/view/${itemID}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        setItemData(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching item data:', err);
        setError('Failed to fetch item data.');
        setItemData(null); // Clear item data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemID]);

  return { itemData, error, isLoading };
}

export default useGetItemDetails;
