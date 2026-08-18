import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_SOLAR_TERMS, type ISolarTerm } from '@/data/solarTerms';
import { useGameProgress } from '@/hooks/useGameProgress';
import { getSeasonImage, CHARACTER_IMAGE } from '@/lib/season-images';
import { MOCK_VISITORS } from '@/data/visitors';
import { MOCK_FLOWERS } from '@/data/flowers';
import { getCropById } from '@/data/crops';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import ParticleLayer from '@/components/ParticleLayer';
import TermTimeline from '@/components/TermTimeline';
import TermDetailPanel from '@/components/TermDetailPanel';
import SolarWheel from '@/components/SolarWheel';
import ScrollPanel from '@/components/ScrollPanel';
import HandbookPanel from '@/components/HandbookPanel';
import VisitorsPanel from '@/components/VisitorsPanel';
import ActivityGame from '@/components/ActivityGame';
import GardenPanel from '@/components/GardenPanel';
import HandcraftPanel from '@/components/HandcraftPanel';
import BackpackPanel from '@/components/BackpackPanel';
import SettingsPanel from '@/components/SettingsPanel';
import StatusBar from '@/components/StatusBar';
import SealButtons, { type PanelType } from '@/components/SealButtons';
import SealStamp from '@/components/SealStamp';
import { Sparkles } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const {
    progress,
    completeActivity,
    collectPhenology,
    collectFood,
    collectFlower,
    meetVisitor,
    setCurrentTerm,
    setDecoration,
    plantCrop,
    harvestCrop,
    boostAffinity,
    craftHandcraft,
    grantVisitorGift,
    resetProgress,
  } = useGameProgress();

  // 当前节气
  const currentTerm = useMemo<ISolarTerm>(
    () => MOCK_SOLAR_TERMS.find((t) => t.id === progress.currentTermId) ?? MOCK_SOLAR_TERMS[0],
    [progress.currentTermId],
  );

  // 当前节气访客
  const currentVisitor = useMemo(
    () => MOCK_VISITORS.find((v) => v.id === currentTerm.visitor),
    [currentTerm],
  );

  // 面板状态
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [stampText, setStampText] = useState('岁时记');
  // 庭院面板初始标签（由庭院热区切换）
  const [gardenTab, setGardenTab] = useState<'decorate' | 'plant'>('decorate');

  // 打开庭院面板并指定标签
  const handleOpenGarden = useCallback((tab: 'decorate' | 'plant') => {
    setGardenTab(tab);
    setActivePanel('garden');
    setShowDetail(false);
  }, []);

  // 收获作物（提示文案由当前进度构建）
  const handleHarvest = useCallback((plotId: string) => {
    const planted = progress.crops[plotId];
    const crop = planted ? getCropById(planted.cropId) : undefined;
    harvestCrop(plotId);
    if (crop) {
      const parts = crop.yields.map((y) => `${y.name}×${y.count}`).join('、');
      toast.success(`收获 ${crop.name}：${parts}，岁时值 +${crop.yields.length * 3}`);
      setStampText('收获');
      setShowStamp(true);
      setTimeout(() => setShowStamp(false), 1200);
    }
  }, [harvestCrop, progress.crops]);

  // 活动小游戏状态
  const [activeGame, setActiveGame] = useState<{ id: string; name: string; icon: string } | null>(null);

  // 启动活动小游戏
  const handleStartActivity = useCallback((activityId: string) => {
    const act = currentTerm.activities.find((a) => a.id === activityId);
    if (!act) return;
    const isDone = progress.completedActivities.includes(activityId);
    if (isDone) return;
    setActiveGame({ id: act.id, name: act.name, icon: act.icon });
  }, [currentTerm.activities, progress.completedActivities]);

  // 切换节气
  const handleSelectTerm = useCallback((term: ISolarTerm) => {
    setCurrentTerm(term.id);
    setShowDetail(true);

    // 切换节气自动解锁物候第一候（走过路过见过）
    setTimeout(() => {
      collectPhenology(term.id, 0);
      // 尝试解锁对应花卉
      const seasonFlower = MOCK_FLOWERS.find((f) => f.season === term.season);
      if (seasonFlower) {
        collectFlower(seasonFlower.id);
      }
      // 访客相遇
      if (term.visitor) {
        const wasMet = progress.metVisitors.includes(term.visitor);
        meetVisitor(term.visitor);
        if (!wasMet) {
          const v = MOCK_VISITORS.find((x) => x.id === term.visitor);
          toast(`新访客到访：${v?.name ?? '山中客'}`, {
            description: v?.title,
            icon: '👤',
          });
        }
      }
    }, 300);
  }, [setCurrentTerm, collectPhenology, collectFlower, meetVisitor, progress.metVisitors]);

  // 完成活动（从小游戏回调）
  const handleToggleActivity = useCallback((activityId: string) => {
    const isDone = progress.completedActivities.includes(activityId);
    if (isDone) return; // 不支持撤销

    completeActivity(activityId, currentTerm.id, 10);
    setStampText('节气乐事');
    setShowStamp(true);
    toast.success('活动完成，岁时值 +10');
    setActiveGame(null);
    setTimeout(() => setShowStamp(false), 1500);
  }, [completeActivity, currentTerm.id, progress.completedActivities]);

  const handleCollectFood = useCallback((foodName: string) => {
    const foodId = `${currentTerm.id}-${foodName}`;
    if (progress.collectedFoods.includes(foodId)) return;
    collectFood(currentTerm.id, foodName);
    setStampText('食膳');
    setShowStamp(true);
    toast.success(`收录 ${foodName}，岁时值 +5`);
    setTimeout(() => setShowStamp(false), 1200);
  }, [collectFood, currentTerm.id, progress.collectedFoods]);

  const handleCollectPhenology = useCallback((index: number) => {
    const pId = `${currentTerm.id}-${index}`;
    if (progress.collectedPhenology.includes(pId)) return;
    collectPhenology(currentTerm.id, index);
    setStampText('物候');
    setShowStamp(true);
    toast.success(`收录 ${currentTerm.phenology[index].name}，岁时值 +5`);
    setTimeout(() => setShowStamp(false), 1200);
  }, [collectPhenology, currentTerm, progress.collectedPhenology]);

  const handleCraft = useCallback((artifactId: string) => {
    const ok = craftHandcraft(artifactId);
    if (!ok) {
      toast.error('背包材料不足，无法制作');
      return;
    }
    setStampText('手作');
    setShowStamp(true);
    toast.success('制作完成，岁时值 +8');
    setTimeout(() => setShowStamp(false), 1200);
  }, [craftHandcraft]);

  const handleReset = useCallback(() => {
    if (confirm('确定要重置所有游戏进度吗？此操作不可撤销。')) {
      resetProgress();
      toast.info('游戏进度已重置');
      setActivePanel(null);
    }
  }, [resetProgress]);

  const handleTogglePanel = useCallback((panel: PanelType) => {
    setActivePanel(panel);
    if (panel) setShowDetail(false);
  }, []);

  // 初次进入显示默认节气的访客信息
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentVisitor && !progress.metVisitors.includes(currentVisitor.id)) {
        meetVisitor(currentVisitor.id);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const seasonBg = {
    spring: 'from-[hsl(90_50%_94%)] via-[hsl(45_35%_96%)] to-[hsl(42_30%_94%)]',
    summer: 'from-[hsl(175_40%_92%)] via-[hsl(45_35%_96%)] to-[hsl(42_30%_94%)]',
    autumn: 'from-[hsl(42_75%_92%)] via-[hsl(45_35%_96%)] to-[hsl(42_30%_94%)]',
    winter: 'from-[hsl(210_20%_95%)] via-[hsl(45_35%_96%)] to-[hsl(42_30%_94%)]',
  }[currentTerm.season];

  return (
    <div className={cn(
      'min-h-screen w-full bg-gradient-to-b transition-colors duration-1000 relative overflow-x-hidden pt-12 md:pt-14',
      seasonBg,
    )}
    >
      {/* 顶部状态栏 */}
      <StatusBar term={currentTerm} yearValue={progress.yearValue} />

      {/* 宣纸纹理 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 粒子层 */}
      <ParticleLayer season={currentTerm.season} />

      {/* 顶部标题区 */}
      <header className="relative z-20 pt-8 pb-4 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-[0.3em] mb-2">
            岁时记
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-serif tracking-widest">
            春耕夏耘 秋收冬藏 一岁四时 自有清欢
          </p>
        </motion.div>

        {/* 岁时值显示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-card/70 backdrop-blur-sm rounded-full border border-border/60"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-serif text-foreground">
            岁时值 <span className="text-primary font-bold">{progress.yearValue}</span>
          </span>
        </motion.div>
      </header>

      {/* 主场景区域 */}
      <main className="relative z-10 px-4 md:px-8 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* 庭院场景图 */}
          <motion.div
            key={currentTerm.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative rounded-sm overflow-hidden border border-border/50 shadow-xl mb-6 aspect-[4/3] sm:aspect-[16/9]"
          >
            <Image
              src={getSeasonImage(currentTerm.season)}
              alt={`${currentTerm.name}庭院`}
              className="w-full h-full object-cover"
            />

            {/* 渐变蒙层 */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/10" />

            {/* 庭院可交互热区：点击打开对应面板 */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {([
                { id: 'caiqi', icon: '🥬', label: '菜畦·种植', left: '20%', top: '72%', onClick: () => handleOpenGarden('plant') },
                { id: 'huapu', icon: '🌸', label: '花圃·风物', left: '38%', top: '56%', onClick: () => setActivePanel('handbook') },
                { id: 'chitang', icon: '🪷', label: '池塘', left: '63%', top: '74%', onClick: () => setShowDetail(true) },
                { id: 'chating', icon: '🏯', label: '茶亭·时令', left: '81%', top: '40%', onClick: () => setShowDetail(true) },
              ] as { id: string; icon: string; label: string; left: string; top: string; onClick: () => void }[]).map((zone) => (
                <motion.button
                  key={zone.id}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={zone.onClick}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/60 text-xs font-serif text-foreground shadow-sm hover:border-primary/60 hover:bg-card transition-all"
                  style={{ left: zone.left, top: zone.top }}
                >
                  <span>{zone.icon}</span>
                  <span className="hidden sm:inline">{zone.label}</span>
                </motion.button>
              ))}
            </div>

            {/* 节气信息（左上） */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
              <motion.div
                key={currentTerm.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-card/80 backdrop-blur-sm p-4 rounded-sm border border-border/50 shadow-lg max-w-[220px]"
              >
                <div className="text-xs text-muted-foreground mb-1 font-serif">
                  {currentTerm.dateRange}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2 tracking-wider">
                  {currentTerm.name}
                </h2>
                <div className="text-sm text-primary font-serif mb-2">
                  {currentTerm.weather}
                </div>
                <div className="text-xs text-foreground/70 font-serif leading-relaxed">
                  物候 · {currentTerm.phenology[0].name}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {currentTerm.activities.slice(0, 2).map((a) => (
                    <span
                      key={a.id}
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-sm font-serif"
                    >
                      宜{a.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 当前访客（右上） */}
            {currentVisitor && (
              <motion.div
                key={`visitor-${currentTerm.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10"
              >
                <div className="bg-card/80 backdrop-blur-sm p-3 rounded-sm border border-border/50 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-border/60 overflow-hidden shrink-0">
                    <Image
                      src={CHARACTER_IMAGE}
                      alt={currentVisitor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-serif text-foreground truncate">
                      {currentVisitor.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {currentVisitor.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 诗词（底部中央） */}
            <motion.div
              key={`poem-${currentTerm.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4"
            >
              <p className="text-base md:text-xl font-serif text-foreground/90 drop-shadow-lg tracking-wider">
                「{currentTerm.poem}」
              </p>
            </motion.div>

            {/* 点击查看详情提示 */}
            <button
              onClick={() => setShowDetail(true)}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-sm border border-border/50 text-sm font-serif text-foreground hover:bg-card transition-colors"
            >
              查看详情 →
            </button>
          </motion.div>

          {/* 节气时间轴 */}
          <div className="bg-card/60 backdrop-blur-sm rounded-sm border border-border/50 shadow-md">
            <TermTimeline currentTerm={currentTerm} onSelect={handleSelectTerm} />
          </div>
        </div>
      </main>

      {/* 右侧印章按钮 */}
      <SealButtons activePanel={activePanel} onToggle={handleTogglePanel} />

      {/* 节气轮盘 */}
      <AnimatePresence>
        {activePanel === 'wheel' && (
          <SolarWheel
            currentTermId={progress.currentTermId}
            onSelectTerm={(term) => {
              handleSelectTerm(term);
              setActivePanel(null);
            }}
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>

      {/* 节气详情面板（居中弹窗） */}
      <ScrollPanel
        open={showDetail}
        onClose={() => setShowDetail(false)}
        title={`${currentTerm.name} · 时令`}
        subtitle={currentTerm.description}
        side="center"
        widthClass="w-full md:w-[520px] lg:w-[580px]"
      >
        <TermDetailPanel
          term={currentTerm}
          progress={progress}
          onStartActivity={handleStartActivity}
          onToggleActivity={handleToggleActivity}
          onCollectFood={handleCollectFood}
          onCollectPhenology={handleCollectPhenology}
        />
      </ScrollPanel>

      {/* 风物志面板 */}
      <ScrollPanel
        open={activePanel === 'handbook'}
        onClose={() => setActivePanel(null)}
        title="风物志"
        subtitle="收录四时风物"
        side="right"
      >
        <HandbookPanel progress={progress} />
      </ScrollPanel>

      {/* 庭院面板 */}
      <ScrollPanel
        open={activePanel === 'garden'}
        onClose={() => setActivePanel(null)}
        title="庭院"
        subtitle="一方小院 四时清欢"
        side="right"
      >
        <GardenPanel
          key={gardenTab}
          progress={progress}
          currentTerm={currentTerm}
          onSetDecoration={setDecoration}
          onPlant={plantCrop}
          onHarvest={handleHarvest}
          initialTab={gardenTab}
        />
      </ScrollPanel>

      {/* 手作面板 */}
      <ScrollPanel
        open={activePanel === 'handcraft'}
        onClose={() => setActivePanel(null)}
        title="手作工坊"
        subtitle="以背包之物，制四时器物"
        side="right"
      >
        <HandcraftPanel progress={progress} onCraft={handleCraft} />
      </ScrollPanel>

      {/* 背包面板 */}
      <ScrollPanel
        open={activePanel === 'backpack'}
        onClose={() => setActivePanel(null)}
        title="背包"
        subtitle="行囊所载，皆四时风物"
        side="right"
      >
        <BackpackPanel progress={progress} />
      </ScrollPanel>

      {/* 访客面板 */}
      <ScrollPanel
        open={activePanel === 'visitors'}
        onClose={() => setActivePanel(null)}
        title="山中访客"
        subtitle="往来无白丁"
        side="right"
      >
        <VisitorsPanel progress={progress} onBoostAffinity={boostAffinity} onGift={grantVisitorGift} />
      </ScrollPanel>

      {/* 设置面板 */}
      <ScrollPanel
        open={activePanel === 'settings'}
        onClose={() => setActivePanel(null)}
        title="设置"
        subtitle="游戏选项"
        side="right"
        widthClass="w-full md:w-[380px]"
      >
        <SettingsPanel yearValue={progress.yearValue} onReset={handleReset} />
      </ScrollPanel>

      {/* 活动互动小游戏 */}
      <AnimatePresence>
        {activeGame && (
          <ActivityGame
            activityId={activeGame.id}
            activityName={activeGame.name}
            activityIcon={activeGame.icon}
            onComplete={() => handleToggleActivity(activeGame.id)}
            onClose={() => setActiveGame(null)}
          />
        )}
      </AnimatePresence>

      {/* 盖章动画 */}
      <SealStamp show={showStamp} text={stampText} />

      {/* 底部装饰线（移动端为底部按钮栏留白） */}
      <div className="relative z-10 pt-4 pb-24 md:pb-6 text-center">
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-border to-transparent mb-3" />
        <p className="text-xs text-muted-foreground font-serif tracking-widest">
          岁时记 · 二十四节气
        </p>
      </div>
    </div>
  );
}
