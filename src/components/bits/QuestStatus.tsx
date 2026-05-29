import { motion, AnimatePresence } from 'framer-motion';
import { useQuest } from './QuestContext';
import { useState, useEffect } from 'react';

const QuestStatus = () => {
  const { fragments, isComplete, resetQuest } = useQuest();
  const [showNotification, setShowNotification] = useState(false);
  const [lastFoundCount, setLastFoundCount] = useState(0);
  
  const foundCount = fragments.filter(Boolean).length;

  if (foundCount > lastFoundCount) {
    setShowNotification(true);
    setLastFoundCount(foundCount);
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {foundCount > 0 && !isComplete && showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-black border border-white/20 p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] pointer-events-auto"
          >
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">System Alert</div>
            <div className="text-sm font-bold text-white uppercase">
              Binary Fragment Found ({foundCount}/3)
            </div>
            <div className="mt-3 h-1 w-full bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(foundCount / 3) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white text-black p-6 shadow-[0_0_50px_rgba(255,255,255,0.3)] pointer-events-auto max-w-xs"
          >
            <div className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em] mb-2">Authorization Protocol</div>
            <div className="text-xl font-black uppercase leading-tight mb-4">
              MAINFRAME ACCESS GRANTED
            </div>
            <p className="text-xs font-medium mb-6 opacity-70">
              You have successfully reconstructed the source code. The secret portal is now active in the terminal.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={resetQuest}
                className="text-[10px] font-black uppercase tracking-widest border border-black/20 px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                Reset System
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestStatus;
