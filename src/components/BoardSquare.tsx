import React from 'react';
import { Property, Player } from '../types/game';
import { CircleDollarSign } from 'lucide-react';

interface BoardSquareProps {
  property: Property;
  players: Player[];
}

const BoardSquare: React.FC<BoardSquareProps> = ({ property, players }) => {
  return (
    <div className="relative border border-emerald-800 p-2 h-24 bg-white">
      <div className="text-xs font-bold">{property.name}</div>
      {property.type === 'property' && (
        <div className="flex items-center gap-1 mt-1">
          <CircleDollarSign className="w-4 h-4" />
          <span className="text-xs">{property.price}</span>
        </div>
      )}
      <div className="absolute bottom-1 left-1 flex gap-1">
        {players.map((player) => (
          <div
            key={player.id}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: player.color }}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardSquare;