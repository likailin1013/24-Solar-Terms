import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MOCK_SOLAR_TERMS } from '@/data/solarTerms';
import { MOCK_HANDCRAFTS } from '@/data/handcrafts';
import { MOCK_FLOWERS } from '@/data/flowers';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface HandbookPanelProps {
  progress: IGameProgress;
}

type TabType = 'phenology' | 'foods' | 'artifacts' | 'flowers';

const TABS: { key: TabType; label: string }[] = [
  { key: 'phenology', label: '物候志' },
  { key: 'foods', label: '食膳志' },
  { key: 'artifacts', label: '器物志' },
  { key: 'flowers', label: '花卉志' },
];

export default function HandbookPanel({ progress }: HandbookPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('phenology');

  const stats = useMemo(() => {
    const totalPhenology = MOCK_SOLAR_TERMS.reduce((sum, t) => sum + t.phenology.length, 0);
    const totalFoods = MOCK_SOLAR_TERMS.reduce((sum, t) => sum + t.foods.length, 0);
    return {
      phenology: { collected: progress.collectedPhenology.length, total: totalPhenology },
      foods: { collected: progress.collectedFoods.length, total: totalFoods },
      artifacts: { collected: progress.collectedArtifacts.length, total: MOCK_HANDCRAFTS.length },
      flowers: { collected: progress.collectedFlowers.length, total: MOCK_FLOWERS.length },
    };
  }, [progress]);

  const currentStats = stats[activeTab];
  const progressPct = currentStats.total > 0
    ? Math.round((currentStats.collected / currentStats.total) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* 收集进度 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-2">收集进度</p>
        <div className="text-2xl font-serif text-foreground mb-3">
          <span className="text-primary">{currentStats.collected}</span>
          <span className="text-muted-foreground text-lg"> / {currentStats.total}</span>
        </div>
        {/* 卷轴式进度条 */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/80 to-primary rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{progressPct}% 已收录</p>
      </div>

      {/* 标签页 */}
      <div className="flex gap-1 border-b border-border/50">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-2 py-2 text-sm font-serif transition-all relative ${
              activeTab === tab.key
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="handbook-tab-underline"
                className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* 内容区 */}
      <div className="max-h-[50vh] overflow-y-auto pr-2 -mr-2">
        {activeTab === 'phenology' && (
          <div className="space-y-4">
            {MOCK_SOLAR_TERMS.map((term) => (
              <div key={term.id} className="space-y-2">
                <h4 className="text-sm font-serif text-foreground sticky top-0 bg-card py-1 z-10">
                  {term.name}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {term.phenology.map((p, idx) => {
                    const pId = `${term.id}-${idx}`;
                    const isCollected = progress.collectedPhenology.includes(pId);
                    return (
                      <motion.div
                        key={pId}
                        whileHover={isCollected ? { scale: 1.03 } : {}}
                        className={cn(
                          'p-3 rounded-sm border text-center transition-all',
                          isCollected
                            ? 'border-primary/30 bg-primary/5'
                            : 'border-border/60 bg-muted/20',
                        )}
                      >
                        <div className={cn('text-lg mb-1', !isCollected && 'grayscale opacity-40')}>
                          {idx === 0 ? '🌱' : idx === 1 ? '🐦' : '🐟'}
                        </div>
                        <p className={cn(
                          'text-xs font-serif',
                          isCollected ? 'text-foreground' : 'text-muted-foreground/50',
                        )}>
                          {isCollected ? p.name : '？？？'}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'foods' && (
          <div className="space-y-4">
            {MOCK_SOLAR_TERMS.map((term) => (
              <div key={term.id} className="space-y-2">
                <h4 className="text-sm font-serif text-foreground sticky top-0 bg-card py-1 z-10">
                  {term.name}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {term.foods.map((food) => {
                    const fId = `${term.id}-${food.name}`;
                    const isCollected = progress.collectedFoods.includes(fId);
                    return (
                      <motion.div
                        key={fId}
                        whileHover={isCollected ? { scale: 1.02 } : {}}
                        className={cn(
                          'p-3 rounded-sm border transition-all',
                          isCollected
                            ? 'border-primary/30 bg-primary/5'
                            : 'border-border/60 bg-muted/20',
                        )}
                      >
                        <div className={cn('text-xl mb-1', !isCollected && 'grayscale opacity-40')}>
                          🍲
                        </div>
                        <p className={cn(
                          'text-sm font-serif',
                          isCollected ? 'text-foreground' : 'text-muted-foreground/50',
                        )}>
                          {isCollected ? food.name : '？？？'}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'artifacts' && (
          <div className="grid grid-cols-2 gap-3">
            {MOCK_HANDCRAFTS.map((item) => {
              const isCollected = progress.collectedArtifacts.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  whileHover={isCollected ? { scale: 1.03 } : {}}
                  className={cn(
                    'p-4 rounded-sm border text-center transition-all',
                    isCollected
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border/60 bg-muted/20',
                  )}
                >
                  <div className={cn('text-3xl mb-2', !isCollected && 'grayscale opacity-40')}>
                    {item.icon}
                  </div>
                  <p className={cn(
                    'text-sm font-serif',
                    isCollected ? 'text-foreground' : 'text-muted-foreground/50',
                  )}>
                    {isCollected ? item.name : '？？？'}
                  </p>
                  {isCollected && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'flowers' && (
          <div className="grid grid-cols-3 gap-3">
            {MOCK_FLOWERS.map((flower) => {
              const isCollected = progress.collectedFlowers.includes(flower.id);
              return (
                <motion.div
                  key={flower.id}
                  whileHover={isCollected ? { scale: 1.05 } : {}}
                  className={cn(
                    'p-3 rounded-sm border text-center transition-all',
                    isCollected
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border/60 bg-muted/20',
                  )}
                >
                  <div className={cn('text-2xl mb-1', !isCollected && 'grayscale opacity-40')}>
                    {flower.icon}
                  </div>
                  <p className={cn(
                    'text-xs font-serif',
                    isCollected ? 'text-foreground' : 'text-muted-foreground/50',
                  )}>
                    {isCollected ? flower.name : '？？？'}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
