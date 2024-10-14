import { useEffect, useRef, useState } from "react";

interface GameBoardProps {
  gridSize: number;
  randomArray: number[];
  isClicked: boolean
}

const width = 400;
const height = width;
const dotRadius = width / 40;
const padding = 0;
const gridWidth = width - padding * 2;

const GameBoard: React.FC<GameBoardProps> = ({ gridSize, randomArray, isClicked }) => {
  const [showDots, setShowDots] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isClicked) {
      setShowDots(true);
      const timer = setTimeout(() => {
        setShowDots(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(padding, padding, gridWidth, gridWidth);

    if (showDots) {
      drawGridWithDots(ctx, gridSize, padding, dotRadius, randomArray);
    } else if (!isClicked) {
      drawText(ctx, 'Click Start', canvas.width);
    }
  }, [showDots, isClicked]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}

export default GameBoard;

const drawGridWithDots = (
  ctx: CanvasRenderingContext2D,
  gridSize: number,
  padding: number,
  dotRadius: number,
  array: number[]
): void => {
  const gridWidth = width;
  const cellSize = gridWidth / gridSize;

  for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
    for (let colIndex = 0; colIndex < gridSize; colIndex++) {
      const index = rowIndex * gridSize + colIndex;
      if (array.includes(index)) {
        const cx = padding + colIndex * cellSize + cellSize / 2;
        const cy = padding + rowIndex * cellSize + cellSize / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
      }
    }
  }
}

const drawText = (ctx: CanvasRenderingContext2D, text: string, width: number) => {
  ctx.font = 'bold 20px serif';
  ctx.fillStyle = 'yellow';
  const textWidth = ctx.measureText(text).width;
  ctx.fillText(text, (width - textWidth) / 2, 200);
}
