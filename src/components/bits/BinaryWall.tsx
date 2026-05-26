import { useEffect, useRef } from 'react';

const BinaryWall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 12;
    let columns: number;
    let rows: number;
    let grid: string[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.ceil(canvas.width / 24);
      rows = Math.ceil(canvas.height / 18);
      
      grid = Array.from({ length: columns * rows }, () => 
        Math.random() > 0.5 ? '1' : '0'
      );
    };

    window.addEventListener('resize', init);
    init();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px monospace`;
      
      // Randomly glitch a few characters in the grid
      for (let i = 0; i < 20; i++) {
        const idx = Math.floor(Math.random() * grid.length);
        grid[idx] = Math.random() > 0.5 ? '1' : '0';
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const idx = r * columns + c;
          const char = grid[idx];
          const x = c * 24 + 10;
          const y = r * 18 + 15;
          
          // Much brighter opacities
          const rand = Math.random();
          if (rand > 0.98) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          }
          
          ctx.fillText(char, x, y);
        }
      }

      // Brighter scan line
      const time = Date.now() * 0.0005;
      const scanY = (time % 1) * canvas.height;
      const gradient = ctx.createLinearGradient(0, scanY - 100, 0, scanY + 100);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 100, canvas.width, 200);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-100"
    />
  );
};

export default BinaryWall;
