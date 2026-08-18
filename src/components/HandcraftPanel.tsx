import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { MOCK_HANDCRAFTS, type IHandcraft } from '@/data/handcrafts';
import { getItemById, type IItem } from '@/data/items';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface HandcraftPanelProps {
  progress: IGameProgress;
  onCraft: (handcraftId: string) => void;
}

type FilterType = 'all' | 'spring' | 'summer' | 'autumn' | 'winter';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'spring', label: '春' },
  { key: 'summer', label: '夏' },
  { key: 'autumn', label: '秋' },
  { key: 'winter', label: '冬' },
];

interface RecipeRow {
  itemId: string;
  need: number;
  have: number;
  enough: boolean;
  item?: IItem;
}

function buildRecipeRows(recipe: Record<string, number>, inventory: Record<string, number>): RecipeRow[] {
  return Object.entries(recipe).map(([itemId, need]) => {
    const have = inventory[itemId] ?? 0;
    return { itemId, need, have, enough: have >= need, item: getItemById(itemId) };
  });
}

const DIFFICULTY_COLOR: Record<string, string> = {
  易: 'text-emerald-700',
  中: 'text-amber-700',
  难: 'text-rose-700',
};

export default function HandcraftPanel({ progress, onCraft }: HandcraftPanelProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<IHandcraft | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_HANDCRAFTS;
    return MOCK_HANDCRAFTS.filter((h) => h.season === filter);
  }, [filter]);

  const canCraft = (hc: IHandcraft) => {
    if (progress.collectedArtifacts.includes(hc.id)) return false;
    return buildRecipeRows(hc.recipe, progress.inventory ?? {}).every((r) => r.enough);
  };

  const handleCraftClick = (hc: IHandcraft) => {
    onCraft(hc.id);
    setSelected(null);
    if (!progress.collectedArtifacts.includes(hc.id) && canCraft(hc)) {
      // 成功提示由 HomePage 统一处理；此处仅关闭详情
    } else if (!canCraft(hc)) {
      toast.error('背包材料不足，先去种植或收集吧');
    }
  };

  return (
    <div className="space-y-5">
      {/* 头部 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">手作工坊</p>
        <h3 className="text-lg font-serif text-foreground">
          已制 <span className="text-primary">{progress.collectedArtifacts.length}</span>
          <span className="text-muted-foreground text-base"> / {MOCK_HANDCRAFTS.length} 件</span>
        </h3>
        <p className="text-[10px] text-muted-foreground mt-1 font-serif">
          制作需消耗背包材料（作物收成 · 加工制品 · 访客赠礼）
        </p>
      </div>

      {/* 季节筛选 */}
      <div className="flex gap-1 justify-center">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-3 py-1.5 text-sm font-serif rounded-sm transition-all',
              filter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 手作列表 */}
      <div className="grid grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-2 -mr-2">
        {filtered.map((hc) => {
          const done = progress.collectedArtifacts.includes(hc.id);
          const rows = buildRecipeRows(hc.recipe, progress.inventory ?? {});
          const craftable = canCraft(hc);
          return (
            <motion.div
              key={hc.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(hc)}
              className={cn(
                'relative p-3 rounded-sm border transition-all cursor-pointer',
                done
                  ? 'border-primary/40 bg-primary/5'
                  : craftable
                    ? 'border-emerald-400/60 bg-card hover:border-primary/50'
                    : 'border-border/60 bg-card hover:border-primary/40',
              )}
            >
              <div className="flex items-start justify-between mb-1.5">
                <span className="text-2xl">{hc.icon}</span>
                <span className={cn('text-[10px] font-serif', DIFFICULTY_COLOR[hc.difficulty] ?? 'text-muted-foreground')}>
                  {hc.difficulty}
                </span>
              </div>
              <p className="text-sm font-serif text-foreground">{hc.name}</p>
              {/* 配方材料 */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {rows.map((r) => (
                  <span
                    key={r.itemId}
                    title={`${r.item?.name ?? r.itemId}：需 ${r.need}，已有 ${r.have}`}
                    className={cn(
                      'inline-flex items-center gap-0.5 px-1 py-0.5 rounded-sm text-[9px] font-serif border',
                      r.enough
                        ? 'border-emerald-500/40 bg-emerald-50 text-emerald-800'
                        : 'border-rose-400/40 bg-rose-50 text-rose-700',
                    )}
                  >
                    {r.item?.icon ?? '❓'}
                    {r.item?.name ?? r.itemId}
                    <span className={r.enough ? 'text-emerald-600' : 'text-rose-600'}>
                      {r.have}/{r.need}
                    </span>
                  </span>
                ))}
              </div>
              {/* 完成标记 */}
              {done && (
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">✓</div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-card rounded-sm border border-border shadow-xl p-4 sm:p-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                aria-label="关闭"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{selected.icon}</div>
                <h3 className="text-lg font-serif text-foreground">{selected.name}</h3>
                <p className={cn('text-xs font-serif mt-0.5', DIFFICULTY_COLOR[selected.difficulty] ?? 'text-muted-foreground')}>
                  {selected.difficulty}难度 · {selected.season === 'spring' ? '春' : selected.season === 'summer' ? '夏' : selected.season === 'autumn' ? '秋' : '冬'}季
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed font-serif mt-3">{selected.description}</p>
              </div>

              {/* 材料需求 */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-muted-foreground font-serif">所需材料（背包库存）：</p>
                {buildRecipeRows(selected.recipe, progress.inventory ?? {}).map((r) => (
                  <div
                    key={r.itemId}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-sm border text-sm font-serif',
                      r.enough ? 'border-emerald-500/40 bg-emerald-50/60' : 'border-rose-400/40 bg-rose-50/60',
                    )}
                  >
                    <span className="flex items-center gap-2 text-foreground">
                      <span className="text-lg">{r.item?.icon ?? '❓'}</span>
                      {r.item?.name ?? r.itemId}
                    </span>
                    <span className={r.enough ? 'text-emerald-700' : 'text-rose-700'}>
                      {r.have} / {r.need}
                    </span>
                  </div>
                ))}
                {selected.recipe && Object.keys(selected.recipe).length === 0 && (
                  <p className="text-sm text-muted-foreground">无需材料</p>
                )}
              </div>

              {progress.collectedArtifacts.includes(selected.id) ? (
                <button disabled className="w-full py-2.5 rounded-sm bg-muted text-muted-foreground font-serif cursor-not-allowed">
                  已制作 ✓
                </button>
              ) : canCraft(selected) ? (
                <button
                  onClick={() => handleCraftClick(selected)}
                  className="w-full py-2.5 rounded-sm bg-primary text-primary-foreground font-serif hover:bg-primary/90 transition-colors"
                >
                  开始制作（岁时值 +8）
                </button>
              ) : (
                <div>
                  <button disabled className="w-full py-2.5 rounded-sm bg-muted text-muted-foreground font-serif cursor-not-allowed">
                    材料不足，无法制作
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center mt-1.5 font-serif">
                    缺少：{buildRecipeRows(selected.recipe, progress.inventory ?? {}).filter((r) => !r.enough).map((r) => r.item?.name ?? r.itemId).join('、')}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
