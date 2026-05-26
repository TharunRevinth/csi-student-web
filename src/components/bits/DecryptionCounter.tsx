import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface DecryptionCounterProps {
  value: string;
  duration?: number;
}

const DecryptionCounter = ({ value, duration = 2000 }: DecryptionCounterProps) => {
  const [displayValue, setDisplayValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const chars = '0123456789X$/%#@!*&';

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const finalValue = value;
    const length = finalValue.length;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const current = finalValue
        .split('')
        .map((char, index) => {
          const charProgress = index / length;
          if (progress > charProgress + (1 / length) * 0.5 || progress === 1) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isInView]);

  return <div ref={containerRef}>{displayValue || value.split('').map(() => chars[0]).join('')}</div>;
};

export default DecryptionCounter;
