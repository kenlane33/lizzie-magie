export type GameMode = 'standard' | 'singleTax';
export type GameStatus = 'rolling' | 'deciding' | 'paying' | 'collecting' | 'jail' | 'ended';

export interface Property {
  id: string;
  name: string;
  price: number;
  rent: number;
  position: number;
  type: 'property' | 'railroad' | 'utility' | 'tax' | 'corner';
  owner: string | null;
  houses: number;
}

export interface Player {
  id: string;
  name: string;
  money: number;
  position: number;
  properties: string[];
  color: string;
  inJail: boolean;
  jailTurns: number;
  educationCards: number;
  professorCards: number;
}

export interface PublicTreasury {
  balance: number;
  railroadsBought: string[];
  utilitiesBought: string[];
  collegesBuilt: string[];
  wageIncrease: number;
}

export interface GameState {
  players: Player[];
  properties: Property[];
  currentPlayer: number;
  dice: number[];
  gameStatus: GameStatus;
  gameMode: GameMode;
  winner: string | null;
  dialogMessage: string;
  showDialog: boolean;
  publicTreasury: PublicTreasury;
  turnCount: number;
  housesBuilt: number;
}