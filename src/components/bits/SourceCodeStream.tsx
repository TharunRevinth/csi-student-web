import { useEffect, useRef } from 'react';

const codeSnippets = [
  { text: 'const csi = "VIT_CHENNAI";', type: 'js' },
  { text: 'import { innovation } from "csi";', type: 'js' },
  { text: 'while (alive) { code(); }', type: 'js' },
  { text: 'std::cout << "Future";', type: 'cpp' },
  { text: '<React.Fragment />', type: 'jsx' },
  { text: 'npm install empowerment', type: 'sh' },
  { text: 'function build(dream) {', type: 'js' },
  { text: '  return dream.realize();', type: 'js' },
  { text: '}', type: 'js' },
  { text: 'git commit -m "innovation"', type: 'sh' },
  { text: '#include <community>', type: 'cpp' },
  { text: 'printf("CSI_EXCELLENCE");', type: 'cpp' },
  { text: 'const [idea, setIdea] = useState();', type: 'jsx' },
  { text: 'console.log("Hacking...");', type: 'js' },
  { text: 'chmod +x future_tech', type: 'sh' },
  { text: 'sudo apt-get upgrade', type: 'sh' },
  { text: '<div>{csi_vitc}</div>', type: 'jsx' },
  { text: 'ptr = new Success();', type: 'cpp' }
];

// Helper to get color based on token type - VS Code Dark+ Palette
const getTokenColor = (token: string) => {
  const keywords = ['const', 'import', 'from', 'while', 'function', 'return', 'new', 'sudo', 'std', 'let', 'var', 'if', 'else', 'for'];
  const types = ['int', 'float', 'char', 'void', 'bool', 'string', 'useState', 'std::cout'];
  const operators = ['=', '<<', '>>', '+', '{', '}', '(', ')', ';', '[', ']', '<', '>', '/', '.', ',', ':', '!', '&', '|', '*', '-'];
  
  const t = token.trim();
  if (keywords.includes(t)) return '#c586c0'; // Purple
  if (types.includes(t)) return '#4ec9b0';    // Teal
  if (operators.includes(t)) return '#d4d4d4'; // Gray
  if (t.startsWith('"') || t.startsWith("'")) return '#ce9178'; // Orange
  if (t.match(/^\d+$/)) return '#b5cea8';    // Green
  if (t.endsWith('(') || t.includes('(')) return '#dcdcaa'; // Yellow
  
  return '#9cdcfe'; // Sky Blue
};

interface SourceCodeStreamProps {
  opacity?: number;
  speed?: number;
}

const SourceCodeStream = ({ 
  opacity = 0.6, 
  speed = 0.5
}: SourceCodeStreamProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; tokens: {text: string, color: string}[]; speed: number; opacity: number; size: number }[] = [];

    const init = () => {
      // High-DPI Display Support for crisp text
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Ensure CSS size remains viewport size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale context to match DPR
      ctx.scale(dpr, dpr);

      const isMobile = window.innerWidth < 768;
      const laneCount = isMobile ? 4 : 10;
      const totalSideWidth = window.innerWidth * (isMobile ? 0.45 : 0.35);
      const laneWidth = totalSideWidth / (laneCount / 2);
      
      particles = [];
      const particleCount = isMobile ? 8 : 20; 

      for (let i = 0; i < particleCount; i++) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const rawTokens = snippet.text.split(/(\s+|[=;{}()<>[\].!&|*+-])|(".*?")/).filter(Boolean);
        const coloredTokens = rawTokens.map(t => ({
          text: t,
          color: getTokenColor(t)
        }));
        
        const laneIdx = i % laneCount;
        let startX;
        
        if (laneIdx < laneCount / 2) {
          startX = laneIdx * laneWidth + 25;
        } else {
          const rIdx = laneIdx - (laneCount / 2);
          startX = window.innerWidth - (rIdx * laneWidth) - (isMobile ? 120 : 200);
        }

        particles.push({
          x: startX,
          y: Math.random() * window.innerHeight,
          tokens: coloredTokens,
          speed: (Math.random() * 0.4 + 0.2) * speed,
          // Boosted base opacity significantly so colors pop and look sharp
          opacity: (Math.random() * 0.3 + 0.7) * opacity,
          size: isMobile ? 12 : 14 // Increased base font size
        });
      }
    };

    window.addEventListener('resize', init);
    init();

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      particles.forEach((p, i) => {
        const isMobile = window.innerWidth < 768;
        const centerThreshold = window.innerWidth * (isMobile ? 0.12 : 0.22);
        const centerX = window.innerWidth / 2;
        const distFromCenter = Math.abs(p.x - centerX);
        
        let centerFade = 1.0;
        if (distFromCenter < centerThreshold) {
          centerFade = distFromCenter / centerThreshold;
        }
        if (centerFade < 0.05) return;

        ctx.font = `bold ${p.size}px monospace`;
        const pulse = Math.sin(Date.now() * 0.003 + i) * 0.2 + 0.8;
        const alphaHex = Math.floor(p.opacity * centerFade * pulse * 255).toString(16).padStart(2, '0');

        let currentX = p.x;

        p.tokens.forEach(token => {
          let displayText = token.text;
          if (Math.random() > 0.99) {
             const chars = displayText.split('');
             const idx = Math.floor(Math.random() * chars.length);
             if (chars[idx] !== ' ') chars[idx] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
             displayText = chars.join('');
          }

          ctx.fillStyle = `${token.color}${alphaHex}`;
          ctx.fillText(displayText, currentX, p.y);
          currentX += ctx.measureText(token.text).width;
        });
        
        p.y -= p.speed * 3.2; 
        
        if (p.y < -40) {
          p.y = window.innerHeight + Math.random() * 150;
          
          const laneCount = isMobile ? 4 : 10;
          const laneIdx = (i + Math.floor(Math.random() * 2)) % laneCount;
          const totalSideWidth = window.innerWidth * (isMobile ? 0.45 : 0.35);
          const laneWidth = totalSideWidth / (laneCount / 2);

          if (laneIdx < laneCount / 2) {
            p.x = laneIdx * laneWidth + 25;
          } else {
            const rIdx = laneIdx - (laneCount / 2);
            p.x = window.innerWidth - (rIdx * laneWidth) - (isMobile ? 120 : 200);
          }

          const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          const rawTokens = snippet.text.split(/(\s+|[=;{}()<>[\].!&|*+-])|(".*?")/).filter(Boolean);
          p.tokens = rawTokens.map(t => ({ text: t, color: getTokenColor(t) }));
        }
      });

      // More frequent and sharp data scanline pulses
      if (Math.random() > 0.95) {
        const scanY = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, scanY, canvas.width, 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default SourceCodeStream;
