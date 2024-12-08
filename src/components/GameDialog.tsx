import React from 'react';
import { Player } from '../types/game';
import { BoardSpot } from '../types/board';

interface GameDialogProps {
  isOpen: boolean;
  currentPlayer: Player;
  currentSpot: BoardSpot;
  onBuy: () => void;
  onSkip: () => void;
  onPayFine?: () => void;
  message: string;
  gameMode: 'standard' | 'singleTax';
}

const GameDialog: React.FC<GameDialogProps> = ({
  isOpen,
  currentPlayer,
  currentSpot,
  onBuy,
  onSkip,
  onPayFine,
  message,
  gameMode,
}) => {
  if (!isOpen) return null;

  const canBuy = 'price' in currentSpot && 
                 currentPlayer.money >= currentSpot.price && 
                 gameMode === 'standard';

  const showJailOptions = currentPlayer.inJail && onPayFine;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">{currentPlayer.name}'s Turn</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        
        {gameMode === 'singleTax' && (
          <div className="mb-4 text-sm text-gray-600">
            <p>Playing with Single Tax rules</p>
            <p>All land rent goes to the Public Treasury</p>
          </div>
        )}

        {'price' in currentSpot && (
          <div className="mb-4">
            <p className="font-semibold">Property Details:</p>
            <p>Price: ${currentSpot.price}</p>
            {'rent' in currentSpot && <p>Rent: ${currentSpot.rent}</p>}
          </div>
        )}

        <div className="flex gap-4 justify-end">
          {showJailOptions && (
            <>
              <button
                onClick={onPayFine}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Pay Fine ($50)
              </button>
              <button
                onClick={onSkip}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Stay in Jail
              </button>
            </>
          )}
          
          {!showJailOptions && (
            <>
              {canBuy && (
                <button
                  onClick={onBuy}
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Buy for ${currentSpot.price}
                </button>
              )}
              <button
                onClick={onSkip}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                {canBuy ? "Don't Buy" : "Continue"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDialog;