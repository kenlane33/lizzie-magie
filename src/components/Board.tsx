import React from 'react';
import { Player } from '../types/game';
import BoardSpot from './BoardSpot';
import { BOARD_SPOTS, PUBLIC_TREASURY } from '../data/boardData';

interface BoardProps {
  players: Player[];
}

const Board: React.FC<BoardProps> = ({ players }) => {
  const bottomRow = BOARD_SPOTS.slice(0, 10);
  const leftColumn = BOARD_SPOTS.slice(10, 19);
  const topRow = BOARD_SPOTS.slice(19, 29);
  const rightColumn = BOARD_SPOTS.slice(29, 39);

  return (
    <div className="w-[800px] aspect-square relative bg-gray-50 border-4 border-gray-800">
      {/* Center Content */}
      <div className="absolute inset-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-8">THE LANDLORD'S GAME</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">PUBLIC TREASURY</h2>
          <div className="flex gap-4 justify-center">
            {PUBLIC_TREASURY.denominations.map(value => (
              <div key={value} className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center">
                ${value}
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm">
          ECONOMIC GAME CO. NEW YORK
        </div>
      </div>

      {/* Bottom Row */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex">
        {bottomRow.map((spot) => (
          <div key={spot.position} className="flex-1">
            <BoardSpot 
              spot={spot}
              players={players.filter(p => p.position === spot.position)}
            />
          </div>
        ))}
      </div>

      {/* Left Column */}
      <div className="absolute left-0 top-24 bottom-24 w-24">
        {leftColumn.map((spot) => (
          <div key={spot.position} className="h-[11.11%]">
            <BoardSpot 
              spot={spot}
              players={players.filter(p => p.position === spot.position)}
              rotation={270}
            />
          </div>
        ))}
      </div>

      {/* Top Row */}
      <div className="absolute top-0 left-0 right-0 h-24 flex">
        {topRow.map((spot) => (
          <div key={spot.position} className="flex-1">
            <BoardSpot 
              spot={spot}
              players={players.filter(p => p.position === spot.position)}
              rotation={180}
            />
          </div>
        ))}
      </div>

      {/* Right Column */}
      <div className="absolute right-0 top-24 bottom-24 w-24">
        {rightColumn.map((spot) => (
          <div key={spot.position} className="h-[11.11%]">
            <BoardSpot 
              spot={spot}
              players={players.filter(p => p.position === spot.position)}
              rotation={90}
            />
          </div>
        ))}
      </div>

      {/* Corner Decorations */}
      <div className="absolute left-24 top-24 w-8 h-8 bg-red-200 border border-gray-800"></div>
      <div className="absolute right-24 top-24 w-8 h-8 bg-red-200 border border-gray-800"></div>
      <div className="absolute left-24 bottom-24 w-8 h-8 bg-red-200 border border-gray-800"></div>
      <div className="absolute right-24 bottom-24 w-8 h-8 bg-red-200 border border-gray-800"></div>
    </div>
  );
};

export default Board;