// EXPORTS: ISolarTerm, MOCK_SOLAR_TERMS, SEASONS, SEASON_COLORS

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface IPhenology {
  name: string;
  description: string;
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface IFood {
  name: string;
  description: string;
  ingredients: string[];
}

export interface ISolarTerm {
  id: string;
  name: string;
  dateRange: string;
  season: Season;
  description: string;
  poem: string;
  weather: string;
  phenology: IPhenology[];
  activities: IActivity[];
  foods: IFood[];
  visitor: string;
  crops: string[];
}

export const SEASONS: Record<Season, string> = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
};

export const SEASON_COLORS: Record<Season, { bg: string; text: string; border: string; accent: string }> = {
  spring: {
    bg: 'hsl(90 50% 92%)',
    text: 'hsl(95 35% 35%)',
    border: 'hsl(90 40% 78%)',
    accent: 'hsl(90 45% 72%)',
  },
  summer: {
    bg: 'hsl(175 40% 90%)',
    text: 'hsl(180 30% 32%)',
    border: 'hsl(175 30% 75%)',
    accent: 'hsl(175 35% 68%)',
  },
  autumn: {
    bg: 'hsl(42 75% 90%)',
    text: 'hsl(35 55% 30%)',
    border: 'hsl(40 60% 75%)',
    accent: 'hsl(40 70% 68%)',
  },
  winter: {
    bg: 'hsl(210 20% 94%)',
    text: 'hsl(220 10% 40%)',
    border: 'hsl(210 10% 80%)',
    accent: 'hsl(210 15% 88%)',
  },
};

