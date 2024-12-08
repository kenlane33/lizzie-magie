import { BoardSpot } from '../types/board';

export const BOARD_SPOTS: BoardSpot[] = [
  // Bottom Row (left to right)
  {
    type: 'special',
    name: 'WAY BACK',
    position: 0
  },
  {
    type: 'property',
    name: 'ABSOLUTE NECESSITY',
    price: 10,
    rent: 0,
    position: 1
  },
  {
    type: 'property',
    name: 'FUEL',
    price: 10,
    rent: 0,
    position: 2
  },
  {
    type: 'special',
    name: 'LONE LANE',
    price: 25,
    position: 3
  },
  {
    type: 'special',
    name: 'NO TRESPASSING',
    price: 50,
    position: 4
  },
  {
    type: 'property',
    name: 'ROYAL RISING',
    price: 50,
    rent: 0,
    position: 5
  },
  {
    type: 'property',
    name: 'THE PLAZA',
    price: 25,
    rent: 0,
    position: 6
  },
  {
    type: 'property',
    name: 'THE FARM',
    price: 25,
    rent: 0,
    position: 7
  },
  {
    type: 'property',
    name: 'SPECULATION',
    price: 50,
    rent: 0,
    position: 8
  },
  {
    type: 'property',
    name: 'UBEVILLE',
    price: 25,
    rent: 0,
    position: 9
  },
  // Left Column (bottom to top)
  {
    type: 'property',
    name: 'BOOMTOWN',
    price: 50,
    rent: 6,
    position: 10
  },
  {
    type: 'property',
    name: 'COAL ALLEY',
    price: 50,
    rent: 6,
    position: 11
  },
  {
    type: 'property',
    name: 'SATURN LIGHTING',
    price: 50,
    rent: 5,
    position: 12
  },
  {
    type: 'property',
    name: 'BEGGARMAN\'S CT',
    price: 50,
    rent: 8,
    position: 13
  },
  {
    type: 'special',
    name: 'STRUGGLE ST',
    price: 5,
    position: 14
  },
  {
    type: 'property',
    name: 'RICKETY ROW',
    price: 50,
    rent: 10,
    position: 15
  },
  {
    type: 'property',
    name: 'NECESSITY',
    price: 10,
    rent: 10,
    position: 16
  },
  {
    type: 'property',
    name: 'MARKET PLACE',
    price: 50,
    rent: 10,
    position: 17
  },
  {
    type: 'property',
    name: 'COTTAGE TERR',
    price: 50,
    rent: 12,
    position: 18
  },
  // Top Row (left to right)
  {
    type: 'corner',
    name: 'POOR HOUSE',
    position: 19
  },
  {
    type: 'property',
    name: 'EASY STREET',
    price: 75,
    rent: 12,
    position: 20
  },
  {
    type: 'special',
    name: 'CHANCE',
    position: 21
  },
  {
    type: 'property',
    name: 'GEORGE STREET',
    price: 75,
    rent: 14,
    position: 22
  },
  {
    type: 'property',
    name: 'MAGPIE FLATS',
    price: 75,
    rent: 14,
    position: 23
  },
  {
    type: 'railroad',
    name: 'GEEL WHIZ R.R.',
    price: 50,
    rent: 15,
    position: 24
  },
  {
    type: 'property',
    name: 'FAIRHOPE AVE',
    price: 75,
    rent: 16,
    position: 25
  },
  {
    type: 'railroad',
    name: 'SLAMBANG TR.',
    price: 50,
    rent: 5,
    position: 26
  },
  {
    type: 'property',
    name: 'JOHNSON CIRCLE',
    price: 75,
    rent: 16,
    position: 27
  },
  {
    type: 'property',
    name: 'THE BOWERY',
    price: 75,
    rent: 18,
    position: 28
  },
  // Right Column (top to bottom)
  {
    type: 'corner',
    name: 'GO TO JAIL',
    position: 29
  },
  {
    type: 'property',
    name: 'BROADWAY',
    price: 100,
    rent: 18,
    position: 30
  },
  {
    type: 'property',
    name: 'MADISON SQ',
    price: 100,
    rent: 20,
    position: 31
  },
  {
    type: 'property',
    name: 'FIFTH AVENUE',
    price: 100,
    rent: 20,
    position: 32
  },
  {
    type: 'railroad',
    name: 'P.D.Q.R.R.',
    price: 50,
    rent: 5,
    position: 33
  },
  {
    type: 'property',
    name: 'GRAND BLVD',
    price: 100,
    rent: 22,
    position: 34
  },
  {
    type: 'special',
    name: 'CHANCE',
    position: 35
  },
  {
    type: 'property',
    name: 'WALL STREET',
    price: 100,
    rent: 22,
    position: 36
  },
  {
    type: 'special',
    name: 'LUXURY',
    price: 75,
    position: 37
  },
  {
    type: 'special',
    name: 'COLLECT WAGES',
    position: 38,
    action: 'Collect wages'
  }
];

export const INITIAL_MONEY = 1500;
export const PASSING_GO_AMOUNT = 200;
export const PLAYER_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

export const PUBLIC_TREASURY = {
  denominations: [1, 5, 10, 50, 100]
};