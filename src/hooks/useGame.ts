import { useState, useCallback } from 'react';
import { GameState, Player, GameMode, Property, GameStatus } from '../types/game';
import { BOARD_SPOTS, INITIAL_MONEY, PLAYER_COLORS } from '../data/boardData';
import { BoardSpot } from '../types/board';
import {
  calculateRent,
  handlePublicTreasuryBalance,
  // getCurrentWage,
  isGameEnded,
  getWinner,
  // JAIL_FINE,
  MAX_JAIL_TURNS,
  // EDUCATION_CARDS_FOR_PROFESSOR
} from '../utils/gameRules';

const initializeGame = (numPlayers: number, mode: GameMode): GameState => {
  const players = Array.from({ length: numPlayers }, (_, i) => ({
    id: `player${i + 1}`,
    name: `Player ${i + 1}`,
    money: INITIAL_MONEY,
    position: 0,
    properties: [],
    color: PLAYER_COLORS[i],
    inJail: false,
    jailTurns: 0,
    educationCards: 0,
    professorCards: 0
  }));

  return {
    players,
    currentPlayer: 0,
    dice: [1, 1],
    gameStatus: 'rolling',
    gameMode: mode,
    winner: null,
    dialogMessage: '',
    showDialog: false,
    publicTreasury: {
      balance: 0,
      railroadsBought: [],
      utilitiesBought: [],
      collegesBuilt: [],
      wageIncrease: 0
    },
    turnCount: 0,
    housesBuilt: 0,
    properties: []
  };
};

export const useGame = (numPlayers: number, mode: GameMode = 'standard') => {
  const [gameState, setGameState] = useState<GameState>(initializeGame(numPlayers, mode));

  const handleLanding = useCallback((player: Player, spot: BoardSpot, isDouble: boolean) => {
    const updates: Partial<Player> = {};
    let message = '';

    if (spot.type === 'corner' && spot.name === 'GO TO JAIL') {
      updates.inJail = true;
      updates.jailTurns = 0;
      message = 'You went to jail!';
    } else if (gameState.gameMode === 'singleTax') {
      if ('price' in spot) {
        const landRent = calculateRent(spot as Property, gameState);
        updates.money = player.money - landRent;
        setGameState(prev => ({
          ...prev,
          publicTreasury: {
            ...prev.publicTreasury,
            ...handlePublicTreasuryBalance(prev.publicTreasury, landRent)
          }
        }));
        message = `You paid ${landRent} land rent to the Public Treasury.`;
      }
    } else {
      // Standard mode handling
      if ('price' in spot && spot.owner && spot.owner !== player.id) {
        const rent = calculateRent(spot as Property, gameState);
        updates.money = player.money - rent;
        message = `You paid ${rent} rent to ${spot.owner}.`;
      }
    }

    return { updates, message };
  }, [gameState]);

  const rollDice = useCallback(() => {
    const dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    const isDouble = dice[0] === dice[1];
    const currentPlayer = gameState.players[gameState.currentPlayer];

    if (currentPlayer.inJail) {
      if (isDouble || currentPlayer.jailTurns >= MAX_JAIL_TURNS) {
        currentPlayer.inJail = false;
        currentPlayer.jailTurns = 0;
      } else {
        currentPlayer.jailTurns++;
        setGameState(prev => ({
          ...prev,
          currentPlayer: (prev.currentPlayer + 1) % prev.players.length
        }));
        return;
      }
    }

    const newPosition = (currentPlayer.position + dice[0] + dice[1]) % BOARD_SPOTS.length;
    const landedSpot = BOARD_SPOTS[newPosition];
    const { updates, message } = handleLanding(currentPlayer, landedSpot, isDouble);

    setGameState(prev => {
      const newState: GameState = {
        ...prev,
        dice,
        players: prev.players.map((player, i) =>
          i === prev.currentPlayer
            ? { ...player, ...updates, position: newPosition }
            : player
        ),
        gameStatus: 'deciding' as GameStatus,
        dialogMessage: message,
        showDialog: true,
        turnCount: prev.turnCount + 1
      };

      if (isGameEnded(newState)) {
        const winner = getWinner(newState.players);
        newState.winner = winner.id;
        newState.gameStatus = 'ended';
        newState.dialogMessage = `${winner.name} wins the game!`;
      }

      return newState;
    });
  }, [gameState, handleLanding]);

  const buyProperty = useCallback(() => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    const currentSpot = BOARD_SPOTS[currentPlayer.position];
    if (!('price' in currentSpot)) return;
    if (!currentSpot || currentSpot.price == undefined) return;
    if (currentPlayer.money < currentSpot.price) return;

    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === prev.currentPlayer
          ? {
              ...player,
              money: player.money - currentSpot.price!,
              properties: [...player.properties, currentSpot.position.toString()]
            }
          : player
      ),
      properties: prev.properties.map(property => 
        property.position === currentSpot.position 
          ? { ...property, owner: currentPlayer.id }
          : property
      ),
      gameStatus: 'rolling',
      showDialog: false,
      currentPlayer: (prev.currentPlayer + 1) % prev.players.length
    }));
  }, [gameState]);

  const payJailFine = useCallback(() => {
    const JAIL_FINE = 50;
    setGameState(prev => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === prev.currentPlayer
          ? {
              ...player,
              money: player.money - JAIL_FINE,
              inJail: false,
              jailTurns: 0
            }
          : player
      ),
      gameStatus: 'rolling',
      showDialog: false
    }));
  }, []);

  const skipTurn = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: (prev.currentPlayer + 1) % prev.players.length,
      gameStatus: 'rolling',
      showDialog: false,
    }));
  }, []);

  return {
    gameState,
    rollDice,
    buyProperty,
    skipTurn,
    payJailFine
  };
};