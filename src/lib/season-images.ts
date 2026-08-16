// EXPORTS: getSeasonImage, SEASON_IMAGES, HERO_IMAGE, CHARACTER_IMAGE

import type { Season } from '@/data/solarTerms';

export const SEASON_IMAGES: Record<Season, string> = {
  spring: 'https://aka.doubaocdn.com/s/eULyEuMGM6',
  summer: 'https://aka.doubaocdn.com/s/YyUneSk0UZ',
  autumn: 'https://aka.doubaocdn.com/s/UzHBiAydmv',
  winter: 'https://aka.doubaocdn.com/s/jWF1bnnjjL',
};

export const HERO_IMAGE = 'https://aka.doubaocdn.com/s/JmSj2VsXon';
export const CHARACTER_IMAGE = 'https://aka.doubaocdn.com/s/BUKxK8Iri9';

export function getSeasonImage(season: Season): string {
  return SEASON_IMAGES[season];
}
