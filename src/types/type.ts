export enum SquareType {
    PRODUCTION = 'PRODUCTION',
    MARKET = 'MARKET',
    CASINO = 'CASINO',
    CORNER = 'CORNER',
    EVENT = 'EVENT',
  }
  
  export interface Square {
    id: number;
    name: string;
    type: SquareType;
    color: string;
    description: string;
  }
  
  export interface PlayerStats {
    goodsProduced: number;
    goodsSold: number;
    combosHit: number;
    casinoNet: number;
    jackpotsWon: number;
  }
  
  export interface Player {
    id: number;
    name: string;
    chips: number;
    position: number;
    color: string;
    icon: string;
    hasRawMaterials: boolean;
    hasLabor: boolean;
    goodsCount: number;
    missNextTurn: boolean;
    combo: {
      type: 'production' | 'market' | 'none';
      count: number;
    };
    stats: PlayerStats;
  }
  
  export enum GamePhase {
    SETUP,
    ROLLING,
    ACTION,
    TRADING,
    END_TURN,
    GAME_OVER,
  }
  
  export interface TradeOffer {
    fromPlayerId: number;
    toPlayerId: number;
    offer: {
      chips: number;
      hasRawMaterials: boolean;
      hasLabor: boolean;
    };
    request: {
      chips: number;
      hasRawMaterials: boolean;
      hasLabor: boolean;
    };
  }
  
  export enum EffectType {
    GAIN_CHIPS,
    LOSE_CHIPS,
    MISS_TURN,
    MOVE_TO,
    EVERYONE_GAINS,
    EVERYONE_LOSES,
    PAY_PLAYER,
  }
  
  export interface EventCard {
    id: string;
    title: string;
    description: string;
    effectType: EffectType;
    value: number;
    value2?: number; // For complex effects like PAY_PLAYER
  }