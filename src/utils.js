/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} name - The string to capitalise.
 * @returns {string} - The capitalise string.
 */
export const capitaliseName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };


/**
 * Formats a time in milliseconds to HH:MM:SS format.
 * @param {number} milliseconds - The time to format in milliseconds.
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