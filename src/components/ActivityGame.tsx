import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityGameProps {
  activityId: string;
  activityName: string;
  activityIcon: string;
  onComplete: () => void;
  onClose: () => void;
}

interface ClickTarget {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

interface ClickCollectConfig {
  type: 'click-collect';
  targets: number;
  title: string;
  hint: string;
  emoji?: string;
}

interface ClickSequenceConfig {
  type: 'click-sequence';
  steps: string[];
  title: string;
  hint: string;
}

interface DragMatchConfig {
  type: 'drag-match';
  title: string;
  hint: string;
  /** 材料 → 槽位 的正确配对 */
  pairs: Record<string, string>;
  /** 材料 emoji */
  itemIcons: Record<string, string>;
  /** 槽位 emoji */
  slotIcons: Record<string, string>;
}

type GameConfig = ClickCollectConfig | ClickSequenceConfig | DragMatchConfig;

const GAME_CONFIGS: Record<string, GameConfig> = {
  // —— 立春 ——
  'lichun-1': { type: 'drag-match', title: '咬春饼', hint: '将时令食材卷入春饼，咬出新春滋味', pairs: { '韭菜': '饼皮', '豆芽': '饼皮', '萝卜丝': '饼皮', '肉丝': '饼皮' }, itemIcons: { '韭菜': '🥬', '豆芽': '🌱', '萝卜丝': '🥕', '肉丝': '🥩' }, slotIcons: { '饼皮': '🫓' } },
  'lichun-2': { type: 'click-sequence', title: '贴春胜', hint: '剪彩为胜，迎立新春', steps: ['取彩纸', '折方形', '剪花纹', '贴春胜'] },
  'lichun-3': { type: 'click-collect', targets: 5, title: '踏青寻迎春', hint: '点击收集盛开的迎春花', emoji: '🌸' },
  // —— 雨水 ——
  'yushui-1': { type: 'click-collect', targets: 6, title: '接雨水煮茶', hint: '点击接取春雨，以新水煮新茶', emoji: '💧' },
  'yushui-2': { type: 'click-sequence', title: '挂风铃', hint: '檐下挂风铃，听雨听风', steps: ['取铜铃', '系红绳', '挂檐下', '听风声'] },
  // —— 惊蛰 ——
  'jingzhe-1': { type: 'click-sequence', title: '蒙鼓皮', hint: '春雷乍响，依序蒙制新鼓', steps: ['选木料', '绷紧皮', '钉鼓钉', '试鼓声'] },
  'jingzhe-2': { type: 'click-collect', targets: 5, title: '听雷', hint: '点击捕捉春雷电光，感知天地初醒', emoji: '⚡' },
  'jingzhe-3': { type: 'click-collect', targets: 6, title: '寻虫', hint: '点击寻找刚从土中苏醒的小虫', emoji: '🐛' },
  // —— 春分 ——
  'chunfen-1': { type: 'click-sequence', title: '立蛋', hint: '春分竖蛋，祈求一年好运', steps: ['扶蛋', '找平点', '轻松手', '立住了'] },
  'chunfen-2': { type: 'click-sequence', title: '放纸鸢', hint: '春风正好，送纸鸢上青云', steps: ['取纸鸢', '迎风展', '放长线', '扶摇上'] },
  'chunfen-3': { type: 'click-collect', targets: 6, title: '采春菜', hint: '点击采摘田间鲜嫩的春菜', emoji: '🥬' },
  // —— 清明 ——
  'qingming-1': { type: 'click-sequence', title: '插柳', hint: '门前插柳，驱邪避瘟', steps: ['选柳枝', '择位置', '插土中', '浇清水'] },
  'qingming-2': { type: 'drag-match', title: '做青团', hint: '将材料依次入位，蒸一笼清明青团', pairs: { '艾草': '捣泥', '糯米粉': '揉面', '豆沙': '包馅', '青团': '蒸笼' }, itemIcons: { '艾草': '🌿', '糯米粉': '🍚', '豆沙': '🫘', '青团': '🍡' }, slotIcons: { '捣泥': '🫗', '揉面': '🥣', '包馅': '🫓', '蒸笼': '♨️' } },
  'qingming-3': { type: 'click-collect', targets: 5, title: '踏青写生', hint: '点击采集山水景致，入画三分', emoji: '🎨' },
  // —— 谷雨 ——
  'guyu-1': { type: 'click-collect', targets: 6, title: '采新茶', hint: '点击采摘谷雨前最嫩的茶芽', emoji: '🍃' },
  'guyu-2': { type: 'click-collect', targets: 5, title: '赏牡丹', hint: '点击赏鉴盛开的牡丹，国色天香', emoji: '🌺' },
  'guyu-3': { type: 'click-collect', targets: 6, title: '喂鱼', hint: '点击抛洒鱼食，看鱼戏莲叶间', emoji: '🐟' },
  // —— 立夏 ——
  'lixia-1': { type: 'click-sequence', title: '称人', hint: '立夏称体重，祈求夏日不消瘦', steps: ['挂秤钩', '移秤砣', '看星花', '报体重'] },
  'lixia-2': { type: 'click-sequence', title: '斗蛋', hint: '煮蛋相碰，看谁的蛋壳更硬', steps: ['取熟蛋', '轻敲击', '比胜负', '尝彩头'] },
  'lixia-3': { type: 'click-collect', targets: 5, title: '尝新', hint: '点击品尝初夏最早成熟的时鲜', emoji: '🍒' },
  // —— 小满 ——
  'xiaoman-1': { type: 'click-sequence', title: '动水车', hint: '小满动三车，先引水灌田', steps: ['引水入渠', '踏动水车', '灌溉田亩', '听水声'] },
  'xiaoman-2': { type: 'click-collect', targets: 5, title: '动油车', hint: '点击收集新榨的菜籽油香', emoji: '🫒' },
  'xiaoman-3': { type: 'click-sequence', title: '动丝车', hint: '缫丝抽丝，织就春衫', steps: ['抽丝', '引线', '上架', '纺成'] },
  // —— 芒种 ——
  'mangzhong-1': { type: 'click-collect', targets: 6, title: '插秧', hint: '点击将秧苗插入水田，种下希望', emoji: '🌾' },
  'mangzhong-2': { type: 'click-sequence', title: '送花神', hint: '芒种饯花神，感恩百花', steps: ['备花枝', '系彩线', '送花神', '谢花归'] },
  'mangzhong-3': { type: 'click-sequence', title: '煮梅', hint: '青梅煮酒，酸甜适口', steps: ['摘青梅', '加冰糖', '慢火煮', '尝酸甜'] },
  // —— 夏至 ——
  'xiazhi-1': { type: 'drag-match', title: '夏至面', hint: '吃过夏至面，一天短一线：依序入碗', pairs: { '面条': '沸水', '黄瓜丝': '碗中', '芝麻酱': '碗中', '蒜泥': '碗中' }, itemIcons: { '面条': '🍜', '黄瓜丝': '🥒', '芝麻酱': '🫙', '蒜泥': '🧄' }, slotIcons: { '沸水': '♨️', '碗中': '🥣' } },
  'xiazhi-2': { type: 'click-sequence', title: '祭神祀祖', hint: '祭祀土地神，祈求丰收', steps: ['备供品', '摆香案', '焚香烛', '行祭礼'] },
  'xiazhi-3': { type: 'click-collect', targets: 7, title: '观星', hint: '点击点亮夏夜星座，寻找银河', emoji: '⭐' },
  // —— 小暑 ——
  'xiaoshu-1': { type: 'click-sequence', title: '晒书晒衣', hint: '天贶节晒书晒衣，防霉防蛀', steps: ['搬书箱', '铺晒架', '翻晒书', '收衣裳'] },
  'xiaoshu-2': { type: 'click-collect', targets: 5, title: '食藕', hint: '点击取用脆嫩的夏藕', emoji: '🪷' },
  'xiaoshu-3': { type: 'click-collect', targets: 8, title: '捕萤', hint: '月下捕流萤，放入纱囊', emoji: '✨' },
  // —— 大暑 ——
  'dashu-1': { type: 'click-sequence', title: '伏茶摊', hint: '煮伏茶免费供给路人解暑', steps: ['煮凉茶', '摆茶碗', '请路人', '消暑气'] },
  'dashu-2': { type: 'click-collect', targets: 6, title: '赏荷', hint: '点击赏鉴盛开的荷花', emoji: '🪷' },
  'dashu-3': { type: 'drag-match', title: '冰碗消暑', hint: '冰镇鲜果，依序盛入冰碗', pairs: { '冰块': '瓷碗', '鲜果': '瓷碗', '糖水': '瓷碗' }, itemIcons: { '冰块': '🧊', '鲜果': '🍑', '糖水': '🍯' }, slotIcons: { '瓷碗': '🥣' } },
  // —— 立秋 ——
  'liqiu-1': { type: 'click-collect', targets: 5, title: '啃秋', hint: '点击啃开大西瓜，把秋老虎啃走', emoji: '🍉' },
  'liqiu-2': { type: 'click-sequence', title: '贴秋膘', hint: '立秋进补，恢复夏日消耗', steps: ['备好菜', '炖肉汤', '贴秋膘', '补元气'] },
  'liqiu-3': { type: 'click-collect', targets: 6, title: '晒秋', hint: '点击晾晒秋收的果实', emoji: '🌽' },
  // —— 处暑 ——
  'chushu-1': { type: 'click-sequence', title: '放河灯', hint: '中元夜放河灯，祭祀先人', steps: ['折河灯', '燃烛芯', '放水去', '祈福愿'] },
  'chushu-2': { type: 'click-collect', targets: 6, title: '开渔', hint: '点击收网，看满舱的鱼鲜', emoji: '🐟' },
  'chushu-3': { type: 'click-collect', targets: 5, title: '采菱', hint: '点击采摘初秋的第一口菱角', emoji: '🌰' },
  // —— 白露 ——
  'bailu-1': { type: 'click-collect', targets: 8, title: '收清露', hint: '点击收集花叶上凝结的白露', emoji: '💧' },
  'bailu-2': { type: 'click-sequence', title: '酿米酒', hint: '白露酿米酒，最是甘醇', steps: ['淘糯米', '拌酒曲', '入坛封', '待酒香'] },
  'bailu-3': { type: 'click-collect', targets: 6, title: '打枣', hint: '点击接住打落的甜枣', emoji: '🌳' },
  // —— 秋分 ——
  'qiufen-1': { type: 'click-sequence', title: '竖蛋', hint: '秋分到，蛋儿俏', steps: ['扶蛋', '找平点', '松手', '立住'] },
  'qiufen-2': { type: 'click-sequence', title: '送秋牛图', hint: '送秋牛图，说吉祥词', steps: ['选纸', '研墨', '画牛', '盖章送出'] },
  'qiufen-3': { type: 'click-collect', targets: 5, title: '赏月', hint: '点击拨开云层，赏一轮中秋月', emoji: '🌕' },
  // —— 寒露 ——
  'hanlu-1': { type: 'click-collect', targets: 5, title: '赏菊', hint: '东篱把酒，暗香盈袖', emoji: '🌼' },
  'hanlu-2': { type: 'click-sequence', title: '登高', hint: '重阳登高，遍插茱萸', steps: ['备行囊', '拾级上', '望远方', '插茱萸'] },
  'hanlu-3': { type: 'click-collect', targets: 6, title: '钓秋蟹', hint: '秋风起，蟹脚痒：点击起竿', emoji: '🦀' },
  // —— 霜降 ——
  'shuangjiang-1': { type: 'click-collect', targets: 6, title: '赏红叶', hint: '霜叶红于二月花', emoji: '🍁' },
  'shuangjiang-2': { type: 'click-collect', targets: 4, title: '吃柿子', hint: '霜降吃柿子，冬天不感冒', emoji: '🍅' },
  'shuangjiang-3': { type: 'click-sequence', title: '进补', hint: '霜降进补，为冬储备', steps: ['备食材', '入砂锅', '慢火炖', '补元气'] },
  // —— 立冬 ——
  'lidong-1': { type: 'click-sequence', title: '包饺子', hint: '立冬不端饺子碗，冻掉耳朵没人管', steps: ['和面', '擀皮', '包馅', '下锅'] },
  'lidong-2': { type: 'click-sequence', title: '酿酒', hint: '立冬酿新酒，围炉待雪飘', steps: ['蒸米', '拌曲', '入瓮', '封藏'] },
  'lidong-3': { type: 'click-sequence', title: '备冬衣', hint: '缝制冬衣，准备过冬', steps: ['裁布', '缝衣', '絮棉', '备冬'] },
  // —— 小雪 ——
  'xiaoxue-1': { type: 'click-sequence', title: '腌菜', hint: '小雪腌菜，大雪腌肉', steps: ['洗菜', '抹盐', '入缸', '压实'] },
  'xiaoxue-2': { type: 'click-sequence', title: '做糍粑', hint: '糍粑软糯，年味渐浓', steps: ['蒸糯米', '捶打', '塑形', '沾糖'] },
  'xiaoxue-3': { type: 'click-collect', targets: 5, title: '围炉煮茶', hint: '围坐炉火，点击添柴煮茶', emoji: '🫖' },
  // —— 大雪 ——
  'daxue-1': { type: 'click-collect', targets: 6, title: '踏雪寻梅', hint: '冒雪寻梅，暗香浮动', emoji: '🌸' },
  'daxue-2': { type: 'click-sequence', title: '堆雪人', hint: '大雪初霁，堆个雪人', steps: ['滚雪球', '垒雪人', '安五官', '戴帽子'] },
  'daxue-3': { type: 'click-collect', targets: 5, title: '温酒', hint: '红泥小火炉，点击温一壶酒', emoji: '🍶' },
  // —— 冬至 ——
  'dongzhi-1': { type: 'drag-match', title: '包饺子汤圆', hint: '南方汤圆北方饺：依序配对入锅', pairs: { '肉馅': '饺皮', '芝麻馅': '糯米皮', '饺子': '沸水', '汤圆': '沸水' }, itemIcons: { '肉馅': '🥩', '芝麻馅': '🖤', '饺子': '🥟', '汤圆': '🍡' }, slotIcons: { '饺皮': '🥟', '糯米皮': '🍚', '沸水': '♨️' } },
  'dongzhi-2': { type: 'click-sequence', title: '九九消寒图', hint: '每日染一瓣，九九尽春回', steps: ['领图', '描梅', '染一瓣', '待春回'] },
  // —— 小寒 ——
  'xiaohan-1': { type: 'click-collect', targets: 6, title: '探梅', hint: '小寒探梅，疏影横斜', emoji: '🌸' },
  'xiaohan-2': { type: 'click-sequence', title: '冰戏', hint: '冰上嬉戏，冬日乐趣', steps: ['备冰面', '试滑', '嬉戏', '尽兴'] },
  // —— 大寒 ——
  'dahan-1': { type: 'click-collect', targets: 8, title: '办年货', hint: '岁末备年货，最是热闹', emoji: '🧧' },
  'dahan-2': { type: 'click-sequence', title: '扫尘迎春', hint: '扫尘除旧，迎接新春', steps: ['扎扫帚', '扫屋顶', '掸灰尘', '迎新春'] },
};

const DEFAULT_CONFIG: ClickCollectConfig = { type: 'click-collect', targets: 3, title: '节气小趣', hint: '点击收集时令风物', emoji: '🎐' };

export default function ActivityGame({ activityId, activityName, activityIcon, onComplete, onClose }: ActivityGameProps) {
  const config = GAME_CONFIGS[activityId] ?? DEFAULT_CONFIG;
  const [phase, setPhase] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [targets, setTargets] = useState<ClickTarget[]>([]);
  const [seqStep, setSeqStep] = useState(0);
  const [placement, setPlacement] = useState<Record<string, string | null>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [wrongItems, setWrongItems] = useState<string[]>([]);

  const initGame = useCallback(() => {
    setPhase('playing');
    if (config.type === 'click-collect') {
      const newTargets: ClickTarget[] = [];
      for (let i = 0; i < config.targets; i++) {
        newTargets.push({ id: i, x: 10 + Math.random() * 75, y: 15 + Math.random() * 65, collected: false });
      }
      setTargets(newTargets);
    } else if (config.type === 'click-sequence') {
      setSeqStep(0);
    } else {
      const init: Record<string, string | null> = {};
      for (const item of Object.keys(config.pairs)) init[item] = null;
      setPlacement(init);
      setSelectedItem(null);
      setWrongItems([]);
    }
  }, [config]);

  const handleCollect = useCallback((id: number) => {
    setTargets((prev) => prev.map((t) => (t.id === id ? { ...t, collected: true } : t)));
  }, []);

  // 点击收集完成判定
  useEffect(() => {
    if (phase !== 'playing' || config.type !== 'click-collect') return;
    if (targets.length > 0 && targets.every((t) => t.collected)) {
      const timer = setTimeout(() => setPhase('complete'), 400);
      return () => clearTimeout(timer);
    }
  }, [targets, phase, config.type]);

  const handleSequenceClick = useCallback(() => {
    if (config.type !== 'click-sequence') return;
    if (seqStep < config.steps.length - 1) {
      setSeqStep((s) => s + 1);
    } else {
      setPhase('complete');
    }
  }, [config, seqStep]);

  const handlePlaceItem = useCallback((slot: string) => {
    if (config.type !== 'drag-match') return;
    if (!selectedItem) return;
    setPlacement((prev) => ({ ...prev, [selectedItem]: slot }));
    setSelectedItem(null);
  }, [config, selectedItem]);

  const handleRemoveItem = useCallback((item: string) => {
    setPlacement((prev) => ({ ...prev, [item]: null }));
    setWrongItems((prev) => prev.filter((i) => i !== item));
  }, []);

  const handleCheckMatch = useCallback(() => {
    if (config.type !== 'drag-match') return;
    const allPlaced = Object.keys(config.pairs).every((item) => placement[item] != null);
    if (!allPlaced) return;
    const wrong = Object.keys(config.pairs).filter((item) => placement[item] !== config.pairs[item]);
    if (wrong.length === 0) {
      setPhase('complete');
    } else {
      setWrongItems(wrong);
    }
  }, [config, placement]);

  const dragAllPlaced = config.type === 'drag-match' && Object.keys(config.pairs).length > 0
    && Object.keys(config.pairs).every((item) => placement[item] != null);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-sm shadow-2xl overflow-hidden"
      >
        {/* 卷轴装饰 */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)]" />

