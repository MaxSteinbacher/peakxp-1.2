/**
 * Shared high-quality resort images used as defaults for resorts without personalized photos.
 * These replace generic picsum.photos placeholders.
 */
export const RESORT_PHOTOS = [
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b3a2eae8b_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c7cc25995_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d2df41599_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/ef26d56a0_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/c533f5b07_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/695afbaa8_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f84f2332a_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/ececebd12_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f3fe9ca47_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/3c7a9d2b0_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/e55927b18_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/dd67aeae5_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b31f4d590_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/1d23fbe0f_image.png",
  "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f01644815_image.png",
];

/**
 * Get the default image for a resort by index (rotating through all 15 photos).
 * @param {number} index - The resort's index in the full resorts list
 * @returns {string} Image URL
 */
export function getDefaultResortImage(index) {
  return RESORT_PHOTOS[index % RESORT_PHOTOS.length];
}

/**
 * Get a set of 3 default images for a resort, starting at the given index.
 */
export function getDefaultResortImages(index) {
  return [0, 1, 2].map(i => RESORT_PHOTOS[(index + i) % RESORT_PHOTOS.length]);
}