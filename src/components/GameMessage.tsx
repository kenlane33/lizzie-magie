import React from 'react';
import { GameStatus, Player } from '../types/game';

interface GameMessageProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
}

const GameMessage: React.FC<GameMessageProps> = ({ currentPlayer, gameStatus }) => {
  const getMessage = () => {
    if (gameStatus === 'rolling') {
      return `${currentPlayer.name}, roll the dice for your move.`;
    }
    return `${currentPlayer.name} is deciding...`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-lg shadow-lg border-2 border-emerald-600">
      <p className="text-lg font-semibold text-emerald-800">{getMessage()}</p>
    </div>
  );
};

export default GameMessage;