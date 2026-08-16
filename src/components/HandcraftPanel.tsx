import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MOCK_HANDCRAFTS, type IHandcraft } from '@/data/handcrafts';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface HandcraftPanelProps {
  progress: IGameProgress;
  onCraft: (artifactId: string) => void;
}

type FilterType = 'all' | 'spring' | 'summer' | 'autumn' | 'winter';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'spring', label: '春' },
  { key: 'summer', label: '夏' },
  { key: 'autumn', label: '秋' },
  { key: 'winter', label: '冬' },
];

export default function HandcraftPanel({ progress, onCraft }: HandcraftPanelProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<IHandcraft | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_HANDCRAFTS;
    return MOCK_HANDCRAFTS.filter((h) => h.season === filter);
  }, [filter]);

  return (
    <div className="space-y-5">
      {/* 头部 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">手作工坊</p>
        <h3 className="text-lg font-serif text-foreground">
          已制 <span className="text-primary">{progress.collectedArtifacts.length}</span>
          <span className="text-muted-foreground text-base"> / {MOCK_HANDCRAFTS.length} 件</span>
        </h3>
      </div>

      {/* 季节筛选 */}
      <div className="flex gap-1 justify-center">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-3 py-1.5 text-sm font-serif rounded-sm transition-all',
              filter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 手作列表 */}
      <div className="grid grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-2 -mr-2">
        {filtered.map((item, idx) => {
          const isCollected = progress.collectedArtifacts.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(item)}
              className={cn(
                'p-4 rounded-sm border text-center cursor-pointer transition-all',
                isCollected
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-border/60 bg-card hover:border-primary/40',
              )}
            >
              <div className={cn('text-3xl mb-2', !isCollected && 'grayscale opacity-60')}>
                {item.icon}
              </div>
              <p className="text-sm font-serif text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                难度 · {item.difficulty}
              </p>
              {isCollected && (
                <p className="text-xs text-primary mt-2">✓ 已制作</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 详情弹窗 */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-card rounded-sm border border-border shadow-xl p-6"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-accent/50 text-muted-foreground"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="text-5xl mb-3">{selected.icon}</div>
              <h3 className="text-xl font-serif text-foreground">{selected.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">难度 · {selected.difficulty}</p>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed mb-4 font-serif">
              {selected.description}
            </p>

            <div className="p-3 bg-accent/30 rounded-sm mb-4">
              <p className="text-xs text-muted-foreground mb-2">所需材料</p>
              <div className="flex flex-wrap gap-2">
                {selected.materials.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2 py-0.5 bg-card rounded-sm border border-border/60"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {progress.collectedArtifacts.includes(selected.id) ? (
              <button
                disabled
                className="w-full py-2.5 rounded-sm bg-primary/20 text-primary font-serif cursor-not-allowed"
              >
                ✓ 已制作完成
              </button>
            ) : (
              <button
                onClick={() => {
                  onCraft(selected.id);
                  setSelected(null);
                }}
                className="w-full py-2.5 rounded-sm bg-primary text-primary-foreground font-serif hover:bg-primary/90 transition-colors"
              >
                开始制作
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
