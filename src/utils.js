/**
 * Capitalizes the first letter of a string and converts the rest to lowercase. (Single word)
 * @param {string} name - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitaliseName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

/**
  * Formats a time in milliseconds to a string in the format 'HH:MM:SS'.
 * @param {number} milliseconds - The time in milliseconds.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (milliseconds) => {
  if (milliseconds <= 0) return '00:00:00';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
