/**
 * Image utility functions for handling and validating image URLs
 */

/**
 * Checks if the URL points to a supported image format
 * @param {string} url - The image URL to check
 * @returns {boolean} True if format is supported
 */
export function isSupportedImageFormat(url) {
  if (!url) return false;
  const unsupported = [".tiff", ".tif", ".bmp", ".raw", ".psd", ".ai"];
  const lower = url.toLowerCase();
  return !unsupported.some((ext) => lower.includes(ext));
}

/**
 * Returns a safe image URL or null if invalid/unsupported
 * Converts http to https for security
 * @param {string} url - The image URL to process
 * @returns {string|null} Safe URL or null
 */
export function safeImageUrl(url) {
  if (!url || typeof url !== "string") return null;
  if (!isSupportedImageFormat(url)) return null;
  if (url.startsWith("http://")) return "https://" + url.slice(7);
  return url;
}
