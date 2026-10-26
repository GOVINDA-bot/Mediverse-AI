import React, { useEffect, useRef } from 'react';

interface AnimatedEcgMonitorProps {
  rhythm: 'STEMI' | 'SINUS' | 'VT' | 'BRADY';
  heartRate: number;
  alarmActive: boolean;
}

export const AnimatedEcgMonitor: React.FC<AnimatedEcgMonitorProps> = ({
  rhythm,
  heartRate,
  alarmActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Buffer to draw fading trail
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Draw background ECG grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(15, 76, 50, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 12;

      for (let gx = 0; gx < width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
    };

    let prevY = midY;
    let tick = 0;

    const render = () => {
      tick++;

      // Lead sweep: clear a small column ahead of the sweep line
      ctx.fillStyle = '#020617';
      ctx.fillRect(x, 0, 8, height);

      // Re-draw grid in cleared slice
      ctx.strokeStyle = 'rgba(15, 76, 50, 0.25)';
      ctx.lineWidth = 1;
      for (let gy = 0; gy < height; gy += 12) {
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + 8, gy);
        ctx.stroke();
      }

      // Compute Y offset based on rhythm wave
      // Cycle duration based on HR
      const cycleLength = Math.max(30, Math.floor(1800 / heartRate));
      const posInCycle = tick % cycleLength;

      let yOffset = 0;

      if (rhythm === 'SINUS') {
        // Normal P-Q-R-S-T
        if (posInCycle > 4 && posInCycle < 10) {
          // P wave
          yOffset = -Math.sin(((posInCycle - 4) / 6) * Math.PI) * 7;
        } else if (posInCycle === 12) {
          // Q dip
          yOffset = 4;
        } else if (posInCycle === 13) {
          // R peak
          yOffset = -32;
        } else if (posInCycle === 14) {
          // S trough
          yOffset = 10;
        } else if (posInCycle > 18 && posInCycle < 28) {
          // T wave
          yOffset = -Math.sin(((posInCycle - 18) / 10) * Math.PI) * 11;
        }
      } else if (rhythm === 'STEMI') {
        // Massive Tombstone ST Elevation
        if (posInCycle > 3 && posInCycle < 8) {
          yOffset = -4; // Small P wave
        } else if (posInCycle === 10) {
          yOffset = 6; // Q wave
        } else if (posInCycle === 11) {
          yOffset = -36; // Tall R wave
        } else if (posInCycle >= 12 && posInCycle <= 24) {
          // ST Elevation plateau above baseline!
          yOffset = -18 - Math.sin(((posInCycle - 12) / 12) * Math.PI) * 6;
        }
      } else if (rhythm === 'VT') {
        // Ventricular Tachycardia wide monomorphic sine
        yOffset = Math.sin((posInCycle / cycleLength) * Math.PI * 2) * 28;
      } else if (rhythm === 'BRADY') {
        // Bradycardia with weak impulses
        if (posInCycle === 12) yOffset = -22;
      }

      const currY = midY + yOffset;

      // Draw trace line
      ctx.strokeStyle = alarmActive ? '#ef4444' : '#10b981';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 4;
      ctx.shadowColor = alarmActive ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)';

      ctx.beginPath();
      ctx.moveTo(x === 0 ? 0 : x - 1, prevY);
      ctx.lineTo(x, currY);
      ctx.stroke();

      ctx.shadowBlur = 0; // Reset shadow

      prevY = currY;
      x = (x + 1.5) % width;

      animationFrameId = requestAnimationFrame(render);
    };

    drawGrid();
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rhythm, heartRate, alarmActive]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-emerald-950 bg-slate-950 shadow-inner">
      <canvas
        ref={canvasRef}
        width={540}
        height={90}
        className="w-full h-[90px] block"
      />
      <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] font-mono text-emerald-400/90 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>LEAD II (1.0 mV/cm) · {rhythm === 'STEMI' ? '⚠️ ANTERIOR ST-ELEVATION' : 'SINUS CADENCE'}</span>
      </div>
      <div className="absolute bottom-1 right-2 text-[10px] font-mono text-emerald-500/70">
        25 mm/s · FILTER 0.05-150Hz
      </div>
    </div>
  );
};
