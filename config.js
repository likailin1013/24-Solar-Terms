// config.js 全局配置，只存常量，无业务逻辑
const CONFIG = {
    DAYS_PER_TERM: 15,
    DEFAULT_SPEED: 5, // 默认：5秒现实=1游戏天
    STORAGE_KEY: "sui_shi_ji_save",

    // 天气类型定义
    WEATHER_TYPES: [
        {id:"sunny", name:"晴"},
        {id:"cloudy", name:"多云"},
        {id:"rain", name:"雨"},
        {id:"snow", name:"雪"},
        {id:"wind", name:"风"}
    ],

    // 二十四节气完整配置
    SOLAR_TERMS: [
        {
            id: "lichun", name: "立春", bgClass: "scene-lichun", bgImg: "./images/lichun_bg.png",
            audio: "./audio/lichun.mp3",
            desc: "东风解冻，万物始苏。冰雪消融，草木萌动，枝头吐新芽。自此寒尽，春信将至，小院之中，静待花开。",
            events: [
                {title:"新芽初绽",desc:"院角老树枝头，冒出点点嫩绿新芽，春日气息悄然降临。"},
                {title:"风送春信",desc:"和风穿院而过，带来远方草木复苏的消息。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "yushui", name: "雨水", bgClass: "scene-yushui", bgImg: "./images/yushui_bg.png",
            audio: "./audio/yushui.mp3",
            desc: "雨水渐至，润物无声。细雨沾衣，草木含润。东风送暖，春水初生，庭前新绿，随雨慢慢舒展。",
            events: [
                {title:"细雨沾庭",desc:"绵绵细雨洒落庭院，泥土散发湿润清香。"},
                {title:"春水初生",desc:"院中小池水位渐涨，水面泛起细碎涟漪。"}
            ],
            weatherPool: ["rain","cloudy","sunny"]
        },
        {
            id: "jingzhe", name: "惊蛰", bgClass: "scene-jingzhe", bgImg: "./images/jingzhe_bg.png",
            audio: "./audio/jingzhe.mp3",
            desc: "春雷始鸣，惊醒蛰伏万物。虫蚁苏醒，草木抽枝，春风拂过庭院，处处皆是生机。",
            events: [
                {title:"虫鸣初起",desc:"泥土之下的小虫苏醒，隐约听见细碎虫鸣。"},
                {title:"春雷隐隐",desc:"天际传来隐隐雷声，唤醒沉睡大地。"}
            ],
            weatherPool: ["rain","wind","cloudy"]
        },
        {
            id: "chunfen", name: "春分", bgClass: "scene-chunfen", bgImg: "./images/chunfen_bg.png",
            audio: "./audio/chunfen.mp3",
            desc: "昼夜均分，春色平分。桃杏盛放，莺飞草长。庭院花树繁茂，风暖日和，正是人间好时节。",
            events: [
                {title:"繁花满院",desc:"桃杏竞相绽放，满院落英缤纷。"},
                {title:"莺声婉转",desc:"飞鸟往来庭间，啼鸣悦耳。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "qingming", name: "清明", bgClass: "scene-qingming", bgImg: "./images/qingming_bg.png",
            audio: "./audio/qingming.mp3",
            desc: "气清景明，万物皆显。烟雨漫过庭院，柳色青青，落英纷飞。怀思旧岁，亦惜眼前春光。",
            events: [
                {title:"烟雨濛濛",desc:"薄雾烟雨笼罩庭院，柳丝随风摇曳。"},
                {title:"落英纷飞",desc:"花瓣随风飘落，满地芬芳。"}
            ],
            weatherPool: ["rain","cloudy","sunny"]
        },
        {
            id: "guyu", name: "谷雨", bgClass: "scene-guyu", bgImg: "./images/guyu_bg.png",
            audio: "./audio/guyu.mp3",
            desc: "雨生百谷，暮春将尽。繁花落尽，草木浓绿。庭中菜畦繁茂，雨露滋荣，惜此晚春光景。",
            events: [
                {title:"菜畦繁茂",desc:"庭院菜圃作物蓬勃生长，雨露滋养万物。"},
                {title:"牡丹盛放",desc:"庭中牡丹盛放，暮春最后的绚烂。"}
            ],
            weatherPool: ["rain","sunny","cloudy"]
        },
        {
            id: "lixia", name: "立夏", bgClass: "scene-lixia", bgImg: "./images/lixia_bg.png",
            audio: "./audio/lixia.mp3",
            desc: "孟夏始至，万物繁茂。风暖昼长，草木葱茏。庭院绿荫渐浓，蝉鸣初起，夏日徐徐而来。",
            events: [
                {title:"绿荫渐浓",desc:"树木枝叶繁茂，庭院多出大片阴凉。"},
                {title:"蝉鸣初响",desc:"树梢传来第一声蝉鸣，宣告盛夏将至。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "xiaoman", name: "小满", bgClass: "scene-xiaoman", bgImg: "./images/xiaoman_bg.png",
            audio: "./audio/xiaoman.mp3",
            desc: "物至于此，小得盈满。麦粒渐实，草木丰茂。风过庭院，禾苗摇曳，万物将盛而未极。",
            events: [
                {title:"禾苗渐实",desc:"田间禾苗籽粒渐渐饱满，一派欣欣向荣。"},
                {title:"苦菜初盛",desc:"庭前野菜蓬勃生长，处处生机盎然。"}
            ],
            weatherPool: ["sunny","rain","cloudy"]
        },
        {
            id: "mangzhong", name: "芒种", bgClass: "scene-mangzhong", bgImg: "./images/mangzhong_bg.png",
            audio: "./audio/mangzhong.mp3",
            desc: "芒种忙种，仲夏初临。麦浪翻金，蝉声四起。庭前草木郁盛，雨风交替，农事正忙。",
            events: [
                {title:"麦浪翻金",desc:"麦田泛起金色波浪，迎来收获时节。"},
                {title:"骤雨频至",desc:"夏日骤雨忽来忽去，洗涤庭院草木。"}
            ],
            weatherPool: ["rain","sunny","wind"]
        },
        {
            id: "xiazhi", name: "夏至", bgClass: "scene-xiazhi", bgImg: "./images/xiazhi_bg.png",
            audio: "./audio/xiazhi.mp3",
            desc: "日影最短，昼长至极。榴花灼灼，荷风送香。庭院树影斑驳，暑气渐盛，夏夜清宁。",
            events: [
                {title:"榴花似火",desc:"石榴花开得热烈火红，映满庭院。"},
                {title:"昼长日永",desc:"白日漫长，树影在地面缓缓移动。"}
            ],
            weatherPool: ["sunny","rain","cloudy"]
        },
        {
            id: "xiaoshu", name: "小暑", bgClass: "scene-xiaoshu", bgImg: "./images/xiaoshu_bg.png",
            audio: "./audio/xiaoshu.mp3",
            desc: "暑气初盛，温风习习。蝉鸣聒噪，荷香满庭。午后偶有骤雨，消去几分燥热。",
            events: [
                {title:"荷风送香",desc:"池中的荷花盛放，清风带来淡淡荷香。"},
                {title:"蝉声聒噪",desc:"蝉鸣响彻庭院，暑意渐浓。"}
            ],
            weatherPool: ["sunny","rain","wind"]
        },
        {
            id: "dashu", name: "大暑", bgClass: "scene-dashu", bgImg: "./images/dashu_bg.png",
            audio: "./audio/dashu.mp3",
            desc: "盛夏极热，万物荣华。流火灼夏，池荷盛放。庭院幽荫纳凉，静待风雨来消暑。",
            events: [
                {title:"盛夏炎光",desc:"烈日高悬，庭院树荫下才得片刻清凉。"},
                {title:"池荷盛放",desc:"池塘荷花盛开，花叶亭亭玉立。"}
            ],
            weatherPool: ["sunny","rain","cloudy"]
        },
        {
            id: "liqiu", name: "立秋", bgClass: "scene-liqiu", bgImg: "./images/liqiu_bg.png",
            audio: "./audio/liqiu.mp3",
            desc: "斗转星移，秋意初临。暑气渐消，木叶初染微黄。清风穿院，蝉声渐弱，新秋悄至。",
            events: [
                {title:"一叶知秋",desc:"庭中树叶染上浅黄，秋天悄然到来。"},
                {title:"清风送爽",desc:"晚风褪去暑热，带来丝丝凉意。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "chushu", name: "处暑", bgClass: "scene-chushu", bgImg: "./images/chushu_bg.png",
            audio: "./audio/chushu.mp3",
            desc: "暑气尽退，秋光渐明。天高云淡，晚风清和。庭中草木敛华，瓜果渐熟。",
            events: [
                {title:"瓜果渐熟",desc:"庭院果树上果实慢慢成熟，果香隐隐。"},
                {title:"云淡天高",desc:"长空云卷云舒，秋光澄澈明净。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "bailu", name: "白露", bgClass: "scene-bailu", bgImg: "./images/bailu_bg.png",
            audio: "./audio/bailu.mp3",
            desc: "白露凝霜，夜渐寒凉。晨露沾叶，月色清皎。庭间草木含露，秋意愈发浓郁。",
            events: [
                {title:"晨露沾叶",desc:"清晨露水凝结在草木叶片，晶莹剔透。"},
                {title:"月色清寒",desc:"入夜月色皎洁，夜色清寒。"}
            ],
            weatherPool: ["cloudy","sunny","wind"]
        },
        {
            id: "qiufen", name: "秋分", bgClass: "scene-qiufen", bgImg: "./images/qiufen_bg.png",
            audio: "./audio/qiufen.mp3",
            desc: "昼夜均分，秋色平分。桂香浮动，落叶纷飞。天高气爽，庭院满目清秋。",
            events: [
                {title:"桂香满庭",desc:"桂花悄然绽放，暗香浮动整个院落。"},
                {title:"落叶纷飞",desc:"秋风卷起落叶，漫天飘零。"}
            ],
            weatherPool: ["sunny","cloudy","wind"]
        },
        {
            id: "hanlu", name: "寒露", bgClass: "scene-hanlu", bgImg: "./images/hanlu_bg.png",
            audio: "./audio/hanlu.mp3",
            desc: "露气转寒，秋意深沉。菊绽庭前，雁向南行。清霜初染草木，风里带着凉意。",
            events: [
                {title:"庭菊盛放",desc:"菊花于庭院中傲然绽放，凌霜而开。"},
                {title:"雁阵南飞",desc:"天空大雁列队，向着南方飞去。"}
            ],
            weatherPool: ["cloudy","wind","sunny"]
        },
        {
            id: "shuangjiang", name: "霜降", bgClass: "scene-shuangjiang", bgImg: "./images/shuangjiang_bg.png",
            audio: "./audio/shuangjiang.mp3",
            desc: "霜落庭阶，秋将落幕。枫叶染红，草木凋零。寒风吹过院落，静待冬日降临。",
            events: [
                {title:"霜覆庭阶",desc:"薄霜落在石阶之上，秋已走到尽头。"},
                {title:"丹枫染庭",desc:"枫叶火红绚烂，为晚秋画上浓墨一笔。"}
            ],
            weatherPool: ["wind","cloudy","sunny"]
        },
        {
            id: "lidong", name: "立冬", bgClass: "scene-lidong", bgImg: "./images/lidong_bg.png",
            audio: "./audio/lidong.mp3",
            desc: "水始冰，地始冻。万物闭藏，冬意初来。庭院草木敛藏，朔风渐起，静待岁寒。",
            events: [
                {title:"朔风初起",desc:"凛冽寒风穿过庭院，冬日正式降临。"},
                {title:"草木闭藏",desc:"草木褪去繁华，进入蛰伏休养。"}
            ],
            weatherPool: ["wind","cloudy","snow"]
        },
        {
            id: "xiaoxue", name: "小雪", bgClass: "scene-xiaoxue", bgImg: "./images/xiaoxue_bg.png",
            audio: "./audio/xiaoxue.mp3",
            desc: "寒天渐至，初雪欲临。朔风凛冽，木叶尽落。庭院寂寂，静待白雪覆庭。",
            events: [
                {title:"寒云漫空",desc:"天空布满寒云，似有落雪将至。"},
                {title:"木叶落尽",desc:"庭院树木叶子落尽，枝桠疏朗。"}
            ],
            weatherPool: ["snow","cloudy","wind"]
        },
        {
            id: "daxue", name: "大雪", bgClass: "scene-daxue", bgImg: "./images/daxue_bg.png",
            audio: "./audio/daxue.mp3",
            desc: "大雪隆冬，天寒地冻。寒云漫野，落雪纷飞。庭院覆满素白，万物归于沉静。",
            events: [
                {title:"大雪纷飞",desc:"漫天白雪飘落，将庭院尽数覆盖。"},
                {title:"万籁俱寂",desc:"落雪掩去喧嚣，世间一片安静。"}
            ],
            weatherPool: ["snow","wind","cloudy"]
        },
        {
            id: "dongzhi", name: "冬至", bgClass: "scene-dongzhi", bgImg: "./images/dongzhi_bg.png",
            audio: "./audio/dongzhi.mp3",
            desc: "昼短夜长，阴极之至。朔风凛冽，寒雪满院。围炉守岁，静待阳气复生。",
            events: [
                {title:"昼短夜长",desc:"白日短暂，漫漫长夜笼罩庭院。"},
                {title:"围炉待春",desc:"屋内炉火融融，静待阳气复苏。"}
            ],
            weatherPool: ["snow","wind","cloudy"]
        },
        {
            id: "xiaohan", name: "小寒", bgClass: "scene-xiaohan", bgImg: "./images/xiaohan_bg.png",
            audio: "./audio/xiaohan.mp3",
            desc: "寒气渐盛，岁暮天寒。风雪交加，庭中草木冰封。敛藏万物，静待春归。",
            events: [
                {title:"风雪交加",desc:"寒风裹挟飞雪，庭院处处冰封。"},
                {title:"岁暮寒深",desc:"一年将尽，寒意达到极盛。"}
            ],
            weatherPool: ["snow","wind","cloudy"]
        },
        {
            id: "dahan", name: "大寒", bgClass: "scene-dahan", bgImg: "./images/dahan_bg.png",
            audio: "./audio/dahan.mp3",
            desc: "岁末大寒，隆冬极寒。风雪漫天，万物蛰伏。旧岁将尽，盼新春复来。",
            events: [
                {title:"岁末风雪",desc:"隆冬风雪漫天，旧岁即将落幕。"},
                {title:"盼待新春",desc:"苦寒将尽，心中期盼春日归来。"}
            ],
            weatherPool: ["snow","wind","cloudy"]
        }
    ]
};
