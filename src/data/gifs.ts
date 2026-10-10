import type { ImageMetadata } from 'astro';
import layerMap from './gif-layers.json';

// Coordinates are relative to each original PNG export, including shadows.
// Crop transforms use rendered axes; HUA's rotated phone fills are normalized.

export interface GifLayer {
  node: string;
  hash: string;
  x: number;
  y: number;
  w: number;
  h: number;
  radius: number;
  sourceWidth: number;
  sourceHeight: number;
  mode: string;
  transform?: number[][];
}

const posters = import.meta.glob<ImageMetadata>('../assets/{cases,heroes,home,iteration,workflows}/**/*.png', { eager: true, import: 'default' });
const gifs = import.meta.glob<string>('../assets/gifs/*.gif', { eager: true, query: '?url', import: 'default' });
const stills = import.meta.glob<ImageMetadata>('../assets/gif-posters/*.png', { eager: true, import: 'default' });
const layers = new Map(Object.entries(posters).map(([path, image]) => [image.src, (layerMap as Record<string, GifLayer[]>)[path.replace('../assets/', '')] ?? []]));

export const gifLayersFor = (image: ImageMetadata) => layers.get(image.src) ?? [];
// Three earlier source downloads contain GIF bytes despite their .png extension.
export const gifPosterFor = (image: ImageMetadata) => stills[`../assets/gif-posters/${gifLayersFor(image)[0]?.hash}.png`] ?? image;
export const gifUrl = (hash: string) => {
  const url = gifs[`../assets/gifs/${hash}.gif`];
  if (!url) throw new Error(`Missing original Figma GIF: ${hash}`);
  return url;
};
