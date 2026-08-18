import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { MOCK_VISITORS, type IVisitor } from '@/data/visitors';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { CHARACTER_IMAGE } from '@/lib/season-images';
import { cn } from '@/lib/utils';
import { X, ChevronRight, Heart } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface VisitorsPanelProps {
  progress: IGameProgress;
  onBoostAffinity: (visitorId: string, delta: number) => void;
  /** 好感度满时赠送背包物品 */
  onGift: (visitorId: string) => void;
}

interface DialogueOption {
  text: string;
  reply: string;
  delta: number;
}

interface VisitorDialogue {
  options: DialogueOption[];
  gift: string;
}

const DIALOGUES: Record<string, VisitorDialogue> = {
  caishiguan: {
    options: [
      { text: '请问山外可有什么新歌谣？', reply: '采诗官抚掌而笑："邻村姑娘新编了一支采茶调，我唱与你听——"', delta: 2 },
      { text: '先生远道而来，喝杯茶再走。', reply: '他捧茶而饮，感叹："好茶！这一路风尘都散了。"', delta: 1 },
    ],
    gift: '采诗官赠你一卷《四时民歌集》，岁时值 +10。',
  },
  zoufanglangzhong: {
    options: [
      { text: '先生可识得院中这株草？', reply: '郎中俯身细看："这是车前草，清热利湿，煎水服之甚佳。"', delta: 2 },
      { text: '先生路上辛苦，坐下歇歇。', reply: '他放下药葫芦："无妨无妨，医者本就走遍山川。"', delta: 1 },
    ],
    gift: '走方郎中赠你一包"百草良方"药种，岁时值 +10。',
  },
  yunyouhuashi: {
    options: [
      { text: '可否为我画一幅庭院小景？', reply: '画师展纸研磨："正有此意——四时庭院，皆可入画。"', delta: 2 },
      { text: '外面的山水，如今是何光景？', reply: '他望向远山："江南烟雨，塞北飞雪，都比不上这院中清净。"', delta: 1 },
    ],
    gift: '云游画师赠你一幅《岁时庭景图》，岁时值 +10。',
  },
  huolangdan: {
    options: [
      { text: '货郎担里可有什么新鲜玩意儿？', reply: '他掀开木箱："这是山外城里的琉璃珠，姑娘们都爱……"', delta: 2 },
      { text: '山外近来可有什么大事？', reply: '他压低声音："城里在筹备灯会，听说热闹得很。"', delta: 1 },
    ],
    gift: '货郎担赠你一件稀罕杂物与山外消息，岁时值 +10。',
  },
  qinshi: {
    options: [
      { text: '可否为我弹一曲《高山流水》？', reply: '琴师抚琴而坐："知音在侧，正当抚琴。"弦声起处，松风相和。', delta: 2 },
      { text: '先生为何弃了宫中繁华？', reply: '他轻抚琴弦："宫中丝竹太满，山间一弦一柱才是真清音。"', delta: 1 },
    ],
    gift: '琴师赠你一曲《知音》琴谱，岁时值 +10。',
  },
  chashi: {
    options: [
      { text: '先生尝尝这壶新沏的茶。', reply: '茶圣细品再三："水好、器好、人好，此茶堪称三好。"', delta: 2 },
      { text: '何为茶之九难？愿闻其详。', reply: '他徐徐道来："一曰造，二曰器……茶事如人事，急不得。"', delta: 1 },
    ],
    gift: '茶圣赠你一罐私藏名茶，岁时值 +10。',
  },
  qishi: {
    options: [
      { text: '与先生手谈一局如何？', reply: '棋士落座执子："清茶对弈，人生一乐。"', delta: 2 },
      { text: '先生可觉得棋如人生？', reply: '他拈子不语，良久方道："落子无悔，人生亦然。"', delta: 1 },
    ],
    gift: '棋士赠你一副白玉棋具，岁时值 +10。',
  },
  huanniang: {
    options: [
      { text: '这株花该当如何照料？', reply: '花娘子抚叶细语："浇水宜晨，施肥宜薄，花期自来。"', delta: 2 },
      { text: '天下名花，姐姐见过多少？', reply: '她笑道："花各有期，见过四季花开，便已见遍天下。"', delta: 1 },
    ],
    gift: '花娘子赠你一株奇花异种，岁时值 +10。',
  },
};

const FALLBACK_DIALOGUE: VisitorDialogue = {
  options: [
    { text: '今日来访，不知所为何事？', reply: '来人微微一笑："路过此间，见庭院清雅，特来小坐。"', delta: 1 },
    { text: '请喝杯热茶暖暖身子。', reply: '对方捧茶致谢："好客之人，福气自来。"', delta: 1 },
  ],
  gift: '对方赠你一件珍奇之物，岁时值 +10。',
};

function affinityLabel(affinity: number): { label: string; className: string } {
  if (affinity >= 3) return { label: '知己', className: 'text-primary' };
  if (affinity >= 1) return { label: '相谈甚欢', className: 'text-foreground' };
  return { label: '萍水相逢', className: 'text-muted-foreground' };
}

