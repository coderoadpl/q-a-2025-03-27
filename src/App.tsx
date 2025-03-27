import { useMemoryGameStore } from "./storeToReactAdapter";
import { useEffect, useState } from "react";

const App = () => {
  const { board, startTime, endTime, startGame, flipCard } = useMemoryGameStore((state) => state);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Update timer while game is running
  useEffect(() => {
    if (!startTime || endTime) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  // Calculate grid columns based on board size
  const gridColumns = Math.sqrt(board.length) || 2;

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Memory Game</h1>
      
      {/* Game controls */}
      <div className="mb-4 flex gap-2">
        <button 
          onClick={() => startGame('very-easy')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Very Easy
        </button>
        <button 
          onClick={() => startGame('easy')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Easy
        </button>
        <button 
          onClick={() => startGame('medium')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Medium
        </button>
        <button 
          onClick={() => startGame('hard')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Hard
        </button>
      </div>
      
      {/* Game status */}
      {startTime && (
        <div className="mb-4">
          <p>Time: {elapsedTime} seconds</p>
          {endTime && (
            <p className="font-bold text-green-600">
              Game complete! Total time: {Math.floor((endTime - startTime) / 1000)} seconds
            </p>
          )}
        </div>
      )}
      
      {/* Game board */}
      {board.length > 0 && (
        <div 
          className="grid gap-2" 
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)` 
          }}
        >
          {board.map((card) => (
            <div
              key={card.id}
              onClick={() => !card.isMatched && !endTime && flipCard(card.id)}
              className={`
                w-20 h-20 flex items-center justify-center text-3xl 
                rounded cursor-pointer transition-all duration-200
                ${card.isMatched ? 'bg-green-200' : card.isFlipped ? 'bg-blue-100' : 'bg-gray-300'}
                ${!card.isMatched && !endTime ? 'hover:bg-gray-400' : ''}
              `}
            >
              {(card.isFlipped || card.isMatched) ? card.value : '?'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
