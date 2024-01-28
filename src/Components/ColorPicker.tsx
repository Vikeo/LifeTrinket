import React, { useRef, useEffect, useState, FC } from 'react';

type ColorPickerProps = {
  onChange: (color: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = ({ onChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        drawColorWheel(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      drawCursor(context, cursorPosition);
    }
  }, [context, cursorPosition]);

  const drawColorWheel = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY);

    for (let angle = 0; angle <= 360; angle += 1) {
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + radius * Math.cos((angle * Math.PI) / 180),
        centerY + radius * Math.sin((angle * Math.PI) / 180)
      );
      gradient.addColorStop(0, `hsl(${angle}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${angle + 1}, 100%, 50%)`);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        ((angle - 0.5) * Math.PI) / 180,
        ((angle + 0.5) * Math.PI) / 180
      );
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    }
  };

  const drawCursor = (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number }
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawColorWheel(ctx);
    const radius = 5;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setDragging(true);
    handleMouseMove(event);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (dragging && context) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const imageData = context.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        const color = rgbToHex(pixel[0], pixel[1], pixel[2]);
        onChange(color);
        setCursorPosition({ x, y });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};
