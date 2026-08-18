import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { MOCK_ITEMS, getItemById, type ItemCategory } from '@/data/items';
import { cn } from '@/lib/utils';

interface BackpackPanelProps {
  progress: IGameProgress;
}

const CATEGORY_META: { key: ItemCategory; label: string; icon: string }[] = [
  { key: 'crop', label: '作物收成', icon: '🌾' },
  { key: 'material', label: '基础材料', icon: '🧺' },
  { key: 'crafted', label: '加工制品', icon: '⚒️' },
  { key: 'gift', label: '访客赠礼', icon: '🎁' },
];

export default function BackpackPanel({ progress }: BackpackPanelProps) {
  // 按分类整理背包中数量 > 0 的物品
  const grouped = useMemo(() => {
    const inventory = progress.inventory ?? {};
    const entries = Object.entries(inventory).filter(([, count]) => count > 0);
    const map: Record<ItemCategory, { id: string; count: number }[]> = { crop: [], material: [], crafted: [], gift: [] };
    for (const [itemId, count] of entries) {
      const item = getItemById(itemId);
      if (!item) continue;
      map[item.category].push({ id: itemId, count });
    }
    return map;
  }, [progress.inventory]);

  const totalKinds = Object.values(grouped).reduce((sum, list) => sum + list.length, 0);

  return (
    <div className="space-y-4">
      {/* 头部统计 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">行囊</p>
        <div className="text-xl font-serif text-foreground">
          <span className="text-primary">{totalKinds}</span>
          <span className="text-muted-foreground text-base"> 种物品</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-serif">
          收获作物、完成节气活动、访客相赠之物都会收进行囊；手工作坊制作需消耗背包中的材料
        </p>
      </div>

      {totalKinds === 0 ? (
        <div className="py-10 text-center">
          <div className="text-4xl mb-3 opacity-40">🧺</div>
          <p className="text-sm font-serif text-muted-foreground">行囊空空如也</p>
          <p className="text-xs text-muted-foreground/70 mt-1 font-serif">去菜畦种些作物，或赴节气活动看看</p>
        </div>
      ) : (
        <div className="max-h-[52vh] overflow-y-auto pr-2 -mr-2 space-y-4">
          {CATEGORY_META.map((cat) => {
            const list = grouped[cat.key];
            if (list.length === 0) return null;
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-sm">{cat.icon}</span>
                  <h4 className="text-xs font-serif text-foreground">{cat.label}</h4>
                  <span className="text-[10px] text-muted-foreground font-serif">({list.length})</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {list.map(({ id, count }) => {
                    const item = getItemById(id)!;
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.04 }}
                        className="relative p-2.5 rounded-sm border border-border/60 bg-card text-center"
                        title={`${item.description}\n来源：${item.source}`}
                      >
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <p className="text-[11px] font-serif text-foreground truncate">{item.name}</p>
                        <p className="text-[9px] text-muted-foreground truncate">{item.source}</p>
                        {/* 数量角标 */}
                        <span className={cn(
                          'absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full flex items-center justify-center text-[10px] font-bold',
                          count >= 10 ? 'bg-primary text-primary-foreground' : 'bg-card border border-primary/50 text-primary',
                        )}>
                          ×{count}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* 物品图鉴提示 */}
          <p className="text-[10px] text-muted-foreground font-serif">
            共收录 {MOCK_ITEMS.length} 种风物 · 部分赠礼只可珍藏，无法用于制作
          </p>
        </div>
      )}
    </div>
  );
}
