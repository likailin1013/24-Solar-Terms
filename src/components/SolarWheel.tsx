import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_SOLAR_TERMS, type ISolarTerm, SEASONS, SEASON_COLORS } from '@/data/solarTerms';
import { cn } from '@/lib/utils';

interface SolarWheelProps {
  currentTermId: string;
  onSelectTerm: (term: ISolarTerm) => void;
  onClose: () => void;
}

const SEASON_ORDER = ['spring', 'summer', 'autumn', 'winter'] as const;

interface WheelTerm extends ISolarTerm {
  angle: number;
  seasonIdx: number;
}

export default function SolarWheel({ currentTermId, onSelectTerm, onClose }: SolarWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(() =>
    MOCK_SOLAR_TERMS.findIndex((t) => t.id === currentTermId),
  );

  const terms = useMemo<WheelTerm[]>(() => {
    const angleStep = 360 / MOCK_SOLAR_TERMS.length;
    return MOCK_SOLAR_TERMS.map((t, idx) => {
      let seasonIdx = 0;
      if (idx >= 6 && idx < 12) seasonIdx = 1;
      else if (idx >= 12 && idx < 18) seasonIdx = 2;
      else if (idx >= 18) seasonIdx = 3;
      return { ...t, angle: idx * angleStep, seasonIdx };
    });
  }, []);

  const currentTerm = terms[currentIndex];

  const rotateTo = (idx: number) => {
    setRotation(90 - terms[idx].angle);
    setCurrentIndex(idx);
  };

  const rotateStep = (dir: 1 | -1) => {
    rotateTo((currentIndex + dir + terms.length) % terms.length);
  };

  const handleSelect = () => onSelectTerm(terms[currentIndex]);
  const handleWheelClick = (idx: number) => rotateTo(idx);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[620px] rounded-sm border border-border bg-card shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-b from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-t from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)]" />

        <div className="relative pt-3 pb-3">
          <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-border/40">
            <div>
              <h2 className="text-lg font-serif text-foreground">二十四节气轮</h2>
              <p className="text-xs text-muted-foreground mt-0.5">拨动轮盘，选取时令</p>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-accent/50 rounded-sm text-muted-foreground" aria-label="关闭">✕</button>
          </div>

          <div className="relative mx-auto my-4 w-[min(78vw,400px)] aspect-square select-none">
            {/* 四季底色环 */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
              {SEASON_ORDER.map((season, si) => (
                <div key={season} className="absolute inset-0"
                  style={{ background: `conic-gradient(${SEASON_COLORS[season].accent} ${si * 90}deg ${(si + 1) * 90}deg, transparent ${(si + 1) * 90}deg)` }}
                />
              ))}
            </div>
            <div className="absolute inset-0 rounded-full transition-transform duration-700"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {terms.map((term, idx) => {
                const radius = 42;
                const cx = 50 + radius * Math.cos((term.angle * Math.PI) / 180);
                const cy = 50 + radius * Math.sin((term.angle * Math.PI) / 180);
                const isActive = idx === currentIndex;
                const seasonColor = SEASON_COLORS[term.season];
                return (
                  <motion.button key={term.id}
                    onClick={() => handleWheelClick(idx)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${cx}%`, top: `${cy}%` }}
                    aria-label={`选择${term.name}节气`}
                  >
                    <div className={cn('flex items-center justify-center rounded-full transition-all duration-300',
                      isActive ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 'bg-card/90 border text-foreground hover:border-primary/50')}
                      style={{ width: 44, height: 44, borderColor: isActive ? undefined : seasonColor.border }}
                    >
                      <span className="text-[13px] font-serif leading-tight">{term.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* 顶部指针 */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10" aria-hidden>
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary" />
            </div>

            {/* 中心信息 */}
            <div className="absolute inset-[22%] rounded-full bg-card/95 border border-border/60 shadow-inner flex flex-col items-center justify-center text-center px-4">
              <span className="text-xs text-muted-foreground font-serif">
                {SEASONS[currentTerm.season]}季 · {currentTerm.dateRange}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-foreground my-1">{currentTerm.name}</h3>
              <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3 font-serif">{currentTerm.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => rotateStep(-1)} className="px-2 py-1 rounded-sm border border-border/60 bg-card text-muted-foreground hover:text-foreground text-xs font-serif" aria-label="上一个节气">◀</button>
                <button onClick={handleSelect} className="px-3 py-1 rounded-sm bg-primary text-primary-foreground text-xs font-serif hover:bg-primary/90 transition-colors">进入此节气</button>
                <button onClick={() => rotateStep(1)} className="px-2 py-1 rounded-sm border border-border/60 bg-card text-muted-foreground hover:text-foreground text-xs font-serif" aria-label="下一个节气">▶</button>
              </div>
            </div>
          </div>

          {/* 底部三候信息 */}
          <div className="px-5 pb-4">
            <div className="grid grid-cols-3 gap-2">
              {currentTerm.phenology.map((p, pi) => (
                <div key={pi} className="p-2 rounded-sm bg-muted/40 border border-border/50 text-center">
                  <p className="text-[10px] text-muted-foreground font-serif mb-0.5">{['初候', '二候', '三候'][pi]}</p>
                  <p className="text-xs font-serif text-foreground">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}