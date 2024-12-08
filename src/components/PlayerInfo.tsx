import React from 'react';
import { Player } from '../types/game';

interface PlayerInfoProps {
  player: Player;
  isCurrentPlayer: boolean;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, isCurrentPlayer }) => {
  return (
    <div className={`p-4 rounded-lg ${isCurrentPlayer ? 'bg-emerald-100' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: player.color }}
        />
        <h3 className="font-bold">{player.name}</h3>
      </div>
      <div className="mt-2">
        <p>Money: ${player.money}</p>
        <p>Properties: {player.properties.length}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;