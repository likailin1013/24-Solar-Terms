import { motion, AnimatePresence } from 'framer-motion';
import { Book, Flower2, Users, Home, Hammer, Settings, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PanelType = 'wheel' | 'handbook' | 'garden' | 'handcraft' | 'visitors' | 'settings' | null;

interface SealButtonsProps {
  activePanel: PanelType;
  onToggle: (panel: PanelType) => void;
}

const BUTTONS: { key: Exclude<PanelType, null>; label: string; icon: typeof Book }[] = [
  { key: 'wheel', label: '节气轮', icon: RefreshCw },
  { key: 'handbook', label: '风物志', icon: Book },
  { key: 'garden', label: '庭院', icon: Home },
  { key: 'handcraft', label: '手作', icon: Hammer },
  { key: 'visitors', label: '访客', icon: Users },
  { key: 'settings', label: '设置', icon: Settings },
];

export default function SealButtons({ activePanel, onToggle }: SealButtonsProps) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
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
              'group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all border-2',
              isActive
                ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110 rotate-3'
                : 'bg-card/90 backdrop-blur-sm border-border hover:border-primary/60 text-foreground',
            )}
            aria-label={btn.label}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />

            {/* 悬停标签 */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-full mr-3 px-2 py-1 bg-card border border-border rounded-sm text-xs font-serif whitespace-nowrap text-foreground"
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
