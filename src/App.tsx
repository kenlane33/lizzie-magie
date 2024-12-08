import Board from './components/Board';
import PlayerInfo from './components/PlayerInfo';
import GameControls from './components/GameControls';
import GameMessage from './components/GameMessage';
import GameDialog from './components/GameDialog';
import { useGame } from './hooks/useGame';
import { BOARD_SPOTS } from './data/boardData';

function App() {
  const { gameState, rollDice, buyProperty, skipTurn } = useGame(4);
  const { players, currentPlayer, dice, gameStatus, showDialog, dialogMessage } = gameState;
  const currentPlayerData = players[currentPlayer];
  const currentSpot = BOARD_SPOTS[currentPlayerData.position];

  return (
    <div className="min-h-screen bg-emerald-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        <div className="flex flex-col gap-4">
          {players.map((player, index) => (
            <PlayerInfo
              key={player.id}
              player={player}
              isCurrentPlayer={index === currentPlayer}
            />
          ))}
          <GameControls
            onRollDice={rollDice}
            dice={dice}
            isRolling={gameStatus === 'rolling'}
          />
        </div>
        <Board players={players} />
      </div>
      
      <GameMessage
        currentPlayer={currentPlayerData}
        gameStatus={gameStatus}
      />
      
      <GameDialog
        isOpen={showDialog}
        currentPlayer={currentPlayerData}
        currentSpot={currentSpot}
        onBuy={buyProperty}
        onSkip={skipTurn}
        message={dialogMessage}
        gameMode='singleTax'
      />
    </div>
  );
}

export default App;