import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ISolarTerm } from '@/data/solarTerms';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { SEASONS } from '@/data/solarTerms';

interface TermDetailPanelProps {
  term: ISolarTerm;
  progress: IGameProgress;
  onStartActivity: (activityId: string) => void;
  onToggleActivity: (activityId: string) => void;
  onCollectFood: (foodName: string) => void;
  onCollectPhenology: (index: number) => void;
}

type TabType = 'activities' | 'foods' | 'phenology';

export default function TermDetailPanel({
  term,
  progress,
  onStartActivity,
  onToggleActivity,
  onCollectFood,
  onCollectPhenology,
}: TermDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('activities');

  const seasonColor = {
    spring: { text: 'hsl(95 35% 35%)', bg: 'hsl(90 50% 92%)', border: 'hsl(90 40% 78%)' },
    summer: { text: 'hsl(180 30% 32%)', bg: 'hsl(175 40% 90%)', border: 'hsl(175 30% 75%)' },
    autumn: { text: 'hsl(35 55% 30%)', bg: 'hsl(42 75% 90%)', border: 'hsl(40 60% 75%)' },
    winter: { text: 'hsl(220 10% 40%)', bg: 'hsl(210 20% 94%)', border: 'hsl(210 10% 80%)' },
  }[term.season];

  const tabs: { key: TabType; label: string }[] = [
    { key: 'activities', label: '时令活动' },
    { key: 'foods', label: '时令食膳' },
    { key: 'phenology', label: '物候志' },
  ];

  const handleActivityClick = useCallback((activityId: string) => {
    onStartActivity(activityId);
  }, [onStartActivity]);

  const handleFoodClick = useCallback((foodName: string) => {
    onCollectFood(foodName);
  }, [onCollectFood]);

  const handlePhenologyClick = useCallback((index: number) => {
    onCollectPhenology(index);
  }, [onCollectPhenology]);

  return (
    <div className="space-y-5">
      {/* 节气名称 + 诗词 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 border-b border-border/40"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <span
            className="text-xs px-2 py-0.5 rounded-sm font-serif"
            style={{ backgroundColor: seasonColor.bg, color: seasonColor.text }}
          >
            {SEASONS[term.season]}季
          </span>
          <h3 className="text-3xl font-serif text-foreground tracking-wider">{term.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{term.dateRange}</p>
        <p className="text-base font-serif italic text-foreground/80 mt-3">「{term.poem}」</p>
        <p className="text-sm text-muted-foreground mt-2">{term.description}</p>
      </motion.div>

      {/* 标签页 */}
      <div className="flex gap-1 border-b border-border/50 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-serif transition-all relative ${
              activeTab === tab.key
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="term-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* 内容区 */}
      <div className="min-h-[300px]">
        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {term.activities.map((activity) => {
              const isCompleted = progress.completedActivities.includes(activity.id);
              return (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 4 }}
                  onClick={() => handleActivityClick(activity.id)}
                  className={`relative p-4 rounded-sm border cursor-pointer transition-all ${
                    isCompleted
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/40 hover:bg-accent/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-foreground flex items-center gap-2">
                        {activity.name}
                        {isCompleted && (
                          <span className="text-xs text-primary font-normal">✓ 已完成</span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    </div>
                  </div>
                  {/* 印章完成标记 */}
                  {isCompleted && (
                    <div className="absolute top-2 right-2 w-10 h-10 rounded-full border-2 border-primary/60 flex items-center justify-center rotate-12">
                      <span className="text-[10px] text-primary font-serif font-bold leading-tight text-center">
                        岁<br />时
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'foods' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {term.foods.map((food) => {
              const foodId = `${term.id}-${food.name}`;
              const isCollected = progress.collectedFoods.includes(foodId);
              return (
                <motion.div
                  key={food.name}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleFoodClick(food.name)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    isCollected
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-serif text-lg text-foreground">{food.name}</h4>
                    {isCollected ? (
                      <span className="text-xs text-primary">✓ 已收录</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">点击收录</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{food.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs px-2 py-0.5 rounded-sm bg-accent/60 text-muted-foreground"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'phenology' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {term.phenology.map((p, idx) => {
              const pId = `${term.id}-${idx}`;
              const isCollected = progress.collectedPhenology.includes(pId);
              const orderNames = ['初候', '二候', '三候'];
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4 }}
                  onClick={() => handlePhenologyClick(idx)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    isCollected
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif"
                      style={{
                        backgroundColor: isCollected ? seasonColor.bg : 'var(--muted)',
                        color: isCollected ? seasonColor.text : 'var(--muted-foreground)',
                      }}
                    >
                      {orderNames[idx]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-foreground flex items-center gap-2">
                        {p.name}
                        {isCollected && <span className="text-xs text-primary">✓</span>}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
