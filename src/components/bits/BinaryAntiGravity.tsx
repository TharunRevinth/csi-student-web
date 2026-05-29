import { useEffect, useRef } from 'react';

interface BinaryAntiGravityProps {
  opacity?: number;
  speed?: number;
  color?: string;
}

const BinaryAntiGravity = ({ 
  opacity = 0.4, 
  speed = 0.8,
  color = '#1e40af' // Default CSI Blue
}: BinaryAntiGravityProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 14;
    let columns: number;
    let particles: { x: number; y: number; char: string; speed: number; opacity: number }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / 30);
      
      particles = [];
      const particleCount = columns * 10; // Density
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: Math.random() > 0.5 ? '1' : '0',
          speed: (Math.random() * 0.5 + 0.2) * speed,
          opacity: Math.random() * opacity
        });
      }
    };

    window.addEventListener('resize', init);
    init();

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Optional: Add a very faint blue tint to the whole canvas to verify it's rendering
      // ctx.fillStyle = 'rgba(37, 99, 235, 0.02)';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      
      particles.forEach(p => {
        // Significantly increased base opacity and added white highlights for visibility
        const finalOpacity = Math.max(0.15, p.opacity * 1.5);
        ctx.fillStyle = `rgba(59, 130, 246, ${finalOpacity})`; // Brighter Blue (Tailwind Blue-500)
        
        // Occasionally make a character white/cyan for high-tech contrast
        if (p.opacity > 0.35) {
          ctx.fillStyle = `rgba(147, 197, 253, ${finalOpacity})`; // Light Blue-300
        }
        
        ctx.fillText(p.char, p.x, p.y);
        
        // Anti-gravity: Move upwards
        p.y -= p.speed;
        
        // Reset to bottom if it goes off top
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
          p.char = Math.random() > 0.5 ? '1' : '0';
        }

        // Randomly glitch character
        if (Math.random() > 0.995) {
          p.char = Math.random() > 0.5 ? '1' : '0';
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [opacity, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default BinaryAntiGravity;
