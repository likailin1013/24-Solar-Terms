// EXPORTS: ICrop, MOCK_CROPS, getCropsByTermId
// 节气作物表（来自《岁时记》各模块细化设计文档 2.2）
import type { Season } from './solarTerms';

export interface ICropYield {
  /** 产出物名称（同时用于风物志收集 id：termId-名称） */
  name: string;
  count: number;
  /** 对应背包物品 id（items.ts） */
  itemId: string;
}

export interface ICrop {
  id: string;
  name: string;
  /** 可种植节气 id（solarTerms.ts 的节气 id） */
  termId: string;
  /** 可种植节气名称 */
  termName: string;
  season: Season;
  icon: string;
  /**
   * 实物生长周期（小时，参考设计文档 2.2 作物表 / 真实农时）。
   * 游戏内收获时间与实物一致：growthSec = growthHours × 3600，
   * 离线期间作物继续生长（plantedAt 时间戳持久化），回来即可收获。
   */
  growthHours: number;
  /** 游戏内生长耗时（秒）= 实物小时 × 3600。成熟后不收获不会枯萎。 */
  growthSec: number;
  /** 收获产出 */
  yields: ICropYield[];
  description: string;
}

export const MOCK_CROPS: ICrop[] = [
  { id: 'jiucai', name: '韭菜', termId: 'lichun', termName: '立春', season: 'spring', icon: '🥬', growthHours: 8, growthSec: 28800, yields: [{ name: '韭菜', count: 3, itemId: 'jiucai' }], description: '春韭一茬，鲜嫩无比' },
  { id: 'chunsun', name: '春笋', termId: 'lichun', termName: '立春', season: 'spring', icon: '🎍', growthHours: 24, growthSec: 86400, yields: [{ name: '春笋', count: 2, itemId: 'chunsun' }], description: '雨后春笋，破土而出' },
  { id: 'chacha', name: '春茶苗', termId: 'yushui', termName: '雨水', season: 'spring', icon: '🍃', growthHours: 48, growthSec: 172800, yields: [{ name: '茶叶', count: 5, itemId: 'chaye' }], description: '雨水润茶，芽尖初展' },
  { id: 'taoshu', name: '桃树苗', termId: 'jingzhe', termName: '惊蛰', season: 'spring', icon: '🌸', growthHours: 72, growthSec: 259200, yields: [{ name: '桃花', count: 3, itemId: 'taohua' }, { name: '桃子', count: 2, itemId: 'taozi' }], description: '桃之夭夭，灼灼其华' },
  { id: 'aicao', name: '艾草', termId: 'qingming', termName: '清明', season: 'spring', icon: '🌿', growthHours: 12, growthSec: 43200, yields: [{ name: '艾草', count: 4, itemId: 'aicao' }], description: '清明艾草，青团之魂' },
  { id: 'mudan', name: '牡丹', termId: 'guyu', termName: '谷雨', season: 'spring', icon: '🌺', growthHours: 48, growthSec: 172800, yields: [{ name: '牡丹花', count: 3, itemId: 'mudanhua' }], description: '谷雨看牡丹，花开动京城' },
  { id: 'lianou', name: '莲藕', termId: 'lixia', termName: '立夏', season: 'summer', icon: '🪷', growthHours: 72, growthSec: 259200, yields: [{ name: '莲子', count: 3, itemId: 'lianzi' }, { name: '藕', count: 2, itemId: 'ou' }], description: '小荷才露尖尖角' },
  { id: 'shuidao', name: '水稻', termId: 'mangzhong', termName: '芒种', season: 'summer', icon: '🌾', growthHours: 96, growthSec: 345600, yields: [{ name: '稻米', count: 6, itemId: 'daomi' }, { name: '稻草', count: 4, itemId: 'daocao' }], description: '芒种插秧，秋收满仓' },
  { id: 'xigua', name: '西瓜', termId: 'xiazhi', termName: '夏至', season: 'summer', icon: '🍉', growthHours: 36, growthSec: 129600, yields: [{ name: '西瓜', count: 3, itemId: 'xigua' }], description: '绿皮红瓤，消夏佳品' },
  { id: 'hehua', name: '荷花', termId: 'xiaoshu', termName: '小暑', season: 'summer', icon: '🪷', growthHours: 48, growthSec: 172800, yields: [{ name: '荷花', count: 3, itemId: 'hehua' }, { name: '荷叶', count: 4, itemId: 'heye' }], description: '出淤泥而不染' },
  { id: 'zaoshu', name: '枣树', termId: 'bailu', termName: '白露', season: 'autumn', icon: '🌳', growthHours: 72, growthSec: 259200, yields: [{ name: '枣', count: 5, itemId: 'zao' }], description: '白露打枣，脆甜可口' },
  { id: 'juhua', name: '菊花', termId: 'qiufen', termName: '秋分', season: 'autumn', icon: '🌼', growthHours: 24, growthSec: 86400, yields: [{ name: '菊花', count: 4, itemId: 'juhua' }], description: '采菊东篱下，悠然见南山' },
  { id: 'shizi', name: '柿子树', termId: 'shuangjiang', termName: '霜降', season: 'autumn', icon: '🍅', growthHours: 48, growthSec: 172800, yields: [{ name: '柿子', count: 4, itemId: 'shizi' }], description: '霜降摘柿，事事如意' },
  { id: 'baicai', name: '白菜', termId: 'lidong', termName: '立冬', season: 'winter', icon: '🥬', growthHours: 36, growthSec: 129600, yields: [{ name: '白菜', count: 4, itemId: 'baicai' }], description: '百菜不如白菜' },
  { id: 'lamei', name: '腊梅', termId: 'xiaoxue', termName: '小雪', season: 'winter', icon: '🌺', growthHours: 48, growthSec: 172800, yields: [{ name: '梅花', count: 3, itemId: 'meihua' }], description: '凌寒独自开' },
  { id: 'shuixian', name: '水仙', termId: 'dongzhi', termName: '冬至', season: 'winter', icon: '🌼', growthHours: 24, growthSec: 86400, yields: [{ name: '水仙', count: 3, itemId: 'shuixian' }], description: '凌波仙子，冬至花开' },
  // —— 手作材料作物 ——
  { id: 'zhuzi', name: '竹子', termId: 'chunfen', termName: '春分', season: 'spring', icon: '🎋', growthHours: 72, growthSec: 259200, yields: [{ name: '竹片', count: 4, itemId: 'zhupian' }], description: '春分栽竹，四时可取' },
  { id: 'huangma', name: '黄麻', termId: 'xiaoman', termName: '小满', season: 'summer', icon: '🧵', growthHours: 48, growthSec: 172800, yields: [{ name: '黄麻', count: 4, itemId: 'huangma' }], description: '小满种麻，秋后剥皮' },
  { id: 'fengbamu', name: '枫桦', termId: 'liqiu', termName: '立秋', season: 'autumn', icon: '🪵', growthHours: 96, growthSec: 345600, yields: [{ name: '枫桦木', count: 3, itemId: 'fengbamu' }], description: '枫桦成材，木质细密' },
];

