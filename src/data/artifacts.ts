// EXPORTS: IArtifact, MOCK_ARTIFACTS
export interface IArtifact {
  id: string;
  name: string;
  solarTerm: string;
  category: '器物';
  description: string;
  icon: string;
}

export const MOCK_ARTIFACTS: IArtifact[] = [
  { id: 'a1', name: '春胜', solarTerm: '立春', category: '器物', description: '立春剪彩为胜，戴于鬓边，迎新祈福', icon: '🏮' },
  { id: 'a2', name: '纸鸢', solarTerm: '春分', category: '器物', description: '春风送纸鸢，一线牵云端', icon: '🪁' },
  { id: 'a3', name: '青团印', solarTerm: '清明', category: '器物', description: '木雕青团印模，刻如意花纹', icon: '🪔' },
  { id: 'a4', name: '茶筅', solarTerm: '谷雨', category: '器物', description: '竹制茶筅，点茶时搅茶成沫', icon: '🧹' },
  { id: 'a5', name: '蒲扇', solarTerm: '立夏', category: '器物', description: '蒲草编织团扇，驱暑纳凉', icon: '🪭' },
  { id: 'a6', name: '缫丝车', solarTerm: '小满', category: '器物', description: '木制缫丝小车，抽茧成丝', icon: '🧵' },
  { id: 'a7', name: '青梅酒坛', solarTerm: '芒种', category: '器物', description: '青瓷酒坛，浸泡青梅初酿', icon: '🍶' },
  { id: 'a8', name: '观星图', solarTerm: '夏至', category: '器物', description: '绢本星图，绘二十八宿', icon: '🗺️' },
  { id: 'a9', name: '萤石灯', solarTerm: '小暑', category: '器物', description: '竹笼罩萤，微光伴读', icon: '🏮' },
  { id: 'a10', name: '冰碗', solarTerm: '大暑', category: '器物', description: '瓷碗盛冰，浸以鲜果', icon: '🥣' },
  { id: 'a11', name: '河灯', solarTerm: '处暑', category: '器物', description: '荷花形河灯，烛照秋水', icon: '🪷' },
  { id: 'a12', name: '白露酒盏', solarTerm: '白露', category: '器物', description: '陶瓷酒盏，盛自酿米酒', icon: '🍶' },
  { id: 'a13', name: '秋牛图', solarTerm: '秋分', category: '器物', description: '木板年画，祈五谷丰登', icon: '🖼️' },
  { id: 'a14', name: '蟹八件', solarTerm: '寒露', category: '器物', description: '银质食蟹工具一套八件', icon: '🦀' },
  { id: 'a15', name: '柿饼夹', solarTerm: '霜降', category: '器物', description: '竹制晒柿夹，晾柿饼用', icon: '🫒' },
  { id: 'a16', name: '冬衣箱', solarTerm: '立冬', category: '器物', description: '樟木衣箱，藏裘过冬', icon: '🧳' },
  { id: 'a17', name: '糍粑槌', solarTerm: '小雪', category: '器物', description: '枣木石臼，捣糯成糍', icon: '🪓' },
  { id: 'a18', name: '温酒壶', solarTerm: '大雪', category: '器物', description: '铜制温酒壶，热水烫酒', icon: '🍶' },
  { id: 'a19', name: '消寒图', solarTerm: '冬至', category: '器物', description: '素梅一枝，日染一瓣', icon: '🌸' },
  { id: 'a20', name: '腊八粥碗', solarTerm: '小寒', category: '器物', description: '粗陶大碗，盛七宝粥', icon: '🥣' },
  { id: 'a21', name: '年货担', solarTerm: '大寒', category: '器物', description: '竹编年货担，盛满新春', icon: '🧺' },
];
