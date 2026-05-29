import { motion, AnimatePresence } from 'framer-motion';
import { useQuest } from './QuestContext';
import { useState, useEffect } from 'react';

interface QuestFragmentProps {
  index: number;
  className?: string;
}

const QuestFragment = ({ index, className = "" }: QuestFragmentProps) => {
  const { collectFragment, fragments } = useQuest();
  const [isHovered, setIsHovered] = useState(false);
  const [charValue, setCharValue] = useState('0');

  useEffect(() => {
    setCharValue(Math.random() > 0.5 ? '0' : '1');
  }, []);

  if (fragments[index]) return null;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => collectFragment(index)}
      className={`cursor-pointer z-50 inline-flex items-center justify-center p-2 group ${className}`}
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{ 
        opacity: isHovered ? 1 : 0.2,
        scale: isHovered ? 1.2 : 1,
        boxShadow: isHovered ? "0 0 15px rgba(255, 255, 255, 0.5)" : "none"
      }}
      whileTap={{ scale: 0.8 }}
    >
      <span className="text-[10px] font-mono font-bold text-white transition-all duration-300 group-hover:text-cyan-400">
        {charValue}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-[8px] font-black px-2 py-1 uppercase tracking-tighter"
          >
            [ COLLECT_FRAGMENT ]
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestFragment;
