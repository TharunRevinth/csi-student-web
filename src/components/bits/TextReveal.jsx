// @ts-nocheck
import React, { useRef, useMemo, createContext, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TextRevealContext = createContext({
  scrollYProgress: null,
  tokens: []
});

export const TextReveal = ({ body, className, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const tokens = useMemo(() => body.split(' '), [body]);

  return (
    <TextRevealContext.Provider value={{ scrollYProgress, tokens } }>
      <div ref={containerRef} className={className}>
        {children(tokens)}
      </div>
    </TextRevealContext.Provider>
  );
};

const Token = ({ index, children }) => {
  const { scrollYProgress, tokens } = useContext(TextRevealContext) ;
  
  const range = [index / tokens.length, (index + 1) / tokens.length];
  const opacity = useTransform(scrollYProgress, range, [0, 1]);

  return (
    <TokenInner index={index} range={range} scrollYProgress={scrollYProgress}>
      {children}
    </TokenInner>
  );
};

const TokenInner = ({ children, range, scrollYProgress }) => {
  const [isActive, setIsActive] = React.useState(false);
  
  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v >= range[0] && v <= range[1]) {
        setIsActive(true);
      } else if (v < range[0]) {
        setIsActive(false);
      } else {
        setIsActive(true); // Keep it active after passing
      }
    });
  }, [scrollYProgress, range]);

  return <>{children(isActive)}</>;
};

TextReveal.Token = Token;

export default TextReveal;
