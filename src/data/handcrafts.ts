// EXPORTS: IHandcraft, MOCK_HANDCRAFTS

export interface IHandcraft {
  id: string;
  name: string;
  description: string;
  icon: string;
  materials: string[];
  difficulty: '易' | '中' | '难';
  season: string;
  canPlace: boolean;
}

export const MOCK_HANDCRAFTS: IHandcraft[] = [
  {
    id: 'zhiyuan',
    name: '扎纸鸢',
    description: '以竹为骨，以纸为面，扎一只燕子纸鸢，放飞于春风之中。',
    icon: '🪁',
    materials: ['竹篾', '棉纸', '浆糊', '丝线'],
    difficulty: '中',
    season: 'spring',
    canPlace: true,
  },
  {
    id: 'bianzhulan',
    name: '编竹篮',
    description: '取山间青竹，劈作细篾，编织一只精巧的竹篮。',
    icon: '🧺',
    materials: ['竹篾', '藤条', '剪刀'],
    difficulty: '难',
    season: 'summer',
    canPlace: true,
  },
  {
    id: 'keyinzhang',
    name: '刻印章',
    description: '取一方寿山石，精心雕琢，刻一枚属于自己的朱砂印。',
    icon: '🔴',
    materials: ['寿山石', '刻刀', '印泥', '砂纸'],
    difficulty: '难',
    season: 'autumn',
    canPlace: false,
  },
  {
    id: 'zuohuadeng',
    name: '做花灯',
    description: '竹架纸糊，绘上山水花鸟，点亮一盏上元花灯。',
    icon: '🏮',
    materials: ['竹篾', '宣纸', '颜料', '蜡烛'],
    difficulty: '中',
    season: 'winter',
    canPlace: true,
  },
  {
    id: 'zhixiangnang',
    name: '制香囊',
    description: '取各色香草，缝入锦缎囊中，随身佩戴以驱邪避秽。',
    icon: '👝',
    materials: ['锦缎', '艾草', '香囊草', '丝线'],
    difficulty: '易',
    season: 'summer',
    canPlace: false,
  },
  {
    id: 'zuoshuqian',
    name: '制书签',
    description: '取竹片刻字，或以彩纸绘制，做一枚雅致的书签。',
    icon: '🔖',
    materials: ['竹片', '颜料', '细笔', '流苏'],
    difficulty: '易',
    season: 'autumn',
    canPlace: false,
  },
  {
    id: 'biancaoxie',
    name: '编草鞋',
    description: '以稻草编织，轻便耐磨，是山野漫步的良伴。',
    icon: '🥿',
    materials: ['稻草', '麻绳', '木楦'],
    difficulty: '中',
    season: 'spring',
    canPlace: false,
  },
  {
    id: 'shaotaoqi',
    name: '烧陶器',
    description: '取山中陶土，手制坯胎，入窑烧制一件茶盏或陶罐。',
    icon: '🏺',
    materials: ['陶土', '转盘', '窑火', '釉料'],
    difficulty: '难',
    season: 'winter',
    canPlace: true,
  },
  {
    id: 'zuochazi',
    name: '做茶筅',
    description: '选取细竹，劈作百丝，制成一把点茶用的茶筅。',
    icon: '🧹',
    materials: ['细竹', '丝线', '利刃'],
    difficulty: '中',
    season: 'summer',
    canPlace: false,
  },
  {
    id: 'zhibijian',
    name: '制笔笺',
    description: '自制信纸信封，绘上山水花鸟，寄给远方的友人。',
    icon: '📜',
    materials: ['宣纸', '颜料', '毛笔', '信封'],
    difficulty: '易',
    season: 'spring',
    canPlace: false,
  },
];
