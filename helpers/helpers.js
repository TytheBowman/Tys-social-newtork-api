/**
 * Returns the numerical ID of a MongoDB ObjectId as a string.
 * @param {ObjectId} id - The MongoDB ObjectId to trim.
 * @returns {string} - The numerical ID as a string.
 */
 const trimId = (id) => {
    // Convert the ObjectId to a JSON string and extract the substring
    // between the first occurrence of '(' and the first occurrence of ')'.
    const idString = JSON.stringify(id);
    const substring = idString.substring(idString.indexOf('(') + 1, idString.indexOf(')'));
    
    // Remove the first and last characters of the substring to get the numerical ID.
    const numericalId = substring.slice(1, -1);
    return numericalId;
  };
  
  /**
   * Formats a date string to a localized string representation.
   * @param {Date|string} date - The date to format, as a Date object or a string.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (date) => {
    // Convert the input date to a Date object and format it as a localized string.
    const formattedDate = new Date(date).toLocaleString('en', { timeZoneName: 'short' });
    return formattedDate;
  };
  
  // Export the helper functions as properties of an object.
  module.exports = {
    trimId,
    formatDate
  };
  