/**
 * 将秒格式化为人类可读时长：
 * <60s → "45秒"；<1h → "12分30秒"；<24h → "8小时" / "8小时30分"；≥24h → "3天" / "3天5小时"
 */
export function formatGrowthTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  if (s < 60) return `${s}秒`;
  if (s < 3600) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return r > 0 ? `${m}分${r}秒` : `${m}分钟`;
  }
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h < 24) return m > 0 ? `${h}小时${m}分` : `${h}小时`;
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return rh > 0 ? `${d}天${rh}小时` : `${d}天`;
}

/** 获取某节气可种植的作物 */
export function getCropsByTermId(termId: string): ICrop[] {
  return MOCK_CROPS.filter((c) => c.termId === termId);
}

/** 按 id 查询作物 */
export function getCropById(cropId: string): ICrop | undefined {
  return MOCK_CROPS.find((c) => c.id === cropId);
}

export type CropStage = 'seed' | 'growing' | 'ripe';

/** 根据种植时间计算生长阶段：种子(<35%) → 生长(<100%) → 成熟(≥100%) */
export function getCropStage(crop: ICrop, plantedAt: number, now: number): CropStage {
  const elapsed = Math.max(0, now - plantedAt);
  const ratio = crop.growthSec > 0 ? elapsed / crop.growthSec : 1;
  if (ratio < 0.35) return 'seed';
  if (ratio < 1) return 'growing';
  return 'ripe';
}

/** 剩余成熟秒数（成熟返回 0） */
export function getCropRemainSec(crop: ICrop, plantedAt: number, now: number): number {
  const elapsedMs = Math.max(0, now - plantedAt);
  const remainMs = crop.growthSec * 1000 - elapsedMs;
  return Math.max(0, Math.ceil(remainMs / 1000));
}
