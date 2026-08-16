import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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

const GAME_CONFIGS: Record<string, { type: 'click-collect' | 'click-sequence'; targets: number; title: string; hint: string }> = {
  'lichun-3': { type: 'click-collect', targets: 5, title: '踏青寻迎春', hint: '点击收集盛开的迎春花' },
  'lichun-2': { type: 'click-sequence', targets: 4, title: '贴春胜', hint: '按顺序点击彩胜' },
  'jingzhe-1': { type: 'click-collect', targets: 5, title: '寻桃花', hint: '点击收集飘落的桃花瓣' },
  'qingming-1': { type: 'click-collect', targets: 6, title: '踏青插柳', hint: '点击收集柳枝' },
  'guyu-1': { type: 'click-collect', targets: 5, title: '采新茶', hint: '点击采摘新嫩的茶芽' },
  'lixia-1': { type: 'click-collect', targets: 5, title: '尝三新', hint: '点击收集初夏时鲜' },
  'xiazhi-1': { type: 'click-collect', targets: 5, title: '赏荷', hint: '点击盛开的荷花' },
  'lishu-1': { type: 'click-collect', targets: 5, title: '采莲蓬', hint: '点击采摘成熟的莲蓬' },
  'bailu-1': { type: 'click-collect', targets: 5, title: '收露水', hint: '点击收集晨露' },
  'shuangjiang-1': { type: 'click-collect', targets: 5, title: '赏红叶', hint: '点击收集最美的红叶' },
  'daxue-1': { type: 'click-collect', targets: 5, title: '踏雪寻梅', hint: '点击寻找雪中梅花' },
  'dongzhi-2': { type: 'click-collect', targets: 9, title: '九九消寒图', hint: '点击染红花瓣，每日一瓣' },
};

const DEFAULT_CONFIG = { type: 'click-collect' as const, targets: 3, title: '节气小趣', hint: '点击收集时令风物' };

export default function ActivityGame({ activityId, activityName, activityIcon, onComplete, onClose }: ActivityGameProps) {
  const config = GAME_CONFIGS[activityId] ?? DEFAULT_CONFIG;
  const [phase, setPhase] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [targets, setTargets] = useState<ClickTarget[]>([]);
  const [sequence, setSequence] = useState<number[]>([]);

  const initGame = useCallback(() => {
    const newTargets: ClickTarget[] = [];
    for (let i = 0; i < config.targets; i++) {
      newTargets.push({
        id: i,
        x: 10 + Math.random() * 75,
        y: 15 + Math.random() * 65,
        collected: false,
      });
    }
setTargets(newTargets);
    setSequence([]);
    setPhase('playing');
  }, [config.targets]);

  const handleCollect = useCallback((id: number) => {
    setTargets((prev) => prev.map((t) => t.id === id ? { ...t, collected: true } : t));
    setSequence((prev) => [...prev, id]);
  }, []);

  // 所有目标收集完毕后进入完成阶段
  useEffect(() => {
    if (targets.length > 0 && targets.every((t) => t.collected)) {
      const timer = setTimeout(() => setPhase('complete'), 400);
      return () => clearTimeout(timer);
    }
  }, [targets]);

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
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-8 text-center"
              >
                <div className="text-5xl mb-4">{activityIcon}</div>
                <p className="text-lg font-serif text-foreground mb-2">{activityName}</p>
                <p className="text-sm text-muted-foreground mb-6">{config.hint}</p>
                <button onClick={initGame}
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-serif rounded-sm hover:bg-primary/90 transition-colors"
                >开始</button>
              </motion.div>
            )}

            {phase === 'playing' && (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="px-5 py-2 flex items-center justify-between text-sm">
                  <span className="font-serif text-muted-foreground">{config.hint}</span>
                  <span className="font-serif text-foreground">{targets.filter((t) => t.collected).length} / {config.targets}</span>
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
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 border-2 border-primary/60 flex items-center justify-center text-xl cursor-pointer hover:bg-primary/30 transition-colors animate-breathe"
                          style={{ left: `${target.x}%`, top: `${target.y}%` }}
                        >{activityIcon}</motion.button>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'complete' && (
              <motion.div key="complete" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-primary flex items-center justify-center mb-4"
                ><span className="text-primary font-serif text-lg">✓</span></motion.div>
                <p className="text-xl font-serif text-foreground mb-2">完成！</p>
                <div className="flex items-center justify-center gap-2 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-serif">岁时值 +10</span>
                </div>
                <button onClick={onComplete}
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-serif rounded-sm hover:bg-primary/90 transition-colors"
                >领取奖励</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}