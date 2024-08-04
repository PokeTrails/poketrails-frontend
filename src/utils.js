/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} name - The string to capitalise.
 * @returns {string} - The capitalise string.
 */
export const capitaliseName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };