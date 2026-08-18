import { motion, AnimatePresence } from 'framer-motion';
import { Book, Flower2, Users, Home, Hammer, Settings, RefreshCw, Backpack } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PanelType = 'wheel' | 'handbook' | 'garden' | 'handcraft' | 'visitors' | 'settings' | 'backpack' | null;

interface SealButtonsProps {
  activePanel: PanelType;
  onToggle: (panel: PanelType) => void;
}

const BUTTONS: { key: Exclude<PanelType, null>; label: string; icon: typeof Book }[] = [
  { key: 'wheel', label: '节气轮', icon: RefreshCw },
  { key: 'handbook', label: '风物志', icon: Book },
  { key: 'garden', label: '庭院', icon: Home },
  { key: 'handcraft', label: '手作', icon: Hammer },
  { key: 'backpack', label: '背包', icon: Backpack },
  { key: 'visitors', label: '访客', icon: Users },
  { key: 'settings', label: '设置', icon: Settings },
];

export default function SealButtons({ activePanel, onToggle }: SealButtonsProps) {
  return (
    <div className="fixed z-30 flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-[calc(100vw-1.5rem)] bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 lg:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col md:bottom-auto md:max-w-none">
      {BUTTONS.map((btn) => {
        const Icon = btn.icon;
        const isActive = activePanel === btn.key;
        return (
          <motion.button
            key={btn.key}
            whileHover={{ scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(isActive ? null : btn.key)}
            className={cn(
              'group relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all border-2',
              isActive
                ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110 rotate-3'
                : 'bg-card/90 backdrop-blur-sm border-border hover:border-primary/60 text-foreground',
            )}
            aria-label={btn.label}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />

            {/* 悬停标签：移动端显示在上方，桌面端显示在左侧 */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-card border border-border rounded-sm text-xs font-serif whitespace-nowrap text-foreground md:-top-auto md:right-full md:mr-3 md:left-auto md:translate-x-0"
                >
                  {btn.label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 印章纹理 */}
            <div className={cn(
              'absolute inset-1 rounded-full border border-current/20 pointer-events-none',
              isActive ? 'text-primary-foreground/40' : 'text-primary/20',
            )} />
          </motion.button>
        );
      })}

      {/* 装饰花形 */}
      <div className="hidden md:block flex justify-center mt-1">
        <Flower2 className="w-4 h-4 text-muted-foreground/40" />
      </div>
    </div>
  );
}
