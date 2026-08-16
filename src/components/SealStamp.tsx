import { motion, AnimatePresence } from 'framer-motion';

interface SealStampProps {
  show: boolean;
  text?: string;
}

export default function SealStamp({ show, text = '岁时记' }: SealStampProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 3, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="relative">
            {/* 外圆 */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/80 flex items-center justify-center bg-primary/5 backdrop-blur-sm">
              {/* 内圆 */}
              <div className="w-[80%] h-[80%] rounded-full border-2 border-primary/60 flex items-center justify-center">
                <span className="text-primary font-serif text-2xl md:text-3xl font-bold tracking-widest">
                  {text}
                </span>
              </div>
            </div>
            {/* 装饰 */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/60" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
