// EXPORTS: SeasonKey, SEASON_COLORS, SEASON_LABEL, getSeasonFromTerm, getParticleType
export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonPalette {
  /** 页面主背景色（从浅到深渐变的起点） */
  bgFrom: string;
  /** 页面主背景色（渐变终点） */
  bgTo: string;
  /** 庭院主色调（地面/山体） */
  gardenBase: string;
  /** 强调色（按钮/印章） */
  accent: string;
  /** 文字主色 */
  textMain: string;
  /** 文字辅色 */
  textMuted: string;
  /** 粒子颜色（花瓣/叶片/雪花） */
  particle: string;
  /** 边框色 */
  border: string;
}

export const SEASON_COLORS: Record<SeasonKey, SeasonPalette> = {
  spring: {
    bgFrom: '#f7f3e9',
    bgTo: '#e8efdc',
    gardenBase: '#c9dbb5',
    accent: '#d46b52',
    textMain: '#3d3a33',
    textMuted: '#7a7569',
    particle: '#f5b8b8',
    border: '#c9bfa8',
  },
  summer: {
    bgFrom: '#eef3f0',
    bgTo: '#dce8e0',
    gardenBase: '#a8c5b0',
    accent: '#d97757',
    textMain: '#2f3a34',
    textMuted: '#6a7a70',
    particle: '#b8d4c0',
    border: '#b5c5b8',
  },
  autumn: {
    bgFrom: '#f5ede0',
    bgTo: '#e8d8b8',
    gardenBase: '#d4b88a',
    accent: '#b8452f',
    textMain: '#3d3329',
    textMuted: '#7a6a55',
    particle: '#d49657',
    border: '#c9ad80',
  },
  winter: {
    bgFrom: '#f2f3f5',
    bgTo: '#e0e4ea',
    gardenBase: '#d0d5dc',
    accent: '#8b3a3a',
    textMain: '#333740',
    textMuted: '#707780',
    particle: '#ffffff',
    border: '#c0c5cc',
  },
};

export const SEASON_LABEL: Record<SeasonKey, string> = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
};

export const SEASON_ORDER: SeasonKey[] = ['spring', 'summer', 'autumn', 'winter'];

export type ParticleType = 'petal' | 'leaf' | 'firefly' | 'snow';

export const SEASON_PARTICLE: Record<SeasonKey, ParticleType> = {
  spring: 'petal',
  summer: 'firefly',
  autumn: 'leaf',
  winter: 'snow',
};
