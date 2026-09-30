import React, { useRef, useEffect } from 'react';

interface CursorGridProps {
  color?: string; // e.g., '0, 0, 0' or '185, 232, 106'
  cellSize?: number;
  maxOpacity?: number;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  color = '0, 0, 0',
  cellSize = 24,
  maxOpacity = 0.25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Desktop only
    if (!window.matchMedia('(hover: hover)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const activeCells = new Map<string, { opacity: number }>();

    const resize = () => {
      // Use parent element size
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX = x;
        mouseY = y;
        energizeCells();
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Mouse leave window
    document.addEventListener('mouseleave', handleMouseLeave);

    const energizeCells = () => {
      const radius = 120; // Subtle radius
      const startCol = Math.max(0, Math.floor((mouseX - radius) / cellSize));
      const endCol = Math.min(cols, Math.ceil((mouseX + radius) / cellSize));
      const startRow = Math.max(0, Math.floor((mouseY - radius) / cellSize));
      const endRow = Math.min(rows, Math.ceil((mouseY + radius) / cellSize));

      for (let x = startCol; x <= endCol; x++) {
        for (let y = startRow; y <= endRow; y++) {
          const cellX = x * cellSize + cellSize / 2;
          const cellY = y * cellSize + cellSize / 2;
          const dist = Math.hypot(cellX - mouseX, cellY - mouseY);
          
          if (dist < radius) {
            const key = `${x}_${y}`;
            const intensity = Math.pow(1 - dist / radius, 1.5); // smoother falloff
            const current = activeCells.get(key);
            const newOpacity = Math.min(maxOpacity, intensity * maxOpacity);
            
            if (!current || newOpacity > current.opacity) {
              activeCells.set(key, { opacity: newOpacity });
            }
          }
        }
      }
      
      if (activeCells.size > 0 && !animationFrameId) {
        render();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let needsNextFrame = false;

      ctx.lineWidth = 1;

      for (const [key, cell] of activeCells.entries()) {
        const [x, y] = key.split('_').map(Number);
        
        ctx.strokeStyle = `rgba(${color}, ${cell.opacity})`;
        
        const px = x * cellSize;
        const py = y * cellSize;
        
        ctx.beginPath();
        // tech-grid creates 1px lines at the top and left of every 24px cell
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + cellSize);
        ctx.moveTo(px, py);
        ctx.lineTo(px + cellSize, py);
        ctx.stroke();

        // Subtle fade duration (approx 800ms)
        cell.opacity -= 0.005; 
        
        if (cell.opacity <= 0) {
          activeCells.delete(key);
        } else {
          needsNextFrame = true;
        }
      }

      if (needsNextFrame) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = 0;
      }
    };

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [cellSize, color, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};
