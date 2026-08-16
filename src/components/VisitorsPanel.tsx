import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VISITORS, type IVisitor } from '@/data/visitors';
import type { IGameProgress } from '@/hooks/useGameProgress';
import { CHARACTER_IMAGE } from '@/lib/season-images';
import { cn } from '@/lib/utils';
import { X, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface VisitorsPanelProps {
  progress: IGameProgress;
}

export default function VisitorsPanel({ progress }: VisitorsPanelProps) {
  const [selectedVisitor, setSelectedVisitor] = useState<IVisitor | null>(null);

  const totalVisitors = MOCK_VISITORS.length;
  const metCount = progress.metVisitors.length;

  return (
    <div className="space-y-4">
      {/* 头部统计 */}
      <div className="text-center pb-4 border-b border-border/40">
        <p className="text-sm text-muted-foreground mb-1">山中访客</p>
        <div className="text-xl font-serif text-foreground">
          <span className="text-primary">{metCount}</span>
          <span className="text-muted-foreground text-base"> / {totalVisitors} 位</span>
        </div>
      </div>

      {/* 访客列表 */}
      <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2 -mr-2">
        {MOCK_VISITORS.map((visitor, idx) => {
          const isMet = progress.metVisitors.includes(visitor.id);
          return (
            <motion.div
              key={visitor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 4 }}
              onClick={() => isMet && setSelectedVisitor(visitor)}
              className={cn(
                'flex items-center gap-4 p-3 rounded-sm border transition-all',
                isMet
                  ? 'border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10'
                  : 'border-border/60 bg-muted/20 cursor-not-allowed',
              )}
            >
              {/* 头像 */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full border-2 border-border/60 overflow-hidden bg-muted">
                  {isMet ? (
                    <Image
                      src={CHARACTER_IMAGE}
                      alt={visitor.name}
                      className="w-full h-full object-cover object-top opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">
                      👤
                    </div>
                  )}
                </div>
                {isMet && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                    ✓
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-foreground">
                  {isMet ? visitor.name : '？？？'}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {isMet ? visitor.title : '尚未相遇'}
                </p>
              </div>

              {isMet && (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 访客详情弹窗 */}
      <AnimatePresence>
        {selectedVisitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedVisitor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-card rounded-sm border border-border shadow-xl p-6"
            >
              <button
                onClick={() => setSelectedVisitor(null)}
                className="absolute top-3 right-3 p-1.5 rounded-sm hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5">
                <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary/40 overflow-hidden mb-3">
                  <Image
                    src={CHARACTER_IMAGE}
                    alt={selectedVisitor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-serif text-foreground">{selectedVisitor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedVisitor.title}</p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-accent/30 rounded-sm">
                  <p className="text-xs text-muted-foreground mb-1">来访节气</p>
                  <p className="text-sm font-serif text-foreground">
                    {selectedVisitor.visitedTerms.join(' · ')}
                  </p>
                </div>

                <div className="p-3 bg-accent/30 rounded-sm">
                  <p className="text-xs text-muted-foreground mb-1">所赠之物</p>
                  <p className="text-sm font-serif text-foreground">{selectedVisitor.gift}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">人物小传</p>
                  <p className="text-sm text-foreground/80 leading-relaxed font-serif">
                    {selectedVisitor.story}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
