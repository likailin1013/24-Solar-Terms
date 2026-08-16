import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MOCK_SOLAR_TERMS, type ISolarTerm, SEASONS } from '@/data/solarTerms';
import { cn } from '@/lib/utils';

interface TermTimelineProps {
  currentTerm: ISolarTerm;
  onSelect: (term: ISolarTerm) => void;
}

export default function TermTimeline({ currentTerm, onSelect }: TermTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      {/* 左右渐隐 */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none px-6 py-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {MOCK_SOLAR_TERMS.map((term, idx) => {
          const isActive = term.id === currentTerm.id;
          const seasonColor = {
            spring: '#8FB96A',
            summer: '#6BA8A2',
            autumn: '#D4A853',
            winter: '#A0A8B2',
          }[term.season];

          return (
            <motion.button
              key={term.id}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(term)}
              className="flex flex-col items-center gap-2 shrink-0 group"
              aria-label={`选择${term.name}节气`}
            >
              {/* 印章式节气按钮 */}
              <div
                className={cn(
                  'relative w-14 h-14 rounded-full flex items-center justify-center text-sm font-serif transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110 ring-2 ring-primary/30 ring-offset-2 ring-offset-card'
                    : 'bg-card border-2 hover:border-primary/50 text-foreground group-hover:border-primary/70',
                )}
                style={{
                  borderColor: isActive ? undefined : seasonColor,
                }}
              >
                <span className="font-serif">{term.name}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"
                  />
                )}
              </div>
              {/* 季节标记 */}
              <span
                className="text-xs font-serif"
                style={{ color: seasonColor }}
              >
                {SEASONS[term.season]}
              </span>
              {/* 序号指示线 */}
              {idx < MOCK_SOLAR_TERMS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 w-3 h-px bg-border ml-14" style={{ display: 'none' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 底部回纹装饰 */}
      <div className="h-2 w-full bg-[repeating-linear-gradient(90deg,var(--border)_0_8px,transparent_8px_16px)] opacity-30" />
    </div>
  );
}
