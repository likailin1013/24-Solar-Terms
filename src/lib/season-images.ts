// EXPORTS: getSeasonImage, SEASON_IMAGES, HERO_IMAGE, CHARACTER_IMAGE
//
// 独立部署：从旧版飞书/ByteDance 资源（aka.doubaocdn.com 短链）下载的原始
// 水墨淡彩图片，已本地化为 public/images/ 下的 JPEG，不再依赖任何外部/私有域。

import type { Season } from '@/data/solarTerms';

export const SEASON_IMAGES: Record<Season, string> = {
  spring: '/images/season-spring.jpg',
  summer: '/images/season-summer.jpg',
  autumn: '/images/season-autumn.jpg',
  winter: '/images/season-winter.jpg',
};

export const HERO_IMAGE = '/images/hero.jpg';
export const CHARACTER_IMAGE = '/images/character.jpg';

export function getSeasonImage(season: Season): string {
  return SEASON_IMAGES[season];
}
