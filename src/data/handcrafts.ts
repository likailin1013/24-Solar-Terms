// EXPORTS: IHandcraft, MOCK_HANDCRAFTS
// 手作器物：制作需消耗背包材料（recipe: 物品id → 数量）
// 材料链示例：水稻→稻草；黄麻→麻绳；枫桦木→木楦；稻草+黄麻+麻绳+木楦→编草鞋

export interface IHandcraft {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** 配方：背包物品 id（items.ts）→ 所需数量 */
  recipe: Record<string, number>;
  difficulty: '易' | '中' | '难';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  canPlace: boolean;
}

export const MOCK_HANDCRAFTS: IHandcraft[] = [
  // —— 加工材料（半成品） ——
  { id: 'masheng', name: '麻绳', description: '黄麻搓成的结实麻绳，捆扎编织皆宜', icon: '🪢', recipe: { huangma: 3 }, difficulty: '易', season: 'summer', canPlace: false },
  { id: 'muxuan', name: '木楦', description: '枫桦木削成的鞋楦，编鞋定型之用', icon: '🪵', recipe: { fengbamu: 2 }, difficulty: '易', season: 'autumn', canPlace: false },
  { id: 'zhumi', name: '竹篾', description: '青竹剖成的细篾条，编织器物的筋骨', icon: '🎋', recipe: { zhupian: 2 }, difficulty: '易', season: 'spring', canPlace: false },
  { id: 'zhi', name: '纸', description: '稻草沤浆晾晒而成的宣纸', icon: '📜', recipe: { daocao: 2 }, difficulty: '易', season: 'autumn', canPlace: false },
  { id: 'maxian', name: '麻线', description: '细麻纺成的线，缝纫牵鸢皆可', icon: '🪡', recipe: { huangma: 2 }, difficulty: '易', season: 'summer', canPlace: false },
  { id: 'xiangliao', name: '香料', description: '艾草与菊花合制的清香香料', icon: '🌸', recipe: { aicao: 2 }, difficulty: '易', season: 'autumn', canPlace: false },

  // —— 器物 ——
  { id: 'biancaoxie', name: '编草鞋', description: '稻草为底、黄麻为系、麻绳纳底、木楦定型，一双踏遍山野的草鞋', icon: '🥿', recipe: { daocao: 1, huangma: 1, masheng: 1, muxuan: 1 }, difficulty: '中', season: 'summer', canPlace: false },
  { id: 'zhizhiyuan', name: '扎纸鸢', description: '竹骨纸面，春风一放上青云', icon: '🪁', recipe: { zhupian: 2, zhi: 1, maxian: 1 }, difficulty: '中', season: 'spring', canPlace: true },
  { id: 'bianzhulan', name: '编竹篮', description: '细篾编就，采花摘果皆相宜', icon: '🧺', recipe: { zhumi: 3 }, difficulty: '中', season: 'spring', canPlace: true },
  { id: 'keyinzhang', name: '刻印章', description: '一方青石，刻一枚朱砂私印', icon: '🔴', recipe: { shiliao: 1, fengbamu: 1 }, difficulty: '难', season: 'winter', canPlace: false },
  { id: 'zuohuadeng', name: '做花灯', description: '纸糊竹扎、烛火摇曳，佳节高悬', icon: '🏮', recipe: { zhi: 2, zhupian: 1, lazhu: 1 }, difficulty: '中', season: 'winter', canPlace: true },
  { id: 'zhixiangnang', name: '制香囊', description: '素布缝囊，填入艾草香料，随身佩带', icon: '👝', recipe: { bu: 1, aicao: 2 }, difficulty: '易', season: 'summer', canPlace: false },
  { id: 'zuoshuqian', name: '做书签', description: '桃花夹纸，一枚雅致的书签', icon: '🔖', recipe: { taohua: 2, zhi: 1 }, difficulty: '易', season: 'spring', canPlace: false },
  { id: 'shaotaoqi', name: '烧陶器', description: '石料研土、稻草烧窑，窑火里出一件陶器', icon: '🏺', recipe: { shiliao: 1, daocao: 2 }, difficulty: '难', season: 'winter', canPlace: true },
  { id: 'zuochazi', name: '做茶筅', description: '细竹劈丝，点茶搅沫的茶筅', icon: '🧹', recipe: { zhupian: 2 }, difficulty: '中', season: 'summer', canPlace: false },
  { id: 'zhibijian', name: '制笔笺', description: '宣纸裁笺，绘梅题字，寄与远人', icon: '📜', recipe: { zhi: 2, meihua: 1 }, difficulty: '易', season: 'spring', canPlace: false },
  { id: 'zhuafengling', name: '竹风铃', description: '竹管悬檐，风过处泠泠作响', icon: '🎐', recipe: { zhupian: 2, maxian: 1 }, difficulty: '易', season: 'summer', canPlace: true },
  { id: 'meihuazhuang', name: '梅花桩', description: '枫桦立桩，冬日习武赏梅两相宜', icon: '🥋', recipe: { fengbamu: 2, meihua: 1 }, difficulty: '中', season: 'winter', canPlace: true },
  { id: 'liangshaijia', name: '晾晒架', description: '竹架麻绳，晒秋晾物最合用', icon: '🪜', recipe: { zhupian: 2, masheng: 1 }, difficulty: '易', season: 'autumn', canPlace: true },
  { id: 'chajutai', name: '茶具台', description: '枫桦为台，置壶承盏，茶香四溢', icon: '🫖', recipe: { fengbamu: 2, chaye: 1 }, difficulty: '中', season: 'autumn', canPlace: true },
  { id: 'chunlian', name: '春联', description: '红纸墨字，桃符换新迎新春', icon: '🧧', recipe: { zhi: 2, taohua: 1 }, difficulty: '易', season: 'winter', canPlace: true },
  { id: 'hedeng', name: '河灯', description: '纸竹为灯、烛火为芯，放灯祈愿', icon: '🪔', recipe: { zhi: 2, zhupian: 1, lazhu: 1 }, difficulty: '中', season: 'autumn', canPlace: true },
  { id: 'diaoyudeng', name: '钓鱼凳', description: '枫桦小凳，溪边垂钓一坐半日', icon: '🪑', recipe: { fengbamu: 2 }, difficulty: '易', season: 'summer', canPlace: true },
  { id: 'shidenglong', name: '石灯笼', description: '青石为灯，夜来烛影映庭院', icon: '🪨', recipe: { shiliao: 2 }, difficulty: '难', season: 'winter', canPlace: true },
  { id: 'yaozhen', name: '药枕', description: '布裹药草，枕之安神助眠', icon: '🛏️', recipe: { bu: 1, caoyao: 3 }, difficulty: '中', season: 'autumn', canPlace: false },
];
