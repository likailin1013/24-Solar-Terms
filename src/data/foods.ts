// EXPORTS: IFood, MOCK_FOODS
export interface IFood {
  id: string
  name: string
  solarTerm: string
  season: string
  description: string
  imageUrl: string
  ingredients: string[]
}

export const MOCK_FOODS: IFood[] = [
  { id: '1', name: '春饼', solarTerm: '立春', season: 'spring', description: '薄饼卷春蔬，咬一口新春滋味', imageUrl: '', ingredients: ['面粉', '韭菜', '豆芽', '粉丝'] },
  { id: '2', name: '五辛盘', solarTerm: '立春', season: 'spring', description: '五种辛菜迎新纳福', imageUrl: '', ingredients: ['韭菜', '葱', '蒜', '芥', '芫荽'] },
  { id: '3', name: '雨水粥', solarTerm: '雨水', season: 'spring', description: '春雨绵绵，一碗暖粥暖心', imageUrl: '', ingredients: ['粳米', '红枣', '莲子', '桂圆'] },
  { id: '4', name: '油焖春笋', solarTerm: '雨水', season: 'spring', description: '雨后春笋，鲜嫩清香', imageUrl: '', ingredients: ['春笋', '酱油', '白糖', '葱'] },
  { id: '5', name: '炒合菜', solarTerm: '惊蛰', season: 'spring', description: '惊蛰万物生，时蔬炒合菜', imageUrl: '', ingredients: ['韭菜', '豆芽', '粉条', '鸡蛋'] },
  { id: '6', name: '梨汤', solarTerm: '惊蛰', season: 'spring', description: '惊蛰吃梨，润肺止咳', imageUrl: '', ingredients: ['雪梨', '冰糖', '银耳', '枸杞'] },
  { id: '7', name: '春分糕', solarTerm: '春分', season: 'spring', description: '春分吃糕，步步高升', imageUrl: '', ingredients: ['糯米粉', '豆沙', '红枣', '桂花'] },
  { id: '8', name: '荠菜饺子', solarTerm: '春分', season: 'spring', description: '春分时节，荠菜正鲜', imageUrl: '', ingredients: ['荠菜', '猪肉', '面粉', '葱姜'] },
  { id: '9', name: '青团', solarTerm: '清明', season: 'spring', description: '艾草糯米团子，江南春日味道', imageUrl: '', ingredients: ['艾草', '糯米粉', '豆沙', '咸蛋黄'] },
  { id: '10', name: '清明螺', solarTerm: '清明', season: 'spring', description: '清明螺蛳赛过鹅', imageUrl: '', ingredients: ['螺蛳', '紫苏', '辣椒', '蒜'] },
  { id: '11', name: '香椿炒蛋', solarTerm: '谷雨', season: 'spring', description: '谷雨香椿嫩如丝', imageUrl: '', ingredients: ['香椿', '鸡蛋', '盐', '油'] },
  { id: '12', name: '谷雨茶', solarTerm: '谷雨', season: 'spring', description: '谷雨新茶，清火明目', imageUrl: '', ingredients: ['雨前龙井', '山泉'] },
  { id: '13', name: '立夏饭', solarTerm: '立夏', season: 'summer', description: '五色立夏饭，尝新祈福', imageUrl: '', ingredients: ['糯米', '豌豆', '笋丁', '咸肉'] },
  { id: '14', name: '青梅酒', solarTerm: '立夏', season: 'summer', description: '青梅煮酒，初夏微醺', imageUrl: '', ingredients: ['青梅', '米酒', '冰糖'] },
  { id: '15', name: '苦瓜酿', solarTerm: '小满', season: 'summer', description: '小满吃苦，清热解暑', imageUrl: '', ingredients: ['苦瓜', '肉糜', '香菇', '枸杞'] },
  { id: '16', name: '枇杷膏', solarTerm: '小满', season: 'summer', description: '小满枇杷半坡黄', imageUrl: '', ingredients: ['枇杷', '冰糖', '川贝'] },
  { id: '17', name: '粽子', solarTerm: '芒种', season: 'summer', description: '芒种端午，粽叶飘香', imageUrl: '', ingredients: ['糯米', '粽叶', '红枣', '咸蛋黄'] },
  { id: '18', name: '杨梅汤', solarTerm: '芒种', season: 'summer', description: '芒种杨梅红，煮汤消暑', imageUrl: '', ingredients: ['杨梅', '冰糖', '薄荷'] },
  { id: '19', name: '夏至面', solarTerm: '夏至', season: 'summer', description: '入伏新面，爽口解腻度苦夏', imageUrl: '', ingredients: ['面条', '黄瓜', '芝麻酱', '蒜'] },
  { id: '20', name: '荷叶粥', solarTerm: '夏至', season: 'summer', description: '荷叶清香，消暑祛湿', imageUrl: '', ingredients: ['粳米', '荷叶', '莲子', '百合'] },
{ id: '21', name: '绿豆汤', solarTerm: '小暑', season: 'summer', description: '小暑一碗绿豆汤，清凉又解暑', imageUrl: '', ingredients: ['绿豆', '冰糖', '薄荷'] },
  { id: '22', name: '莲藕排骨', solarTerm: '小暑', season: 'summer', description: '小暑莲藕正当时', imageUrl: '', ingredients: ['莲藕', '排骨', '姜', '枸杞'] },
  { id: '23', name: '大暑糕', solarTerm: '大暑', season: 'summer', description: '大暑吃糕，消暑纳凉', imageUrl: '', ingredients: ['绿豆粉', '糯米粉', '白糖', '桂花'] },
  { id: '24', name: '冬瓜盅', solarTerm: '大暑', season: 'summer', description: '大暑冬瓜汤，清甜解暑', imageUrl: '', ingredients: ['冬瓜', '虾仁', '干贝', '火腿'] },
  { id: '25', name: '立秋茄', solarTerm: '立秋', season: 'autumn', description: '立秋吃茄，贴秋膘', imageUrl: '', ingredients: ['茄子', '蒜', '酱油', '辣椒'] },
  { id: '26', name: '赤豆汤', solarTerm: '立秋', season: 'autumn', description: '立秋赤豆汤，祛湿健脾', imageUrl: '', ingredients: ['赤豆', '冰糖', '陈皮'] },
  { id: '27', name: '处暑鸭', solarTerm: '处暑', season: 'autumn', description: '处暑吃鸭，滋阴润燥', imageUrl: '', ingredients: ['鸭', '姜', '料酒', '荷叶'] },
  { id: '28', name: '酸梅汤', solarTerm: '处暑', season: 'autumn', description: '处暑酸梅汤，生津止渴', imageUrl: '', ingredients: ['乌梅', '山楂', '桂花', '冰糖'] },
  { id: '29', name: '白露酒', solarTerm: '白露', season: 'autumn', description: '白露米酒，温润秋燥', imageUrl: '', ingredients: ['糯米', '酒曲', '桂花'] },
  { id: '30', name: '龙眼', solarTerm: '白露', season: 'autumn', description: '白露吃龙眼，一颗顶只鸡', imageUrl: '', ingredients: ['龙眼'] },
  { id: '31', name: '秋分蟹', solarTerm: '秋分', season: 'autumn', description: '秋分蟹肥，持螯赏菊', imageUrl: '', ingredients: ['大闸蟹', '姜', '醋', '紫苏'] },
  { id: '32', name: '桂花糕', solarTerm: '秋分', season: 'autumn', description: '秋分桂花香，蒸糕正当时', imageUrl: '', ingredients: ['糯米粉', '桂花', '白糖', '蜂蜜'] },
  { id: '33', name: '菊花酒', solarTerm: '寒露', season: 'autumn', description: '寒露菊花酒，明目又延年', imageUrl: '', ingredients: ['菊花', '糯米', '酒曲', '枸杞'] },
  { id: '34', name: '芝麻糊', solarTerm: '寒露', season: 'autumn', description: '寒露芝麻糊，乌发润燥', imageUrl: '', ingredients: ['黑芝麻', '糯米', '冰糖'] },
  { id: '35', name: '柿子饼', solarTerm: '霜降', season: 'autumn', description: '霜降柿子红，晒饼正当时', imageUrl: '', ingredients: ['柿子', '面粉', '油'] },
  { id: '36', name: '萝卜炖羊肉', solarTerm: '霜降', season: 'autumn', description: '霜降萝卜羊肉汤，暖身又滋补', imageUrl: '', ingredients: ['羊肉', '白萝卜', '当归', '姜'] },
  { id: '37', name: '立冬饺', solarTerm: '立冬', season: 'winter', description: '立冬不端饺子碗，冻掉耳朵没人管', imageUrl: '', ingredients: ['面粉', '猪肉', '白菜', '葱姜'] },
  { id: '38', name: '姜母鸭', solarTerm: '立冬', season: 'winter', description: '立冬姜母鸭，驱寒暖身', imageUrl: '', ingredients: ['鸭', '老姜', '麻油', '米酒'] },
  { id: '39', name: '糍粑', solarTerm: '小雪', season: 'winter', description: '小雪糍粑，香甜软糯', imageUrl: '', ingredients: ['糯米', '红糖', '黄豆粉', '芝麻'] },
  { id: '40', name: '腊味煲仔饭', solarTerm: '小雪', season: 'winter', description: '小雪腌腊味，煲仔饭飘香', imageUrl: '', ingredients: ['腊肠', '大米', '酱油', '青菜'] },
  { id: '41', name: '羊肉汤', solarTerm: '大雪', season: 'winter', description: '大雪喝羊汤，暖身又暖心', imageUrl: '', ingredients: ['羊肉', '萝卜', '当归', '生姜'] },
  { id: '42', name: '烤红薯', solarTerm: '大雪', season: 'winter', description: '大雪天烤红薯，暖手又甜心', imageUrl: '', ingredients: ['红薯', '炭火'] },
  { id: '43', name: '汤圆', solarTerm: '冬至', season: 'winter', description: '冬至汤圆，团团圆圆', imageUrl: '', ingredients: ['糯米粉', '黑芝麻', '猪油', '白糖'] },
  { id: '44', name: '饺子', solarTerm: '冬至', season: 'winter', description: '冬至饺子，温暖一冬', imageUrl: '', ingredients: ['面粉', '羊肉', '胡萝卜', '葱姜'] },
  { id: '45', name: '腊八粥', solarTerm: '小寒', season: 'winter', description: '腊八节喝粥，温暖过年', imageUrl: '', ingredients: ['糯米', '红豆', '花生', '莲子', '红枣', '桂圆', '核桃', '枸杞'] },
  { id: '46', name: '糖葫芦', solarTerm: '小寒', season: 'winter', description: '小寒糖葫芦，酸甜可口', imageUrl: '', ingredients: ['山楂', '冰糖', '竹签'] },
  { id: '47', name: '八宝饭', solarTerm: '大寒', season: 'winter', description: '大寒八宝饭，甜甜蜜蜜迎新年', imageUrl: '', ingredients: ['糯米', '豆沙', '红枣', '莲子', '桂圆', '核桃', '瓜子仁', '青红丝'] },
  { id: '48', name: '年糕', solarTerm: '大寒', season: 'winter', description: '大寒打年糕，年年高升', imageUrl: '', ingredients: ['糯米粉', '红枣', '红豆', '桂花'] },
]