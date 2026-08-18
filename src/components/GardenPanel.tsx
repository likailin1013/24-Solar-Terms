import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import type { IGameProgress } from '@/hooks/useGameProgress';
import type { ISolarTerm } from '@/data/solarTerms';
import { MOCK_DECORATIONS } from '@/data/decorations';
import { MOCK_CROPS, getCropsByTermId, getCropById, getCropStage, getCropRemainSec, formatGrowthTime, type ICrop } from '@/data/crops';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface GardenPanelProps {
  progress: IGameProgress;
  currentTerm: ISolarTerm;
  onSetDecoration: (slotId: string, decorId: string | null) => void;
  onPlant: (plotId: string, cropId: string) => void;
  onHarvest: (plotId: string) => void;
  /** 初始激活标签（配合 key 使用可强制切换） */
  initialTab?: GardenTab;
}

interface GardenArea {
  id: string; name: string; icon: string;
  x: number; y: number; description: string;
}

const GARDEN_AREAS: GardenArea[] = [
  { id: 'caiqi', name: '菜畦', icon: '🥬', x: 15, y: 60, description: '种植时令蔬菜的田地' },
  { id: 'huapu', name: '花圃', icon: '🌸', x: 35, y: 50, description: '四季花卉盛开之处' },
  { id: 'chitang', name: '池塘', icon: '🪷', x: 60, y: 70, description: '养鱼种荷的一方池塘' },
  { id: 'chating', name: '茶亭', icon: '🏯', x: 75, y: 35, description: '煮茶品茗的小亭' },
  { id: 'zhuli', name: '竹篱', icon: '🎋', x: 10, y: 30, description: '围绕庭院的竹篱笆' },
  { id: 'shijing', name: '石径', icon: '🪨', x: 50, y: 85, description: '通往院门的石板小路' },
];

const DECOR_SLOTS = [
  { id: 'slot-1', x: 22, y: 45, label: '左院' },
  { id: 'slot-2', x: 42, y: 38, label: '中庭左' },
  { id: 'slot-3', x: 58, y: 55, label: '中庭右' },
  { id: 'slot-4', x: 78, y: 50, label: '右院' },
  { id: 'slot-5', x: 30, y: 72, label: '南角' },
  { id: 'slot-6', x: 68, y: 78, label: '东南角' },
];

const PLOT_IDS = ['plot-1', 'plot-2', 'plot-3', 'plot-4', 'plot-5', 'plot-6'];

const STAGE_LABEL = { seed: '种子', growing: '生长', ripe: '成熟' } as const;
const STAGE_ICON = { seed: '🌱', growing: '🌿', ripe: '✨' } as const;

type GardenTab = 'decorate' | 'plant';

