/**
 * Slices the input text if it exceeds a certain length.
 *
 * @param {string} text - The input text to be sliced.
 * @param {number} [maxText=50] - The maximum number of characters allowed before truncation (optional, default is 50).
 * @returns {string} - Returns the sliced text with "..." if it exceeds maxText, otherwise returns the original text.
 */
export function textSlicer(text: string, maxText: number = 50): string {
    if (text.length >= maxText) return `${text.slice(0, maxText)} ...`;
    return text;
  }
  