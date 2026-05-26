import { useState, useCallback, useRef } from 'react';

interface ScrambleHoverProps {
  text: string;
  className?: string;
}

const ScrambleHover = ({ text, className = '' }: ScrambleHoverProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chars = 'ABCDEFGHIJKLMN0123456789!@#$%^&*()_+';

  const scramble = useCallback(() => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => 
        text.split('').map((_, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  }, [text]);

  return (
    <span 
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </span>
  );
};

export default ScrambleHover;
