import { motion } from 'framer-motion';
import { Sparkles, Sun, Cloud, CloudRain, CloudSnow, CloudFog, Wind } from 'lucide-react';
import type { ISolarTerm } from '@/data/solarTerms';
import { SEASONS, SEASON_COLORS } from '@/data/solarTerms';

interface StatusBarProps {
  term: ISolarTerm;
  yearValue: number;
  maxYearValue?: number;
}

const weatherIconMap: Record<string, typeof Sun> = {
  '东风解冻': Sun,
  '细雨绵绵': CloudRain,
  '春雷乍响': Cloud,
  '天降甘霖': CloudRain,
  '清明气清': Sun,
  '谷雨生百谷': CloudRain,
  '夏意渐浓': Sun,
  '物致于此': Sun,
  '有芒之谷': Sun,
  '日长之至': Sun,
  '暑气初至': Sun,
  '暑气至浓': Sun,
  '秋意初生': Wind,
  '暑气渐消': Wind,
  '露凝而白': CloudFog,
  '秋意平分': Sun,
  '露气寒冷': CloudFog,
  '气肃而凝': CloudFog,
  '水始冰': CloudSnow,
  '地始冻': CloudSnow,
  '虹藏不见': CloudSnow,
  '大雪纷飞': CloudSnow,
  '天寒地冻': CloudSnow,
  '小寒料峭': CloudFog,
  '大寒岁末': Wind,
};

// 等级里程碑（设计文档 1.3）
const LEVEL_MILESTONES: { lv: number; label: string }[] = [
  { lv: 1, label: '菜畦·茶亭' },
  { lv: 4, label: '花圃·池塘' },
  { lv: 7, label: '小溪·石桥' },
  { lv: 10, label: '梅林·茶室' },
  { lv: 13, label: '岁终团圆' },
];

/** 岁时值 → 等级（每 60 点升一级） */
function getLevel(yearValue: number): number {
  return Math.floor(yearValue / 60) + 1;
}

function getMilestone(level: number): string {
  let label = '菜畦·茶亭';
  for (const m of LEVEL_MILESTONES) {
    if (level >= m.lv) label = m.label;
  }
  return label;
}

export default function StatusBar({ term, yearValue, maxYearValue = 240 }: StatusBarProps) {
  const seasonColors = SEASON_COLORS[term.season];
  const WeatherIcon = weatherIconMap[term.weather] ?? Sun;
  const progressPct = Math.min((yearValue / maxYearValue) * 100, 100);
  const level = getLevel(yearValue);
  const milestone = getMilestone(level);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md border-b transition-colors duration-700"
      style={{
        backgroundColor: `color-mix(in srgb, ${seasonColors.bg}, transparent 30%)`,
        borderColor: seasonColors.border,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4">
        {/* 左侧：节气信息 */}
        <div className="flex items-center gap-3 min-w-0">
          {/* 季节色圆点 */}
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0 hidden sm:block"
            style={{ backgroundColor: seasonColors.accent }}
          />
          {/* 节气名称 */}
          <h1
            className="text-lg md:text-xl font-serif truncate"
            style={{ color: seasonColors.text }}
          >
            {term.name}
          </h1>
          {/* 季节 + 日期 */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span
              className="px-1.5 py-0.5 rounded-sm font-serif"
              style={{ backgroundColor: seasonColors.bg, color: seasonColors.text }}
            >
              {SEASONS[term.season]}季
            </span>
            <span className="text-muted-foreground font-serif">{term.dateRange}</span>
          </div>
        </div>

        {/* 中央：天气 */}
        <div className="flex items-center gap-1.5 text-sm text-foreground/70">
          <WeatherIcon className="w-4 h-4" style={{ color: seasonColors.text }} />
          <span className="font-serif hidden sm:inline">{term.weather}</span>
        </div>

        {/* 右侧：岁时值 */}
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground font-serif hidden sm:inline">岁时值</span>
              <span className="text-sm font-bold font-serif" style={{ color: seasonColors.text }}>
                {yearValue}
              </span>
            </div>
            {/* 等级里程碑 */}
            <div className="text-[10px] font-serif text-muted-foreground/80 mt-0.5 whitespace-nowrap">
              Lv{level} · {milestone}
            </div>
            {/* 进度条 */}
            <div className="w-20 md:w-28 h-1.5 bg-muted/60 rounded-full overflow-hidden mt-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, hsl(5 75% 45%), ${seasonColors.accent})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}