// EXPORTS: IVisitor, MOCK_VISITORS

export interface IVisitor {
  id: string;
  name: string;
  title: string;
  description: string;
  gift: string;
  story: string;
  visitedTerms: string[];
}

export const MOCK_VISITORS: IVisitor[] = [
  {
    id: 'caishiguan',
    name: '采诗官',
    title: '云游采诗者',
    description: '手执竹简，肩背布囊，云游四方收集民间歌谣与风土故事的老者。',
    gift: '各地风土故事与古老歌谣',
    story: '采诗官从京都而来，遍历名山大川，将沿途听闻的乡野小调、市井故事一一记录。每到节气更替，他便来到院中，与你围炉煮茶，讲述远方的见闻。',
    visitedTerms: ['立春', '清明', '芒种', '立秋', '寒露', '大雪'],
  },
  {
    id: 'zoufanglangzhong',
    name: '走方郎中',
    title: '游方医者',
    description: '背着药葫芦的游医，医术精湛，常赠人药草而不收分文。',
    gift: '草药知识与养生良方',
    story: '走方郎中生于医药世家，年轻时便离家游历，走过的山川比读过的书还多。他识得百草，辨得百毒，每到一处便为乡民诊病送药。路过你的庭院时，总不忘留下几味时草药种。',
    visitedTerms: ['雨水', '立夏', '小暑', '白露', '立冬', '小寒'],
  },
  {
    id: 'yunyouhuashi',
    name: '云游画师',
    title: '江湖画客',
    description: '一袭青衫，一支画笔，以山水为师，以天地为卷的年轻画师。',
    gift: '山水画作与远方见闻',
    story: '云游画师从江南来，画过西湖烟雨、黄山云海、塞北飞雪。他说最好的画不在纸上，而在心中。每到节气佳日，他便来院中写生，将四时风物留于纸上，也教你几笔丹青。',
    visitedTerms: ['惊蛰', '谷雨', '夏至', '处暑', '霜降', '冬至'],
  },
  {
    id: 'huolangdan',
    name: '货郎担',
    title: '走村串巷的小贩',
    description: '挑着两只大木箱的货郎，箱中无奇不有，是连接山外世界的信使。',
    gift: '杂货、种子与山外消息',
    story: '货郎担走南闯北，两只木箱里装的不只是针头线脑、胭脂水粉，还有山外的新鲜事、城里的新花样。他摇着拨浪鼓走过竹篱时，庭院里便多了几分热闹的烟火气。',
    visitedTerms: ['春分', '小满', '大暑', '秋分', '小雪', '大寒'],
  },
  {
    id: 'qinshi',
    name: '琴师',
    title: '归隐乐师',
    description: '曾是宫中乐师，如今隐居山林，一把七弦琴相伴余生。',
    gift: '琴曲与山水知音',
    story: '琴师曾为宫廷乐师，看透繁华后携琴归隐。每逢春秋佳日，便抱琴来访，与你在茶亭对坐，弹一曲《高山流水》，松风竹韵与琴声相和。',
    visitedTerms: ['春分', '白露'],
  },
  {
    id: 'chashi',
    name: '茶圣',
    title: '嗜茶雅士',
    description: '一生嗜茶，精于茶道，著有茶经三卷的雅士。',
    gift: '名茶与茶艺',
    story: '茶圣嗜茶如命，为寻好茶走遍天下名山大川。他说茶有九难，一曰造，二曰别，三曰器，四曰火，五曰水，六曰炙，七曰末，八曰煮，九曰饮。每至谷雨新茶采摘之时，他必来共品。',
    visitedTerms: ['谷雨', '小雪'],
  },
  {
    id: 'qishi',
    name: '棋士',
    title: '国手棋客',
    description: '围棋国手，弃官隐居，以棋会友的世外高人。',
    gift: '棋局与人生智慧',
    story: '棋士曾是当朝第一国手，因厌倦官场争斗隐居山林。他说棋如人生，落子无悔。每逢冬夏闲日，便来与你手谈一局，清茶对弈，不知日之将暮。',
    visitedTerms: ['夏至', '冬至'],
  },
  {
    id: 'huanniang',
    name: '花娘子',
    title: '育花之人',
    description: '擅育名花的女子，手中培育的花卉皆是人间罕见的品种。',
    gift: '奇花异卉与花种',
    story: '花娘子出身园艺世家，精通百花习性。她走过春夏秋冬，随身带着各色花种，走到哪里便把春色带到哪里。她说每一朵花都有自己的时节，做人亦当如是。',
    visitedTerms: ['惊蛰', '寒露'],
  },
];
