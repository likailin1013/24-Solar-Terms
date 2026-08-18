import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ScrollPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  side?: 'right' | 'left' | 'center';
  widthClass?: string;
}

export default function ScrollPanel({
  open,
  onClose,
  title,
  subtitle,
  children,
  side = 'right',
  widthClass = 'w-full md:w-[480px] lg:w-[560px]',
}: ScrollPanelProps) {
  if (side === 'center') {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`relative ${widthClass} max-h-[85vh] overflow-hidden rounded-sm border border-border bg-card shadow-xl`}
            >
              {/* 卷轴顶部轴杆 */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)] border-b border-[hsl(30_20%_45%)]" />
              {/* 卷轴底部轴杆 */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)] border-t border-[hsl(30_20%_45%)]" />

              <div className="relative h-3" />
              <div className="relative px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between border-b border-border/50">
                <div>
                  <h2 className="text-xl font-serif text-foreground tracking-wide">{title}</h2>
                  {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-sm hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="关闭"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative px-4 sm:px-6 py-5 overflow-y-auto max-h-[calc(85vh-80px)] scrollbar-thin">
                {children}
              </div>
              <div className="relative h-3" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const sideVariants = side === 'right'
    ? { hidden: { x: '100%' }, visible: { x: 0 } }
    : { hidden: { x: '-100%' }, visible: { x: 0 } };

  const sideClass = side === 'right' ? 'right-0' : 'left-0';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={sideVariants.hidden}
            animate={sideVariants.visible}
            exit={sideVariants.hidden}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 ${sideClass} z-50 h-full ${widthClass} max-w-full`}
          >
            <div className="relative h-full bg-card border-l border-border/60 shadow-2xl overflow-hidden">
              {/* 卷轴顶部轴杆 */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[hsl(30_25%_60%)] to-[hsl(30_20%_50%)] border-b border-[hsl(30_20%_45%)] z-10" />
              {/* 左侧卷轴边 */}
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-[hsl(30_20%_55%)] to-transparent z-10" />

              <div className="relative h-3" />
              <div className="relative px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between border-b border-border/50">
                <div>
                  <h2 className="text-xl font-serif text-foreground tracking-wide">{title}</h2>
                  {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-sm hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="关闭"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative px-4 sm:px-6 py-5 overflow-y-auto h-[calc(100%-72px)] scrollbar-thin">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