export const MOCK_SOLAR_TERMS: ISolarTerm[] = [
  {
    id: 'lichun',
    name: '立春',
    dateRange: '2月3-5日',
    season: 'spring',
    description: '东风解冻，万物复苏',
    poem: '东风带雨逐西风，大地阳和暖气生',
    weather: '东风解冻',
    phenology: [
      { name: '东风解冻', description: '东风送暖，大地开始解冻' },
      { name: '蛰虫始振', description: '蛰居的虫类慢慢在洞中苏醒' },
      { name: '鱼陟负冰', description: '河里的冰开始融化，鱼开始到水面上游动' },
    ],
    activities: [
      { id: 'lichun-1', name: '咬春饼', description: '咬一口春饼，咬出一整年的好彩头', icon: '🫓' },
      { id: 'lichun-2', name: '贴春胜', description: '剪裁彩胜，贴于鬓发，迎接新春', icon: '✂️' },
      { id: 'lichun-3', name: '踏青寻迎春', description: '出门寻觅第一抹春色', icon: '🌸' },
    ],
    foods: [
      { name: '春饼', description: '薄如蝉翼的春饼，卷入五辛与时蔬', ingredients: ['面粉', '韭菜', '豆芽', '粉丝'] },
      { name: '五辛盘', description: '五种辛菜拼作一盘，迎新纳福', ingredients: ['韭菜', '葱', '蒜', '芥', '芫荽'] },
    ],
    visitor: 'caishiguan',
    crops: ['韭菜', '春笋'],
  },
  {
    id: 'yushui',
    name: '雨水',
    dateRange: '2月18-20日',
    season: 'spring',
    description: '天降甘霖，润泽万物',
    poem: '好雨知时节，当春乃发生',
    weather: '细雨绵绵',
    phenology: [
      { name: '獭祭鱼', description: '水獭开始捕鱼，将鱼摆在岸边如同祭祀' },
      { name: '候雁北', description: '大雁开始从南方飞回北方' },
      { name: '草木萌动', description: '草木随着地中阳气的上腾而开始抽出嫩芽' },
    ],
    activities: [
      { id: 'yushui-1', name: '接雨水煮茶', description: '以梅瓣雪水、春雨水煮新茶', icon: '🍵' },
      { id: 'yushui-2', name: '挂风铃', description: '檐下挂风铃，听雨听风', icon: '🔔' },
    ],
    foods: [
      { name: '雨水粥', description: '春雨绵绵，一碗暖粥暖胃又暖心', ingredients: ['粳米', '红枣', '莲子', '桂圆'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['春茶苗'],
  },
  {
    id: 'jingzhe',
    name: '惊蛰',
    dateRange: '3月5-7日',
    season: 'spring',
    description: '春雷乍响，蛰虫初醒',
    poem: '微雨众卉新，一雷惊蛰始',
    weather: '春雷初震',
    phenology: [
      { name: '桃始华', description: '桃花开始盛开' },
      { name: '仓庚鸣', description: '黄鹂开始鸣叫' },
      { name: '鹰化为鸠', description: '鹰开始悄悄地躲起来繁育后代' },
    ],
    activities: [
      { id: 'jingzhe-1', name: '蒙鼓皮', description: '蒙新鼓皮，春雷一声万物惊', icon: '🥁' },
      { id: 'jingzhe-2', name: '听雷', description: '静坐听春雷，感知天地初醒', icon: '⛈️' },
      { id: 'jingzhe-3', name: '寻虫', description: '在田间地头寻找刚苏醒的小虫', icon: '🐛' },
    ],
    foods: [
      { name: '梨汤', description: '惊蛰吃梨，润肺止咳，远离虫疾', ingredients: ['雪梨', '冰糖', '川贝', '银耳'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['桃树'],
  },
  {
    id: 'chunfen',
    name: '春分',
    dateRange: '3月20-22日',
    season: 'spring',
    description: '昼夜平分，春色正中',
    poem: '日月阳阴两相天，玄鸟不辞桃花寒',
    weather: '春光明媚',
    phenology: [
      { name: '玄鸟至', description: '燕子从南方飞来' },
      { name: '雷乃发声', description: '下雨时天空打雷' },
      { name: '始电', description: '开始有闪电' },
    ],
    activities: [
      { id: 'chunfen-1', name: '立蛋', description: '春分日竖蛋，祈求一年好运', icon: '🥚' },
      { id: 'chunfen-2', name: '放纸鸢', description: '春风正好，放飞纸鸢', icon: '🪁' },
      { id: 'chunfen-3', name: '采春菜', description: '田间采春菜，家尝第一口鲜', icon: '🥬' },
    ],
    foods: [
      { name: '春菜羹', description: '新鲜春菜煮羹，清润可口', ingredients: ['荠菜', '春笋', '豆腐', '香菇'] },
    ],
    visitor: 'huolangdan',
    crops: ['春菜'],
  },
  {
    id: 'qingming',
    name: '清明',
    dateRange: '4月4-6日',
    season: 'spring',
    description: '天清地明，慎终追远',
    poem: '清明时节雨纷纷，路上行人欲断魂',
    weather: '细雨纷纷',
    phenology: [
      { name: '桐始华', description: '泡桐树开始开花' },
      { name: '田鼠化为鴽', description: '田鼠躲回洞穴，鹌鹑开始出现' },
      { name: '虹始见', description: '雨后可以见到彩虹' },
    ],
    activities: [
      { id: 'qingming-1', name: '插柳', description: '门前插柳，驱邪避瘟', icon: '🌿' },
      { id: 'qingming-2', name: '做青团', description: '艾草清香，青团软糯', icon: '🍡' },
      { id: 'qingming-3', name: '踏青写生', description: '携画具踏青，描摹春日盛景', icon: '🎨' },
    ],
    foods: [
      { name: '青团', description: '艾草汁与糯米粉相揉，豆沙为馅', ingredients: ['糯米粉', '艾草', '豆沙', '猪油'] },
    ],
    visitor: 'caishiguan',
    crops: ['茶树'],
  },
  {
    id: 'guyu',
    name: '谷雨',
    dateRange: '4月19-21日',
    season: 'spring',
    description: '雨生百谷，春将尽',
    poem: '雨过琴书润，风来翰墨香',
    weather: '春雨润谷',
    phenology: [
      { name: '萍始生', description: '浮萍开始生长' },
      { name: '鸣鸠拂其羽', description: '布谷鸟开始提醒人们播种' },
      { name: '戴胜降于桑', description: '戴胜鸟开始在桑树上筑巢' },
    ],
    activities: [
      { id: 'guyu-1', name: '采新茶', description: '谷雨前采新茶，茶芽最嫩', icon: '🍃' },
      { id: 'guyu-2', name: '赏牡丹', description: '牡丹花开，国色天香', icon: '🌺' },
      { id: 'guyu-3', name: '喂鱼', description: '池塘喂鱼，看鱼戏莲叶间', icon: '🐟' },
    ],
    foods: [
      { name: '谷雨茶', description: '谷雨时节采摘的新茶，清香四溢', ingredients: ['明前茶芽', '山泉水'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['新茶'],
  },
  {
    id: 'lixia',
    name: '立夏',
    dateRange: '5月5-7日',
    season: 'summer',
    description: '夏日初临，万物繁茂',
    poem: '槐柳阴初密，帘栊暑尚微',
    weather: '初夏微热',
    phenology: [
      { name: '蝼蝈鸣', description: '蝼蛄开始鸣叫' },
      { name: '蚯蚓出', description: '蚯蚓从土里钻出来' },
      { name: '王瓜生', description: '王瓜的藤蔓开始快速攀爬生长' },
    ],
    activities: [
      { id: 'lixia-1', name: '称人', description: '立夏称体重，祈求夏日不消瘦', icon: '⚖️' },
      { id: 'lixia-2', name: '斗蛋', description: '孩子们用熟鸡蛋相互碰撞取乐', icon: '🥚' },
      { id: 'lixia-3', name: '尝新', description: '品尝一年中最早成熟的果实', icon: '🍒' },
    ],
    foods: [
      { name: '立夏蛋', description: '立夏吃蛋，强身健体', ingredients: ['鸡蛋', '茶叶', '八角', '桂皮'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['黄瓜', '樱桃'],
  },
  {
    id: 'xiaoman',
    name: '小满',
    dateRange: '5月20-22日',
    season: 'summer',
    description: '小得盈满，麦穗渐饱',
    poem: '夜莺啼绿柳，皓月掩清池',
    weather: '麦香阵阵',
    phenology: [
      { name: '苦菜秀', description: '苦菜已经枝叶繁茂' },
      { name: '靡草死', description: '喜阴的一些草类开始枯萎' },
      { name: '麦秋至', description: '麦子开始成熟' },
    ],
    activities: [
      { id: 'xiaoman-1', name: '动水车', description: '小满动水车，灌溉农田', icon: '💧' },
      { id: 'xiaoman-2', name: '动油车', description: '新榨油菜籽，油香满巷', icon: '🫒' },
      { id: 'xiaoman-3', name: '动丝车', description: '缫丝抽丝，织就春衫', icon: '🧵' },
    ],
    foods: [
      { name: '苦菜', description: '小满食苦，清热解暑', ingredients: ['苦菜', '蒜泥', '香醋', '麻油'] },
    ],
    visitor: 'huolangdan',
    crops: ['麦子'],
  },
  {
    id: 'mangzhong',
    name: '芒种',
    dateRange: '6月5-7日',
    season: 'summer',
    description: '芒种忙忙播，时雨及芒种',
    poem: '家家麦饭美，处处菱歌长',
    weather: '梅雨纷纷',
    phenology: [
      { name: '螳螂生', description: '螳螂在上一年深秋产的卵破壳生出小螳螂' },
      { name: '鵙始鸣', description: '伯劳鸟开始在枝头出现并鸣叫' },
      { name: '反舌无声', description: '能够学习其他鸟叫的反舌鸟停止了鸣叫' },
    ],
    activities: [
      { id: 'mangzhong-1', name: '插秧', description: '芒种插秧，种下一年的希望', icon: '🌾' },
      { id: 'mangzhong-2', name: '送花神', description: '芒种已近五月间，百花开始凋残', icon: '🌸' },
      { id: 'mangzhong-3', name: '煮梅', description: '青梅煮酒，酸甜适口', icon: '🍶' },
    ],
    foods: [
      { name: '青梅酒', description: '青梅煮酒，酸甜回甘', ingredients: ['青梅', '冰糖', '白酒'] },
    ],
    visitor: 'caishiguan',
    crops: ['水稻'],
  },
  {
    id: 'xiazhi',
    name: '夏至',
    dateRange: '6月21-22日',
    season: 'summer',
    description: '日长之至，阳气至极',
    poem: '昼晷已云极，宵漏自此长',
    weather: '烈日炎炎',
    phenology: [
      { name: '鹿角解', description: '鹿的角开始脱落' },
      { name: '蜩始鸣', description: '知了开始鼓翼而鸣' },
      { name: '半夏生', description: '半夏这种药草开始生长' },
    ],
    activities: [
      { id: 'xiazhi-1', name: '夏至面', description: '吃过夏至面，一天短一线', icon: '🍜' },
      { id: 'xiazhi-2', name: '祭神祀祖', description: '祭祀土地神，祈求丰收', icon: '🪔' },
      { id: 'xiazhi-3', name: '观星', description: '夏夜观星，寻找银河', icon: '⭐' },
    ],
    foods: [
      { name: '夏至面', description: '凉面过清水，拌以芝麻酱与黄瓜丝', ingredients: ['面条', '黄瓜', '芝麻酱', '蒜泥'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['荷叶'],
  },
  {
    id: 'xiaoshu',
    name: '小暑',
    dateRange: '7月6-8日',
    season: 'summer',
    description: '暑气初盛，蟋蟀居壁',
    poem: '倏忽温风至，因循小暑来',
    weather: '暑气初盛',
    phenology: [
      { name: '温风至', description: '温热的风开始袭来' },
      { name: '蟋蟀居宇', description: '蟋蟀离开田野躲到庭院墙角下' },
      { name: '鹰始鸷', description: '老鹰开始大量捕猎' },
    ],
    activities: [
      { id: 'xiaoshu-1', name: '晒书晒衣', description: '天贶节晒书晒衣，防霉防蛀', icon: '📚' },
      { id: 'xiaoshu-2', name: '食藕', description: '夏日食藕，清热解烦', icon: '🥢' },
      { id: 'xiaoshu-3', name: '捕萤', description: '月下捕流萤，放入纱囊', icon: '✨' },
    ],
    foods: [
      { name: '藕粉', description: '莲藕磨粉，冲泡成羹', ingredients: ['莲藕', '冰糖', '桂花'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['藕'],
  },
  {
    id: 'dashu',
    name: '大暑',
    dateRange: '7月22-24日',
    season: 'summer',
    description: '酷暑炎炎，万物焦灼',
    poem: '大暑三秋近，林钟九夏移',
    weather: '酷暑难当',
    phenology: [
      { name: '腐草为萤', description: '萤火虫在腐草上产卵孵化' },
      { name: '土润溽暑', description: '天气闷热，土地潮湿' },
      { name: '大雨时行', description: '常有大的雷雨出现' },
    ],
    activities: [
      { id: 'dashu-1', name: '伏茶摊', description: '煮伏茶免费供给路人解暑', icon: '🍵' },
      { id: 'dashu-2', name: '赏荷', description: '赏荷花，闻荷香，品莲子', icon: '🪷' },
      { id: 'dashu-3', name: '冰碗消暑', description: '冰镇鲜果，消夏解暑', icon: '🧊' },
    ],
    foods: [
      { name: '伏茶', description: '金银花、菊花、陈皮煮成的解暑凉茶', ingredients: ['金银花', '菊花', '陈皮', '甘草'] },
    ],
    visitor: 'huolangdan',
    crops: ['西瓜'],
  },
  {
    id: 'liqiu',
    name: '立秋',
    dateRange: '8月7-9日',
    season: 'autumn',
    description: '秋风乍起，凉意初生',
    poem: '一叶惊心绪，三秋别故人',
    weather: '秋高气爽',
    phenology: [
      { name: '凉风至', description: '刮风时人们会感觉到凉爽' },
      { name: '白露降', description: '清晨时分会有白色的露珠产生' },
      { name: '寒蝉鸣', description: '秋天的蝉也开始鸣叫' },
    ],
    activities: [
      { id: 'liqiu-1', name: '啃秋', description: '啃一口西瓜，把秋老虎啃走', icon: '🍉' },
      { id: 'liqiu-2', name: '贴秋膘', description: '立秋进补，恢复夏日消耗', icon: '🍖' },
      { id: 'liqiu-3', name: '晒秋', description: '趁秋阳正好，晾晒果实', icon: '🌞' },
    ],
    foods: [
      { name: '西瓜', description: '啃秋西瓜，送别盛夏', ingredients: ['西瓜'] },
      { name: '红烧肉', description: '贴秋膘的标配，肥而不腻', ingredients: ['五花肉', '冰糖', '酱油', '八角'] },
    ],
    visitor: 'caishiguan',
    crops: ['秋桃'],
  },
  {
    id: 'chushu',
    name: '处暑',
    dateRange: '8月23日',
    season: 'autumn',
    description: '暑气止矣，秋意渐浓',
    poem: '处暑无三日，新凉直万金',
    weather: '暑气渐消',
    phenology: [
      { name: '鹰乃祭鸟', description: '老鹰开始大量捕猎鸟类' },
      { name: '天地始肃', description: '天地间万物开始凋零' },
      { name: '禾乃登', description: '黍、稷、稻、粱类农作物成熟' },
    ],
    activities: [
      { id: 'chushu-1', name: '放河灯', description: '中元夜放河灯，祭祀先人', icon: '🏮' },
      { id: 'chushu-2', name: '开渔', description: '开渔节，渔船出海', icon: '🚣' },
      { id: 'chushu-3', name: '采菱', description: '池塘采菱角，初秋第一鲜', icon: '🌰' },
    ],
    foods: [
      { name: '菱角', description: '新鲜菱角，清甜味美', ingredients: ['菱角'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['菱角'],
  },
  {
    id: 'bailu',
    name: '白露',
    dateRange: '9月7-9日',
    season: 'autumn',
    description: '露凝而白，秋意正浓',
    poem: '蒹葭苍苍，白露为霜',
    weather: '秋露凝霜',
    phenology: [
      { name: '鸿雁来', description: '大雁从北方飞向南方' },
      { name: '玄鸟归', description: '燕子南飞避寒' },
      { name: '群鸟养羞', description: '百鸟开始储存干果粮食以备过冬' },
    ],
    activities: [
      { id: 'bailu-1', name: '收清露', description: '清晨收集花叶上的白露', icon: '💧' },
      { id: 'bailu-2', name: '酿米酒', description: '白露时节酿米酒，最是甘醇', icon: '🍶' },
      { id: 'bailu-3', name: '打枣', description: '竹竿打枣，落地生花', icon: '🌳' },
    ],
    foods: [
      { name: '白露酒', description: '白露米酒，甘甜醇美', ingredients: ['糯米', '酒曲', '白露清水'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['枣'],
  },
  {
    id: 'qiufen',
    name: '秋分',
    dateRange: '9月22-24日',
    season: 'autumn',
    description: '昼夜平分，秋色正中',
    poem: '山明水净夜来霜，数树深红出浅黄',
    weather: '秋高气爽',
    phenology: [
      { name: '雷始收声', description: '秋分以后，雷声开始减少' },
      { name: '蛰虫坯户', description: '蛰居的小虫开始藏入穴中' },
      { name: '水始涸', description: '降雨量开始减少，一些沼泽及水洼处处于干涸之中' },
    ],
    activities: [
      { id: 'qiufen-1', name: '竖蛋', description: '秋分到，蛋儿俏', icon: '🥚' },
      { id: 'qiufen-2', name: '送秋牛图', description: '送秋牛图，说秋词', icon: '🐂' },
      { id: 'qiufen-3', name: '赏月', description: '中秋赏月，千里共婵娟', icon: '🌕' },
    ],
    foods: [
      { name: '桂花糕', description: '软糯香甜，桂香扑鼻', ingredients: ['糯米粉', '桂花', '白糖', '猪油'] },
    ],
    visitor: 'huolangdan',
    crops: ['柿子'],
  },
  {
    id: 'hanlu',
    name: '寒露',
    dateRange: '10月8-9日',
    season: 'autumn',
    description: '露寒欲凝，秋深意凉',
    poem: '袅袅凉风动，凄凄寒露零',
    weather: '秋深露重',
    phenology: [
      { name: '鸿雁来宾', description: '最后一批大雁南飞' },
      { name: '雀入大水为蛤', description: '雀鸟都不见了，海边出现很多蛤蜊' },
      { name: '菊有黄华', description: '菊花普遍开放' },
    ],
    activities: [
      { id: 'hanlu-1', name: '赏菊', description: '东篱把酒黄昏后，有暗香盈袖', icon: '🌼' },
      { id: 'hanlu-2', name: '登高', description: '重阳登高，遍插茱萸', icon: '⛰️' },
      { id: 'hanlu-3', name: '钓秋蟹', description: '秋风起，蟹脚痒', icon: '🦀' },
    ],
    foods: [
      { name: '菊花酒', description: '菊花泡酒，延年益寿', ingredients: ['菊花', '糯米', '酒曲'] },
    ],
    visitor: 'caishiguan',
    crops: ['菊花'],
  },
  {
    id: 'shuangjiang',
    name: '霜降',
    dateRange: '10月23-24日',
    season: 'autumn',
    description: '初霜降临，万物收成',
    poem: '霜降水返壑，风落木归山',
    weather: '初霜初降',
    phenology: [
      { name: '豺乃祭兽', description: '豺狼开始大量捕猎并陈列猎物' },
      { name: '草木黄落', description: '大地上的树叶枯黄掉落' },
      { name: '蛰虫咸俯', description: '蜇虫也全在洞中不动不食' },
    ],
    activities: [
      { id: 'shuangjiang-1', name: '赏红叶', description: '霜叶红于二月花', icon: '🍁' },
      { id: 'shuangjiang-2', name: '吃柿子', description: '霜降吃柿子，冬天不感冒', icon: '🍅' },
      { id: 'shuangjiang-3', name: '进补', description: '霜降进补，为冬储备', icon: '🍲' },
    ],
    foods: [
      { name: '柿子', description: '霜降柿子，甜如蜜', ingredients: ['柿子'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['柿子'],
  },
  {
    id: 'lidong',
    name: '立冬',
    dateRange: '11月7-8日',
    season: 'winter',
    description: '冬之始也，万物收藏',
    poem: '冻笔新诗懒写，寒炉美酒时温',
    weather: '初冬微寒',
    phenology: [
      { name: '水始冰', description: '水面开始结冰' },
      { name: '地始冻', description: '土地开始冻结' },
      { name: '雉入大水为蜃', description: '野鸡一类的大鸟不多见了' },
    ],
    activities: [
      { id: 'lidong-1', name: '包饺子', description: '立冬不端饺子碗，冻掉耳朵没人管', icon: '🥟' },
      { id: 'lidong-2', name: '酿酒', description: '立冬酿新酒，围炉待雪飘', icon: '🍶' },
      { id: 'lidong-3', name: '备冬衣', description: '缝制冬衣，准备过冬', icon: '🧵' },
    ],
    foods: [
      { name: '饺子', description: '猪肉白菜馅饺子，立冬标配', ingredients: ['面粉', '猪肉', '白菜', '葱姜'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['冬储菜'],
  },
  {
    id: 'xiaoxue',
    name: '小雪',
    dateRange: '11月22-23日',
    season: 'winter',
    description: '初雪飘零，寒意渐深',
    poem: '绿蚁新醅酒，红泥小火炉',
    weather: '小雪初飘',
    phenology: [
      { name: '虹藏不见', description: '彩虹不再出现' },
      { name: '天气上升地气下降', description: '天空中的阳气上升，地中的阴气下降' },
      { name: '闭塞而成冬', description: '天地闭塞，转入严寒的冬天' },
    ],
    activities: [
      { id: 'xiaoxue-1', name: '腌菜', description: '小雪腌菜，大雪腌肉', icon: '🥬' },
      { id: 'xiaoxue-2', name: '做糍粑', description: '糍粑软糯，年味渐浓', icon: '🍡' },
      { id: 'xiaoxue-3', name: '围炉煮茶', description: '围坐炉火，煮茶夜话', icon: '🫖' },
    ],
    foods: [
      { name: '糍粑', description: '糯米糍粑，香甜软糯', ingredients: ['糯米', '红糖', '黄豆粉', '芝麻'] },
    ],
    visitor: 'huolangdan',
    crops: ['腌菜'],
  },
  {
    id: 'daxue',
    name: '大雪',
    dateRange: '12月6-8日',
    season: 'winter',
    description: '大雪纷飞，银装素裹',
    poem: '千山鸟飞绝，万径人踪灭',
    weather: '大雪纷飞',
    phenology: [
      { name: '鹖鴠不鸣', description: '寒号鸟也不再鸣叫了' },
      { name: '虎始交', description: '老虎开始有求偶行为' },
      { name: '荔挺出', description: '荔草感到阳气的萌动而抽出新芽' },
    ],
    activities: [
      { id: 'daxue-1', name: '踏雪寻梅', description: '冒雪寻梅，暗香浮动', icon: '🌸' },
      { id: 'daxue-2', name: '堆雪人', description: '大雪初霁，堆个雪人', icon: '⛄' },
      { id: 'daxue-3', name: '温酒', description: '红泥小火炉，能饮一杯无', icon: '🍶' },
    ],
    foods: [
      { name: '羊肉汤', description: '大雪喝羊汤，暖身又暖心', ingredients: ['羊肉', '萝卜', '当归', '生姜'] },
    ],
    visitor: 'caishiguan',
    crops: ['冬麦'],
  },
  {
    id: 'dongzhi',
    name: '冬至',
    dateRange: '12月21-23日',
    season: 'winter',
    description: '日短之至，阴极阳生',
    poem: '邯郸驿里逢冬至，抱膝灯前影伴身',
    weather: '天寒地冻',
    phenology: [
      { name: '蚯蚓结', description: '土中的蚯蚓仍然蜷缩着身体' },
      { name: '麋角解', description: '麋的角开始脱落' },
      { name: '水泉动', description: '山中的泉水开始流动并且温热' },
    ],
    activities: [
      { id: 'dongzhi-1', name: '包饺子汤圆', description: '南方汤圆北方饺，冬至大如年', icon: '🥟' },
      { id: 'dongzhi-2', name: '九九消寒图', description: '每日染一瓣，九九八十一天尽春回', icon: '🌸' },
    ],
    foods: [
      { name: '汤圆', description: '糯米汤圆，团团圆圆', ingredients: ['糯米粉', '黑芝麻', '猪油', '白糖'] },
      { name: '饺子', description: '冬至饺子，温暖一冬', ingredients: ['面粉', '羊肉', '胡萝卜', '葱姜'] },
    ],
    visitor: 'yunyouhuashi',
    crops: ['冬藏'],
  },
  {
    id: 'xiaohan',
    name: '小寒',
    dateRange: '1月5-7日',
    season: 'winter',
    description: '寒气积久，小寒料峭',
    poem: '冰雪林中著此身，不同桃李混芳尘',
    weather: '小寒料峭',
    phenology: [
      { name: '雁北乡', description: '大雁开始向北迁移' },
      { name: '鹊始巢', description: '喜鹊开始筑巢' },
      { name: '雉始雊', description: '野鸡开始鸣叫' },
    ],
    activities: [
      { id: 'xiaohan-1', name: '探梅', description: '小寒探梅，疏影横斜', icon: '🌸' },
      { id: 'xiaohan-2', name: '冰戏', description: '冰上嬉戏，冬日乐趣', icon: '⛸️' },
    ],
    foods: [
      { name: '腊八粥', description: '腊八节喝粥，温暖过年', ingredients: ['糯米', '红豆', '花生', '莲子', '红枣', '桂圆', '核桃', '枸杞'] },
    ],
    visitor: 'zoufanglangzhong',
    crops: ['腊梅'],
  },
  {
    id: 'dahan',
    name: '大寒',
    dateRange: '1月20-21日',
    season: 'winter',
    description: '寒之极也，岁终迎春',
    poem: '大寒雪未消，闭户不能出',
    weather: '大寒岁末',
    phenology: [
      { name: '鸡始乳', description: '母鸡开始孵小鸡' },
      { name: '征鸟厉疾', description: '鹰隼之类的猛禽正处于捕食能力极强的状态' },
      { name: '水泽腹坚', description: '水域中的冰冻得最厚' },
    ],
    activities: [
      { id: 'dahan-1', name: '办年货', description: '备年货迎新年，岁末最是热闹', icon: '🧧' },
      { id: 'dahan-2', name: '扫尘迎春', description: '扫尘除旧，迎接新春', icon: '🧹' },
    ],
    foods: [
      { name: '八宝饭', description: '糯米八宝饭，甜甜蜜蜜迎新年', ingredients: ['糯米', '豆沙', '红枣', '莲子', '桂圆', '核桃', '瓜子仁', '青红丝'] },
    ],
    visitor: 'huolangdan',
    crops: ['年货'],
  },
];
