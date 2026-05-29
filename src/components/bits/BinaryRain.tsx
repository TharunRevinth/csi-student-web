import { useEffect, useRef } from 'react';

interface BinaryRainProps {
  opacity?: number;
  speed?: number;
}

const BinaryRain = ({ 
  opacity = 0.25, 
  speed = 1.2
}: BinaryRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 12;
    let columns: number;
    let drops: { y: number; speed: number; chars: string[] }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 25);
      
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          y: Math.random() * -canvas.height, // Start above screen
          speed: (Math.random() * 1.5 + 0.5) * speed,
          chars: Array.from({ length: 12 }, () => Math.random() > 0.5 ? '1' : '0')
        };
      }
    };

    window.addEventListener('resize', init);
    init();

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      // Clear canvas with a bit more transparency to keep trails longer if desired, 
      // but here we want crispness, so we clear more firmly
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * 25;

        drop.chars.forEach((char, index) => {
          const y = (drop.y + index * (fontSize + 4));
          
          // Only draw if on screen
          if (y > -20 && y < canvas.height + 20) {
            // The last character in the array is the "head" of the drop
            const isHead = index === drop.chars.length - 1;
            
            if (isHead) {
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 2})`;
            } else {
              const alpha = (index / drop.chars.length) * opacity;
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            }
            
            ctx.fillText(char, x, y % canvas.height);
          }
          
          if (Math.random() > 0.98) {
            drop.chars[index] = Math.random() > 0.5 ? '1' : '0';
          }
        });

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -150;
          drop.speed = (Math.random() * 1.5 + 0.5) * speed;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

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

export default BinaryRain;
