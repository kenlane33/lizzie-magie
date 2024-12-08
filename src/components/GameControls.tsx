import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface GameControlsProps {
  onRollDice: () => void;
  dice: number[];
  isRolling: boolean;
}

const DiceIcon = ({ value }: { value: number }) => {
  const icons = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6,
  };
  const Icon = icons[value as keyof typeof icons];
  return <Icon className="w-8 h-8" />;
};

const GameControls: React.FC<GameControlsProps> = ({ onRollDice, dice, isRolling }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {dice.map((value, index) => (
          <div key={index} className="p-2 bg-white rounded-lg shadow">
            <DiceIcon value={value} />
          </div>
        ))}
      </div>
      <button
        onClick={onRollDice}
        disabled={!isRolling}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default GameControls;