export default function GardenPanel({ progress, currentTerm, onSetDecoration, onPlant, onHarvest, initialTab = 'decorate' }: GardenPanelProps) {
  const [tab, setTab] = useState<GardenTab>(initialTab);
  const [selectedArea, setSelectedArea] = useState<GardenArea | null>(null);
  const [showDecorPicker, setShowDecorPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [decorFilter, setDecorFilter] = useState<string>('all');
  // 种植状态
  const [now, setNow] = useState(Date.now());
  const [plantPlot, setPlantPlot] = useState<string | null>(null);

  // 每秒刷新，驱动生长进度
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const placedCount = Object.keys(progress.decorations).length;
  const filteredDecor = decorFilter === 'all'
    ? MOCK_DECORATIONS
    : MOCK_DECORATIONS.filter((d) => d.season === decorFilter);

  const handleSlotClick = (slotId: string) => { setSelectedSlot(slotId); setShowDecorPicker(true); };
  const handlePlaceDecor = (decorId: string) => {
    if (selectedSlot) { onSetDecoration(selectedSlot, decorId); setShowDecorPicker(false); setSelectedSlot(null); }
  };
  const handleRemoveDecor = (slotId: string) => { onSetDecoration(slotId, null); };

  const calculatedBeauty = Object.entries(progress.decorations).reduce((score, [, decorId]) => {
    const decor = MOCK_DECORATIONS.find((d) => d.id === decorId);
    return decor ? score + decor.beautyValue + (decor.season === currentTerm.season ? 2 : 0) : score;
  }, 0);

  // —— 种植 ——
  const termCrops = getCropsByTermId(currentTerm.id);
  const plantedCount = Object.keys(progress.crops).length;

  const handlePlant = (cropId: string) => {
    if (plantPlot) {
      onPlant(plantPlot, cropId);
      const crop = getCropById(cropId);
      if (crop) {
        toast.info(`已种下${crop.name}，约 ${formatGrowthTime(crop.growthSec)} 后成熟`);
      }
      setPlantPlot(null);
    }
  };

  const handleHarvest = (plotId: string) => {
    const planted = progress.crops[plotId];
    if (!planted) return;
    const crop = getCropById(planted.cropId);
    if (!crop) return;
    onHarvest(plotId);
  };

  return (
    <div className="space-y-5">
      {/* 标题 */}
      <div className="text-center pb-3 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">庭院</p>
        <h3 className="text-lg font-serif text-foreground">{currentTerm.name}·庭院</h3>
      </div>

      {/* 标签页 */}
      <div className="flex gap-1 border-b border-border/50">
        {([{ key: 'decorate', label: '布置' }, { key: 'plant', label: '种植' }] as { key: GardenTab; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn('flex-1 px-4 py-2 text-sm font-serif transition-all relative', tab === t.key ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
          >
            {t.label}
            {tab === t.key && <motion.div layoutId="garden-tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      {tab === 'decorate' && (
        <>
          {/* 庭院俯视图 */}
          <div
            className="relative w-full aspect-[4/3] rounded-sm border border-border/60 overflow-hidden"
            style={{ background: 'linear-gradient(180deg, var(--muted) 0%, hsl(from var(--muted) h s calc(l - 3%)) 100%)' }}
          >
            {/* 远山 */}
            <svg className="absolute top-0 left-0 w-full h-1/3" viewBox="0 0 400 120" preserveAspectRatio="none">
              <path d="M0,120 L50,60 L100,90 L160,40 L220,80 L280,50 L340,70 L400,45 L400,120 Z" fill="hsl(210 15% 85%)" opacity="0.5" />
              <path d="M0,120 L80,80 L150,100 L220,65 L300,90 L400,70 L400,120 Z" fill="hsl(210 15% 80%)" opacity="0.4" />
            </svg>

            {/* 院墙 */}
            <div className="absolute top-[20%] left-[5%] right-[5%] h-1 border-b border-dashed border-border/60" />
            <div className="absolute top-[20%] left-[5%] bottom-[10%] w-1 border-r border-dashed border-border/60" />
            <div className="absolute top-[20%] right-[5%] bottom-[10%] w-1 border-l border-dashed border-border/60" />
            <div className="absolute bottom-[10%] left-[5%] right-[5%] h-1 border-t border-dashed border-border/60" />

            {/* 区域点 */}
            {GARDEN_AREAS.map((area) => (
              <motion.button
                key={area.id}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedArea(area)}
                className={cn(
                  'absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all border-2',
                  selectedArea?.id === area.id ? 'bg-primary/20 border-primary scale-110' : 'bg-card/80 border-border hover:border-primary/50',
                )}
                style={{ left: `${area.x}%`, top: `${area.y}%` }}
              >
                {area.icon}
                <span className="absolute -bottom-5 text-xs font-serif text-foreground whitespace-nowrap">{area.name}</span>
              </motion.button>
            ))}

            {/* 装饰物槽位 */}
            {DECOR_SLOTS.map((slot) => {
              const placedDecorId = progress.decorations[slot.id];
              const decor = placedDecorId ? MOCK_DECORATIONS.find((d) => d.id === placedDecorId) : null;
              return (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSlotClick(slot.id)}
                  className={cn(
                    'absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center transition-all border text-lg',
                    decor ? 'bg-primary/15 border-primary/50' : 'bg-card/60 border-dashed border-border/40 text-sm text-muted-foreground/50 hover:border-primary/40',
                  )}
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                >
                  {decor ? (
                    <span className="relative">
                      {decor.icon}
                      <span onClick={(e) => { e.stopPropagation(); handleRemoveDecor(slot.id); }}
                        className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-destructive/80 text-white rounded-full text-[8px] flex items-center justify-center cursor-pointer hover:bg-destructive"
                      >×</span>
                    </span>
                  ) : '+'}
                </motion.button>
              );
            })}

            {/* 美观度 */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-card/90 rounded-sm text-xs font-serif text-foreground border border-border/60">
              美观度 <span className="text-primary">{calculatedBeauty}</span>
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground/60 font-serif whitespace-nowrap">
              点击虚线框放置装饰物
            </div>
          </div>

          {/* 装饰物选择弹窗 */}
          <AnimatePresence>
            {showDecorPicker && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-card border border-border rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-foreground text-sm">选择装饰物</h4>
                  <button onClick={() => { setShowDecorPicker(false); setSelectedSlot(null); }} className="p-1 hover:bg-accent/50 rounded-sm text-muted-foreground"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-1 mb-3">
                  {[{ key: 'all', label: '全部' }, { key: 'spring', label: '春' }, { key: 'summer', label: '夏' }, { key: 'autumn', label: '秋' }, { key: 'winter', label: '冬' }].map((f) => (
                    <button key={f.key} onClick={() => setDecorFilter(f.key)}
                      className={cn('px-2 py-1 text-xs font-serif rounded-sm transition-all', decorFilter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground')}
                    >{f.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
                  {filteredDecor.map((decor) => {
                    const isPlaced = Object.values(progress.decorations).includes(decor.id);
                    return (
                      <motion.button key={decor.id} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handlePlaceDecor(decor.id)} disabled={isPlaced}
                        className={cn('p-2 rounded-sm border text-center transition-all', isPlaced ? 'border-border/30 bg-muted/30 opacity-40 cursor-not-allowed' : 'border-border/60 hover:border-primary/40 bg-card cursor-pointer')}
                      >
                        <div className="text-xl mb-1">{decor.icon}</div>
                        <p className="text-[10px] font-serif text-foreground truncate">{decor.name}</p>
                        <p className="text-[9px] text-muted-foreground">+{decor.beautyValue}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 选中区域详情 */}
          {selectedArea && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-primary/5 border border-primary/30 rounded-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{selectedArea.icon}</span>
                <div>
                  <h4 className="font-serif text-foreground">{selectedArea.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedArea.description}</p>
                </div>
              </div>
              {selectedArea.id === 'caiqi' && <p className="text-sm text-foreground/80">菜畦里可以种植当季作物，切到"种植"标签试试。</p>}
              {selectedArea.id === 'huapu' && <p className="text-sm text-foreground/80">{currentTerm.season === 'spring' && '迎春、桃花次第开放。'}{currentTerm.season === 'summer' && '荷花、紫薇盛开正艳。'}{currentTerm.season === 'autumn' && '桂花、菊花暗香浮动。'}{currentTerm.season === 'winter' && '蜡梅、山茶凌寒独开。'}</p>}
              {selectedArea.id === 'chitang' && <p className="text-sm text-foreground/80">一池清水，锦鲤游弋，{currentTerm.season === 'summer' ? '荷叶田田' : '水面如镜'}。</p>}
              {selectedArea.id === 'chating' && <p className="text-sm text-foreground/80">茶亭中煮着一壶{currentTerm.name}茶，香气四溢。</p>}
              {selectedArea.id === 'zhuli' && <p className="text-sm text-foreground/80">竹篱笆爬着藤蔓，隔出院中一方小天地。</p>}
              {selectedArea.id === 'shijing' && <p className="text-sm text-foreground/80">青石板铺就的小路，通向院外的山林。</p>}
            </motion.div>
          )}

          {/* 装饰统计 */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">已放置装饰</p>
              <p className="text-sm font-serif text-foreground">{placedCount} / {DECOR_SLOTS.length} 件</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">美观度评分</p>
              <p className="text-sm font-serif text-primary">{calculatedBeauty}</p>
            </div>
          </div>
        </>
      )}

      {tab === 'plant' && (
        <div className="space-y-4">
          {/* 菜畦地块 */}
          <div className="grid grid-cols-3 gap-3">
            {PLOT_IDS.map((plotId) => {
              const planted = progress.crops[plotId];
              const crop = planted ? getCropById(planted.cropId) : undefined;
              const stage = planted && crop ? getCropStage(crop, planted.plantedAt, now) : null;
              const remain = planted && crop ? getCropRemainSec(crop, planted.plantedAt, now) : 0;
              return (
                <motion.button
                  key={plotId}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!planted) setPlantPlot(plotId);
                    else if (stage === 'ripe') handleHarvest(plotId);
                  }}
                  className={cn(
                    'relative aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 transition-all overflow-hidden',
                    !planted
                      ? 'border-dashed border-border/50 bg-muted/20 hover:border-primary/50 cursor-pointer'
                      : stage === 'ripe'
                        ? 'border-primary/60 bg-primary/10 cursor-pointer hover:bg-primary/15'
                        : 'border-border/60 bg-card/60',
                  )}
                >
                  {!planted ? (
                    <>
                      <span className="text-2xl text-muted-foreground/50">＋</span>
                      <span className="text-[10px] font-serif text-muted-foreground">空地</span>
                    </>
                  ) : (
                    <>
                      <motion.span
                        animate={stage === 'ripe' ? { scale: [1, 1.12, 1] } : {}}
                        transition={stage === 'ripe' ? { repeat: Infinity, duration: 1.2 } : {}}
                        className="text-3xl"
                      >
                        {stage === 'ripe' ? STAGE_ICON.ripe : crop!.icon}
                      </motion.span>
                      <span className="text-[10px] font-serif text-foreground">{crop!.name}</span>
                      <span className={cn('text-[9px] font-serif', stage === 'ripe' ? 'text-primary' : 'text-muted-foreground')}>
                        {stage === 'ripe' ? '可收获 ✨' : `${STAGE_LABEL[stage!]} · ${formatGrowthTime(remain)}`}
                      </span>
                      {/* 生长进度条 */}
                      {stage !== 'ripe' && crop && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                          <div
                            className="h-full bg-primary/70 transition-all duration-1000"
                            style={{ width: `${Math.min(100, ((now - planted.plantedAt) / (crop.growthSec * 1000)) * 100)}%` }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* 种植统计 */}
          <div className="p-3 bg-muted/30 rounded-sm flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-serif">已种植 {plantedCount} / {PLOT_IDS.length} 块</p>
            <p className="text-xs text-muted-foreground font-serif">成熟后点击地块即可收获</p>
          </div>

          {/* 当季可种作物 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-serif">
              当季可种（{currentTerm.name}）：错过节气需等来年
            </p>
            <div className="grid grid-cols-3 gap-2">
              {termCrops.map((crop) => (
                <motion.div key={crop.id} whileHover={{ scale: 1.05 }} className="p-2 rounded-sm border border-border/60 bg-card text-center">
                  <div className="text-2xl mb-1">{crop.icon}</div>
                  <p className="text-xs font-serif text-foreground">{crop.name}</p>
                  <p className="text-[9px] text-muted-foreground">约 {formatGrowthTime(crop.growthSec)} 成熟</p>
                  <p className="text-[9px] text-muted-foreground">产出 {crop.yields.map((y) => `${y.name}×${y.count}`).join(' ')}</p>
                </motion.div>
              ))}
            </div>
            {termCrops.length === 0 && (
              <p className="text-xs text-muted-foreground font-serif">本节气暂无作物可种，去节气轮盘换一个节气试试。</p>
            )}
          </div>

          {/* 作物选择弹窗 */}
          <AnimatePresence>
            {plantPlot && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-card border border-border rounded-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-foreground text-sm">在地块 {plantPlot.replace('plot-', '#')} 种植</h4>
                  <button onClick={() => setPlantPlot(null)} className="p-1 hover:bg-accent/50 rounded-sm text-muted-foreground"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto">
                  {termCrops.map((crop: ICrop) => (
                    <motion.button key={crop.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlant(crop.id)}
                      className="p-3 rounded-sm border border-border/60 hover:border-primary/50 bg-card text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{crop.icon}</span>
                        <span className="text-sm font-serif text-foreground">{crop.name}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-1">{crop.description}</p>
                      <p className="text-[10px] text-muted-foreground">成熟约 {formatGrowthTime(crop.growthSec)} · 产出 {crop.yields.map((y) => `${y.name}×${y.count}`).join(' ')}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 已收集作物 */}
          <div className="p-3 bg-accent/30 rounded-sm">
            <p className="text-xs text-muted-foreground mb-1">已收录作物（{progress.collectedCrops.length} / {MOCK_CROPS.length}）</p>
            <div className="flex flex-wrap gap-1.5">
              {progress.collectedCrops.map((id) => {
                const [, name] = id.split('-');
                return <span key={id} className="text-[10px] px-1.5 py-0.5 bg-card border border-border/60 rounded-sm font-serif text-foreground/80">{name}</span>;
              })}
              {progress.collectedCrops.length === 0 && <span className="text-[10px] text-muted-foreground font-serif">尚未收获过作物</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
