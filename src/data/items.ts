// EXPORTS: IItem, ItemCategory, MOCK_ITEMS, getItemById, BASE_MATERIAL_IDS
// 背包物品表：作物收成 / 基础材料 / 加工制品 / 访客赠礼
// 来源渠道：种植收获（crops.ts 产出）、节气活动收集、手作合成、访客赠送

export type ItemCategory = 'crop' | 'material' | 'crafted' | 'gift';

export interface IItem {
  id: string;
  name: string;
  icon: string;
  category: ItemCategory;
  /** 一句话说明 */
  description: string;
  /** 来源说明（展示用） */
  source: string;
}

export const MOCK_ITEMS: IItem[] = [
  // —— 作物收成（crop）：由菜畦种植收获 ——
  { id: 'jiucai', name: '韭菜', icon: '🥬', category: 'crop', description: '春韭一茬，鲜嫩无比', source: '立春种植韭菜收获' },
  { id: 'chunsun', name: '春笋', icon: '🎍', category: 'crop', description: '雨后春笋，破土而出', source: '立春种植春笋收获' },
  { id: 'chaye', name: '茶叶', icon: '🍃', category: 'crop', description: '谷雨前后采摘的嫩茶芽', source: '雨水种植春茶苗收获' },
  { id: 'taohua', name: '桃花', icon: '🌸', category: 'crop', description: '灼灼其华，春之信使', source: '惊蛰种植桃树苗收获' },
  { id: 'taozi', name: '桃子', icon: '🍑', category: 'crop', description: '夏果初熟，甘甜多汁', source: '惊蛰种植桃树苗收获' },
  { id: 'aicao', name: '艾草', icon: '🌿', category: 'crop', description: '清明艾草，青团之魂', source: '清明种植艾草收获' },
  { id: 'mudanhua', name: '牡丹花', icon: '🌺', category: 'crop', description: '国色天香，花开动京城', source: '谷雨种植牡丹收获' },
  { id: 'lianzi', name: '莲子', icon: '🪷', category: 'crop', description: '清心莲子，夏日消暑', source: '立夏种植莲藕收获' },
  { id: 'ou', name: '藕', icon: '🥒', category: 'crop', description: '出淤泥而不染，脆嫩清甜', source: '立夏种植莲藕收获' },
  { id: 'daomi', name: '稻米', icon: '🍚', category: 'crop', description: '芒种插秧，秋收满仓', source: '芒种种植水稻收获' },
  { id: 'daocao', name: '稻草', icon: '🌾', category: 'crop', description: '稻收后的秸秆，可编草鞋、造纸', source: '芒种种植水稻收获' },
  { id: 'xigua', name: '西瓜', icon: '🍉', category: 'crop', description: '绿皮红瓤，消夏佳品', source: '夏至种植西瓜收获' },
  { id: 'hehua', name: '荷花', icon: '🪷', category: 'crop', description: '映日荷花别样红', source: '小暑种植荷花收获' },
  { id: 'heye', name: '荷叶', icon: '🍀', category: 'crop', description: '碧圆荷叶，可裹茶点', source: '小暑种植荷花收获' },
  { id: 'zao', name: '枣', icon: '🍒', category: 'crop', description: '白露打枣，脆甜可口', source: '白露种植枣树收获' },
  { id: 'juhua', name: '菊花', icon: '🌼', category: 'crop', description: '采菊东篱下，悠然见南山', source: '秋分种植菊花收获' },
  { id: 'shizi', name: '柿子', icon: '🍅', category: 'crop', description: '霜降摘柿，事事如意', source: '霜降种植柿子树收获' },
  { id: 'baicai', name: '白菜', icon: '🥗', category: 'crop', description: '百菜不如白菜', source: '立冬种植白菜收获' },
  { id: 'meihua', name: '梅花', icon: '🏵️', category: 'crop', description: '凌寒独自开，暗香浮动', source: '小雪种植腊梅收获' },
  { id: 'shuixian', name: '水仙', icon: '🪴', category: 'crop', description: '凌波仙子，冬至花开', source: '冬至种植水仙收获' },
  { id: 'huangma', name: '黄麻', icon: '🧵', category: 'crop', description: '麻杆纤维，搓麻绳的好材料', source: '小满种植黄麻收获' },
  { id: 'fengbamu', name: '枫桦木', icon: '🪵', category: 'crop', description: '枫桦成材，木质细密', source: '立秋种植枫桦收获' },
  { id: 'zhupian', name: '竹片', icon: '🎋', category: 'crop', description: '青竹剖片，编器制物', source: '春分种植竹子收获' },

  // —— 基础材料（material）：节气活动收集 / 访客赠送 ——
  { id: 'bu', name: '布', icon: '🧣', category: 'material', description: '一方素布，可缝香囊', source: '节气活动收集或访客相赠' },
  { id: 'shiliao', name: '石料', icon: '🪨', category: 'material', description: '溪边青石，可刻印垒灯', source: '节气活动收集或访客相赠' },
  { id: 'lazhu', name: '蜡烛', icon: '🕯️', category: 'material', description: '山外带来的蜡烛，照明点灯', source: '节气活动收集或货郎相赠' },
  { id: 'caoyao', name: '药草', icon: '🌿', category: 'material', description: '山间采得或郎中相赠的药草', source: '节气活动收集或郎中相赠' },

  // —— 加工制品（crafted）：手工作坊用原材料合成 ——
  { id: 'masheng', name: '麻绳', icon: '🪢', category: 'crafted', description: '黄麻搓成的结实麻绳', source: '手工作坊：黄麻 ×3 合成' },
  { id: 'muxuan', name: '木楦', icon: '🪵', category: 'crafted', description: '枫桦木削成的鞋楦', source: '手工作坊：枫桦木 ×2 合成' },
  { id: 'zhumi', name: '竹篾', icon: '🎋', category: 'crafted', description: '青竹剖成的细篾条', source: '手工作坊：竹片 ×2 合成' },
  { id: 'zhi', name: '纸', icon: '📜', category: 'crafted', description: '稻草沤浆制成的宣纸', source: '手工作坊：稻草 ×2 合成' },
  { id: 'maxian', name: '麻线', icon: '🪡', category: 'crafted', description: '细麻纺成的线，缝纫牵鸢', source: '手工作坊：黄麻 ×2 合成' },
  { id: 'xiangliao', name: '香料', icon: '🌸', category: 'crafted', description: '艾草与菊花合制的香料', source: '手工作坊：艾草 ×2 合成' },

  // —— 访客赠礼（gift）：好感度满后访客相赠 ——
  { id: 'mingeji', name: '民歌集', icon: '📖', category: 'gift', description: '采诗官云游收集的四时歌谣', source: '采诗官好感满赠予' },
  { id: 'huajuan', name: '山水画卷', icon: '🖼️', category: 'gift', description: '画师笔下的一幅山水小景', source: '云游画师好感满赠予' },
  { id: 'qinpu', name: '琴谱', icon: '🎼', category: 'gift', description: '《高山流水》曲谱一册', source: '琴师好感满赠予' },
  { id: 'mingcha', name: '名茶', icon: '🍵', category: 'gift', description: '茶圣私藏的一罐好茶', source: '茶圣好感满赠予' },
  { id: 'baiyuqi', name: '白玉棋', icon: '⚪', category: 'gift', description: '一副温润的白玉棋子', source: '棋士好感满赠予' },
  { id: 'qihua', name: '奇花', icon: '🌷', category: 'gift', description: '花娘子培育的罕见名花', source: '花娘子好感满赠予' },
];

/** 按 id 查询物品 */
export function getItemById(itemId: string): IItem | undefined {
  return MOCK_ITEMS.find((i) => i.id === itemId);
}

/** 节气活动完成时可随机收集的基础材料（"收集"渠道） */
export const BASE_MATERIAL_IDS = ['bu', 'shiliao', 'lazhu', 'caoyao'];