export default function VisitorsPanel({ progress, onBoostAffinity, onGift }: VisitorsPanelProps) {
  const [selectedVisitor, setSelectedVisitor] = useState<IVisitor | null>(null);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [giftShown, setGiftShown] = useState(false);

  const totalVisitors = MOCK_VISITORS.length;
  const metCount = progress.metVisitors.length;

  const openVisitor = (visitor: IVisitor) => {
    setSelectedVisitor(visitor);
    setChosenOption(null);
    setGiftShown(false);
  };

  const dialogue = selectedVisitor ? (DIALOGUES[selectedVisitor.id] ?? FALLBACK_DIALOGUE) : null;
  const affinity = selectedVisitor ? (progress.visitorAffinity[selectedVisitor.id] ?? 0) : 0;

  const handleChoose = (option: DialogueOption) => {
    if (!selectedVisitor || chosenOption !== null) return;
    const wasKnown = affinity >= 3;
    setChosenOption(dialogue!.options.indexOf(option));
    onBoostAffinity(selectedVisitor.id, option.delta);
    if (!wasKnown && affinity + option.delta >= 3) {
      setGiftShown(true);
      onGift(selectedVisitor.id);
      setTimeout(() => {
        toast.success(dialogue!.gift);
      }, 600);
    }
  };

  return (
    <div className="space-y-4">
      {/* 头部统计 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">山中访客</p>
        <div className="text-xl font-serif text-foreground">
          <span className="text-primary">{metCount}</span>
          <span className="text-muted-foreground text-base"> / {totalVisitors} 位</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-serif">与访客交谈可增进情谊，知己会赠予稀物</p>
      </div>

      {/* 访客列表 */}
      <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2 -mr-2">
        {MOCK_VISITORS.map((visitor, idx) => {
          const isMet = progress.metVisitors.includes(visitor.id);
          const aff = progress.visitorAffinity[visitor.id] ?? 0;
          const { label, className } = affinityLabel(aff);
          return (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 4 }}
              onClick={() => isMet && openVisitor(visitor)}
              className={cn(
                'flex items-center gap-4 p-3 rounded-sm border transition-all',
                isMet
                  ? 'border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10'
                  : 'border-border/60 bg-muted/20 cursor-not-allowed',
              )}
            >
              {/* 头像 */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full border-2 border-border/60 overflow-hidden bg-muted">
                  {isMet ? (
                    <Image src={CHARACTER_IMAGE} alt={visitor.name} className="w-full h-full object-cover object-top opacity-90" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">👤</div>
                  )}
                </div>
                {isMet && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">✓</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-foreground">{isMet ? visitor.name : '？？？'}</h4>
                <p className="text-xs text-muted-foreground truncate">{isMet ? visitor.title : '尚未相遇'}</p>
              </div>

              {isMet && (
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn('text-[10px] font-serif px-1.5 py-0.5 rounded-sm border border-border/50', className)}>
                    {label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 访客详情 + 对话 */}
      <AnimatePresence>
        {selectedVisitor && dialogue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedVisitor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-card rounded-sm border border-border shadow-xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedVisitor(null)} className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-accent/50 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary/40 overflow-hidden mb-3">
                  <Image src={CHARACTER_IMAGE} alt={selectedVisitor.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-xl font-serif text-foreground">{selectedVisitor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedVisitor.title}</p>
                {/* 好感度 */}
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full border border-border/60 bg-accent/30">
                  <Heart className={cn('w-3.5 h-3.5', affinity >= 3 ? 'text-primary fill-primary' : 'text-muted-foreground')} />
                  <span className={cn('text-xs font-serif', affinityLabel(affinity).className)}>
                    {affinityLabel(affinity).label}（好感 {affinity} / 3）
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-accent/30 rounded-sm">
                  <p className="text-xs text-muted-foreground mb-1">来访节气</p>
                  <p className="text-sm font-serif text-foreground">{selectedVisitor.visitedTerms.join(' · ')}</p>
                </div>

                <div className="p-3 bg-accent/30 rounded-sm">
                  <p className="text-xs text-muted-foreground mb-1">所赠之物</p>
                  <p className="text-sm font-serif text-foreground">{selectedVisitor.gift}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">人物小传</p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-serif">{selectedVisitor.story}</p>
                </div>

                {/* 对话区 */}
                <div className="border-t border-border/40 pt-3">
                  <p className="text-xs text-muted-foreground mb-2 font-serif">寒暄几句：</p>
                  {chosenOption === null ? (
                    <div className="space-y-2">
                      {dialogue.options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChoose(option)}
                          className="w-full text-left px-3 py-2.5 rounded-sm border border-border/60 bg-card hover:border-primary/50 text-sm font-serif text-foreground/90 transition-all"
                        >
                          {option.text}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-sm bg-primary/5 border border-primary/20 text-sm font-serif text-foreground/90 leading-relaxed">
                        {dialogue.options[chosenOption].reply}
                      </motion.div>
                      {giftShown && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-3 rounded-sm bg-amber-50 border border-amber-300/50 text-sm font-serif text-foreground leading-relaxed">
                          🎁 {dialogue.gift}
                        </motion.div>
                      )}
                      <button onClick={() => setSelectedVisitor(null)} className="w-full px-3 py-2 rounded-sm border border-border/60 text-sm font-serif text-muted-foreground hover:text-foreground transition-all">
                        告辞
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
