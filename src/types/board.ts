export type SpotType = 
  | 'property'
  | 'railroad'
  | 'utility'
  | 'special'
  | 'corner';

export interface BaseBoardSpot {
  type: SpotType;
  name: string;
  position: number;
  owner?: string | null;
}

export interface PropertySpot extends BaseBoardSpot {
  type: 'property';
  price: number;
  rent: number;
}

export interface RailroadSpot extends BaseBoardSpot {
  type: 'railroad';
  price: number;
  rent: number;
}

export interface UtilitySpot extends BaseBoardSpot {
  type: 'utility';
  price: number;
  rent: number;
}

export interface SpecialSpot extends BaseBoardSpot {
  type: 'special';
  price?: number;
  action?: string;
}

export interface CornerSpot extends BaseBoardSpot {
  type: 'corner';
  action?: string;
}

export type BoardSpot = PropertySpot | RailroadSpot | UtilitySpot | SpecialSpot | CornerSpot;