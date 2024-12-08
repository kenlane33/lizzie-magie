import React from 'react';
import { BoardSpot as BoardSpotType } from '../types/board';
import { Player } from '../types/game';
import { CircleDollarSign, Train, Zap, AlertCircle } from 'lucide-react';

interface BoardSpotProps {
  spot: BoardSpotType;
  players: Player[];
  rotation?: number;
}

const BoardSpot: React.FC<BoardSpotProps> = ({ spot, players, rotation = 0 }) => {
  const baseClasses = "border border-gray-800 p-2 text-xs flex flex-col justify-between h-full relative";
  
  const getColorClass = () => {
    switch (spot.type) {
      case 'property': return 'bg-green-200';
      case 'railroad': return 'bg-red-200';
      case 'utility': return 'bg-blue-200';
      case 'special': return 'bg-yellow-100';
      case 'corner': return 'bg-gray-100';
    }
  };

  const getIcon = () => {
    switch (spot.type) {
      case 'property': return <CircleDollarSign className="w-3 h-3" />;
      case 'railroad': return <Train className="w-3 h-3" />;
      case 'utility': return <Zap className="w-3 h-3" />;
      case 'special': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const contentStyle = {
    transform: `rotate(${-rotation}deg)`,
    transformOrigin: 'center center',
    height: '100%',
    width: '50px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'between',
  };

  return (
    <div 
      className={`${baseClasses} ${getColorClass()}`}
    >
      <div style={contentStyle}>
        <div style={{width:55}} className="font-bold text-center text-[10px] leading-tight mb-1 break-words">{spot.name}</div>
        {'price' in spot && (
          <div className="flex items-center justify-center gap-1 text-wrap">
            {getIcon()}
            <span className="text-[10px]">${spot.price}</span>
            {'rent' in spot && <span className="text-[10px]">/ ${spot.rent}</span>}
          </div>
        )}
        <div className="absolute bottom-1 left-1 flex gap-1">
          {players.map((player) => (
            <div
              key={player.id}
              className="w-4 h-4 rounded-full"
              style={{ 
                backgroundColor: player.color, 
                border:'solid 1px #444',
                boxShadow: '2px 2px 5px 0 #444'
               }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSpot;