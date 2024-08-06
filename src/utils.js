/**
 * Capitalizes the first letter of a string and converts the rest to lowercase. (Single word)
 * @param {string} name - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitaliseName = (name) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};