        <div className="relative pt-3 pb-3">
          <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-border/40">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activityIcon}</span>
              <h3 className="text-lg font-serif text-foreground">{config.title}</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-accent/50 rounded-sm text-muted-foreground">✕</button>
          </div>

          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center">
                <div className="text-5xl mb-4">{activityIcon}</div>
                <p className="text-lg font-serif text-foreground mb-2">{activityName}</p>
                <p className="text-sm text-muted-foreground mb-6">{config.hint}</p>
                <button onClick={initGame} className="px-6 py-2.5 bg-primary text-primary-foreground font-serif rounded-sm hover:bg-primary/90 transition-colors">开始</button>
              </motion.div>
            )}

            {phase === 'playing' && config.type === 'click-collect' && (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="px-5 py-2 flex items-center justify-between text-sm">
                  <span className="font-serif text-muted-foreground">{config.hint}</span>
                  <span className="font-serif text-foreground">{targets.filter((t) => t.collected).length} / {targets.length}</span>
                </div>
                <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-muted/30 to-muted/60">
                  {targets.map((target) => (
                    <AnimatePresence key={target.id}>
                      {!target.collected && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ delay: target.id * 0.08 }}
                          whileHover={{ scale: 1.3 }}
                          onClick={() => handleCollect(target.id)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary/20 border-2 border-primary/60 flex items-center justify-center text-xl cursor-pointer hover:bg-primary/30 transition-colors animate-breathe"
                          style={{ left: `${target.x}%`, top: `${target.y}%` }}
                        >{config.emoji ?? activityIcon}</motion.button>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'playing' && config.type === 'click-sequence' && (
              <motion.div key="playing-seq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                <p className="text-sm text-muted-foreground mb-4 text-center font-serif">{config.hint}</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  {config.steps.map((step, idx) => (
                    <div key={step} className={cn(
                      'flex items-center gap-2',
                    )}>
                      <div className={cn(
                        'px-3 py-1.5 rounded-sm border text-sm font-serif transition-all',
                        idx < seqStep ? 'border-primary/40 bg-primary/10 text-primary' :
                        idx === seqStep ? 'border-primary bg-primary text-primary-foreground scale-105' :
                        'border-border/50 bg-muted/30 text-muted-foreground',
                      )}>
                        {step}
                      </div>
                      {idx < config.steps.length - 1 && <span className="text-muted-foreground/50">→</span>}
                    </div>
                  ))}
                </div>
                <div className="text-center mb-5">
                  <span className="text-xs text-muted-foreground font-serif">
                    第 {seqStep + 1} / {config.steps.length} 步
                  </span>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSequenceClick}
                    className="px-8 py-3 bg-primary text-primary-foreground font-serif rounded-sm hover:bg-primary/90 transition-colors text-lg"
                  >
                    {seqStep < config.steps.length - 1 ? '继续 →' : '完成 ✓'}
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'playing' && config.type === 'drag-match' && (
              <motion.div key="playing-drag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
                <p className="text-sm text-muted-foreground mb-4 text-center font-serif">{config.hint}</p>

                {/* 槽位区 */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {Object.entries(config.slotIcons).map(([slot, icon]) => {
                    const placedItems = Object.entries(placement).filter(([, s]) => s === slot).map(([item]) => item);
                    return (
                      <motion.button
                        key={slot}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePlaceItem(slot)}
                        className={cn(
                          'relative aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 transition-all',
                          selectedItem
                            ? 'border-primary/70 bg-primary/10 cursor-pointer hover:bg-primary/20'
                            : 'border-border/60 bg-muted/20',
                        )}
                      >
                        <span className="text-3xl">{icon}</span>
                        <span className="text-[10px] font-serif text-muted-foreground">{slot}</span>
                        <div className="flex gap-0.5 flex-wrap justify-center px-1">
                          {placedItems.map((item) => (
                            <span key={item} className="text-sm">{config.itemIcons[item]}</span>
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* 材料区 */}
                <p className="text-xs text-muted-foreground mb-2 font-serif">选择材料，再点上方槽位放入：</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.keys(config.pairs).map((item) => {
                    const placed = placement[item] != null;
                    const isWrong = wrongItems.includes(item);
                    return (
                      <motion.button
                        key={item}
                        whileHover={!placed ? { scale: 1.08 } : {}}
                        onClick={() => {
                          if (placed) { handleRemoveItem(item); return; }
                          setSelectedItem((cur) => (cur === item ? null : item));
                          setWrongItems((prev) => prev.filter((i) => i !== item));
                        }}
                        className={cn(
                          'px-3 py-2 rounded-sm border flex items-center gap-1.5 text-sm font-serif transition-all',
                          placed
                            ? 'border-primary/40 bg-primary/10 text-foreground/70'
                            : selectedItem === item
                              ? 'border-primary bg-primary/20 text-foreground scale-105'
                              : isWrong
                                ? 'border-destructive/70 bg-destructive/10 text-foreground'
                                : 'border-border/60 bg-card hover:border-primary/50 cursor-pointer',
                        )}
                      >
                        <span>{config.itemIcons[item]}</span>
                        <span>{item}</span>
                        {placed && <span className="text-[10px] text-primary">✓</span>}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="text-center">
                  <button
                    onClick={handleCheckMatch}
                    disabled={!dragAllPlaced}
                    className={cn(
                      'px-8 py-2.5 font-serif rounded-sm transition-all',
                      dragAllPlaced
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed',
                    )}
                  >
                    {wrongItems.length > 0 ? '有错位，再调整' : '完成搭配'}
                  </button>
                  {wrongItems.length > 0 && (
                    <p className="text-xs text-destructive mt-2 font-serif">标红材料放错了位置，点击取出后重新放入</p>
                  )}
                </div>
              </motion.div>
            )}

            {phase === 'complete' && (
              <motion.div key="complete" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center">
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 8 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-20 h-20 mx-auto rounded-full border-4 border-primary flex items-center justify-center mb-4">
                  <span className="text-primary font-serif text-lg">✓</span>
                </motion.div>
                <p className="text-xl font-serif text-foreground mb-2">完成！</p>
                <div className="flex items-center justify-center gap-2 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-serif">岁时值 +10</span>
                </div>
                <button onClick={onComplete} className="px-6 py-2.5 bg-primary text-primary-foreground font-serif rounded-sm hover:bg-primary/90 transition-colors">领取奖励</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
