/**
 * Deterministically assigns a realistic photo to a homestay based on its id/name,
 * so the same homestay always shows the same picture (instead of one
 * hardcoded image being reused everywhere).
 *
 * Primary source: LoremFlickr (keyword-based real photos from Flickr).
 * Fallback source: Picsum (guaranteed-to-load stable photo service),
 * used automatically via onError if the primary image fails to load.
 */

const KEYWORD_SETS = [
  "cottage,rural",
  "farmhouse,mountain",
  "cabin,forest",
  "village,house",
  "countryside,home",
  "homestay,nature",
  "hut,himalaya",
  "guesthouse,garden",
];

function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getHomestayImage(id: number | string, name?: string): string {
  const key = `${id}-${name ?? ""}`;
  const hash = hashKey(key);
  const keywords = KEYWORD_SETS[hash % KEYWORD_SETS.length];
  return `https://loremflickr.com/800/600/${keywords}?lock=${hash}`;
}

export function getHomestayImageFallback(id: number | string): string {
  return `https://picsum.photos/seed/homestay-${id}/800/600`;
}
