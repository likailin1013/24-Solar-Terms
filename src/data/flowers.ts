// EXPORTS: IFlower, MOCK_FLOWERS

export interface IFlower {
  id: string;
  name: string;
  description: string;
  icon: string;
  season: string;
  bloomTime: string;
}

export const MOCK_FLOWERS: IFlower[] = [
  { id: 'meihua', name: '梅花', description: '墙角数枝梅，凌寒独自开', icon: '🌸', season: 'winter', bloomTime: '小寒-立春' },
  { id: 'yingsu', name: '迎春', description: '覆阑纤弱绿条长，带雪冲寒折嫩黄', icon: '🌼', season: 'spring', bloomTime: '立春-雨水' },
  { id: 'taohua', name: '桃花', description: '桃之夭夭，灼灼其华', icon: '🌸', season: 'spring', bloomTime: '惊蛰-春分' },
  { id: 'xinghua', name: '杏花', description: '沾衣欲湿杏花雨，吹面不寒杨柳风', icon: '🌺', season: 'spring', bloomTime: '春分-清明' },
  { id: 'mudan', name: '牡丹', description: '唯有牡丹真国色，花开时节动京城', icon: '🌺', season: 'spring', bloomTime: '谷雨-立夏' },
  { id: 'shaoyao', name: '芍药', description: '有情芍药含春泪，无力蔷薇卧晓枝', icon: '🌸', season: 'spring', bloomTime: '立夏-小满' },
  { id: 'hehua', name: '荷花', description: '出淤泥而不染，濯清涟而不妖', icon: '🪷', season: 'summer', bloomTime: '夏至-大暑' },
  { id: 'ziyuan', name: '紫薇', description: '谁道花无红百日，紫薇长放半年花', icon: '💜', season: 'summer', bloomTime: '小暑-立秋' },
  { id: 'guihua', name: '桂花', description: '人闲桂花落，夜静春山空', icon: '🌼', season: 'autumn', bloomTime: '白露-秋分' },
  { id: 'juhua', name: '菊花', description: '采菊东篱下，悠然见南山', icon: '🌼', season: 'autumn', bloomTime: '寒露-霜降' },
  { id: 'shanhong', name: '山茶花', description: '山花照坞复烧溪，树树枝枝尽可迷', icon: '🌺', season: 'winter', bloomTime: '大雪-冬至' },
  { id: 'lamei', name: '蜡梅', description: '疏影横斜水清浅，暗香浮动月黄昏', icon: '🌼', season: 'winter', bloomTime: '小寒-大寒' },
];
