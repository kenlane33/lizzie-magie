import { GameState, Player, Property, PublicTreasury } from '../types/game';
import { BOARD_SPOTS } from '../data/boardData';

export const WAGE_BASE = 100;
export const COLLEGE_COST = 50;
export const JAIL_FINE = 50;
export const MAX_JAIL_TURNS = 3;
export const EDUCATION_CARDS_FOR_PROFESSOR = 4;

export const calculateRent = (property: Property, gameState: GameState): number => {
  const { housesBuilt, gameMode } = gameState;
  let rent = property.rent;

  if (gameMode === 'singleTax') {
    return 0; // No rent in Single Tax mode
  }

  // Apply rent multipliers based on houses built
  if (housesBuilt >= 10) {
    rent *= 2;
  }
  if (housesBuilt >= 25) {
    rent *= 2;
  }

  return rent;
};

export const handlePublicTreasuryBalance = (
  treasury: PublicTreasury,
  amount: number
): Partial<PublicTreasury> => {
  const updates: Partial<PublicTreasury> = {
    balance: treasury.balance + amount
  };

  // Check for public acquisitions
  if (treasury.balance >= COLLEGE_COST) {
    if (treasury.collegesBuilt.length < 2) {
      updates.collegesBuilt = [
        ...treasury.collegesBuilt,
        treasury.collegesBuilt.length === 0 ? 'LORD_BLUEBLOOD' : 'HOGG_PRESERVES'
      ];
      updates.balance -= COLLEGE_COST;
    } else if (treasury.railroadsBought.length < 4) {
      const availableRailroads = BOARD_SPOTS.filter(
        spot => spot.type === 'railroad' && !treasury.railroadsBought.includes(spot.name)
      );
      if (availableRailroads.length > 0) {
        updates.railroadsBought = [...treasury.railroadsBought, availableRailroads[0].name];
        updates.balance -= COLLEGE_COST;
      }
    } else {
      // Increase wages
      updates.wageIncrease = Math.floor(treasury.balance / COLLEGE_COST) * 10;
    }
  }

  return updates;
};

export const getCurrentWage = (treasury: PublicTreasury): number => {
  return WAGE_BASE + treasury.wageIncrease;
};

export const isGameEnded = (gameState: GameState): boolean => {
  const { turnCount, players } = gameState;
  const wagesCollected = Math.floor(turnCount / players.length);
  return wagesCollected >= 5;
};

export const getWinner = (players: Player[]): Player => {
  return players.reduce((winner, player) => {
    const playerValue = player.money + 
      (player.properties.length * 100) + 
      (player.professorCards * 100);
    const winnerValue = winner.money + 
      (winner.properties.length * 100) + 
      (winner.professorCards * 100);
    return playerValue > winnerValue ? player : winner;
  }, players[0]);
};