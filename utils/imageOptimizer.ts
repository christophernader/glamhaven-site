/**
 * Utility functions for optimizing image loading and processing
 */

/**
 * Generates optimized image URL with appropriate quality and format parameters
 * @param url Original image URL
 * @param width Desired width
 * @param quality Image quality (1-100)
 * @param format Image format (webp, avif, etc.)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  url: string,
  width: number = 800,
  quality: number = 80,
  format: 'webp' | 'avif' | 'auto' = 'webp'
): string => {
  // Handle Unsplash images
  if (url.includes('unsplash.com')) {
    // Unsplash optimization parameters
    return `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=${quality}&fm=${format === 'auto' ? 'webp' : format}&fit=crop`;
  }
  
  // Handle Pexels images
  if (url.includes('pexels.com')) {
    // Pexels optimization parameters
    return `${url}${url.includes('?') ? '&' : '?'}w=${width}&cs=srgb&q=${quality}`;
  }
  
  // Handle Pixabay images
  if (url.includes('pixabay.com')) {
    // Pixabay optimization parameters
    return `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=${quality}`;
  }
  
  // Handle Freepik images
  if (url.includes('freepik.com')) {
    // Freepik optimization parameters
    return `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=${quality}`;
  }
  
  // Default case - return original URL
  return url;
};

/**
 * Generates responsive image sizes for srcSet
 * @param url Base image URL
 * @param sizes Array of sizes to generate
 * @param quality Image quality
 * @param format Image format
 * @returns String with srcSet attribute value
 */
export const generateSrcSet = (
  url: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536, 1920],
  quality: number = 80,
  format: 'webp' | 'avif' | 'auto' = 'webp'
): string => {
  return sizes
    .map(size => `${getOptimizedImageUrl(url, size, quality, format)} ${size}w`)
    .join(', ');
};

/**
 * Determines if an image should be lazy loaded based on its position
 * @param index Position index of the image
 * @param threshold Number of images to eagerly load
 * @returns Loading strategy ('eager' or 'lazy')
 */
export const getLoadingStrategy = (
  index: number,
  threshold: number = 3
): 'eager' | 'lazy' => {
  return index < threshold ? 'eager' : 'lazy';
};

/**
 * Calculates appropriate sizes attribute for responsive images
 * @param defaultSize Default size as percentage or pixels
 * @returns Sizes attribute string
 */
export const getResponsiveSizes = (
  defaultSize: string = '100vw'
): string => {
  return `
    (max-width: 640px) 100vw,
    (max-width: 768px) 80vw,
    (max-width: 1024px) 60vw,
    ${defaultSize}
  `.trim();
};

/**
 * Generates a low-quality image placeholder URL
 * @param url Original image URL
 * @returns Low quality placeholder URL
 */
export const getLowQualityPlaceholder = (url: string): string => {
  return getOptimizedImageUrl(url, 20, 20, 'webp');
}; 