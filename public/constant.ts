import { Character, Square, SquareType } from '../src/types/type';

export const PLAYER_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#eab308'];

export const CHARACTERS: Character[] = [
  {
    id: 'smith',
    name: 'Adam Smith',
    img: 'https://tse4.mm.bing.net/th/id/OIP.zdpVzbhGU1lkZA3TD8mzMgHaHa?pid=Api&P=0&h=180',
    cardImg: './assets/yellow card.png',
  },
  {
    id: 'engels',
    name: 'Friedrich Engels',
    img: 'https://tse3.mm.bing.net/th/id/OIP.vPp7yBzLDBwfR9IgjjTZxgHaJ4?pid=Api&P=0&h=180',
    cardImg: '../assets/green card.png',
  },
  {
    id: 'marx', 
    name: 'Karl Marx',
    img: 'https://tse2.mm.bing.net/th/id/OIP.EdQ2y8gyLuSugbb5tUOprwHaJY?pid=Api&P=0&h=180',
    cardImg: '../assets/red card.png',
  },
  {
    id: 'montchrestien',
    name: 'Antoine de Montchrestien',
    img: 'https://cdn.britannica.com/75/151775-050-BD03DDB7/portrait-prelate-French-Cardinal-Richelieu-statesman.jpg?w=300',
    cardImg: '../assets/blue card.png',
  },
];

export const CHARACTER_MAP: Record<string, Character> = CHARACTERS.reduce(
  (acc, char) => {
    acc[char.id] = char;
    return acc;
  },
  {} as Record<string, Character>,
);

// New color palette inspired by the reference image
const PALETTE = {
  CORNER_ORANGE: '#f59e0b',
  LABOR_PINK: '#ec4899',
  CASINO_RED: '#dc2626',
  MARKET_GREEN: '#84cc16',
  EVENT_GREEN: '#22c55e',
  MATERIAL_RED: '#f97316',
  EVENT_BLUE: '#3b82f6',
  CORNER_GREEN: '#166534',
  CORNER_PINK: '#be185d',
  GRAY: '#6b7280', // Fallback
};

export const BOARD_SQUARES: Square[] = [
  // Side 1: Bottom to Right
  { id: 0, name: 'Khởi Nghiệp', type: SquareType.CORNER, color: PALETTE.CORNER_ORANGE, description: 'Điểm bắt đầu. Đi qua đây nhận 10 chip tiền lương.', icon: '💼' },
  { id: 1, name: 'Lao Động', type: SquareType.PRODUCTION, color: PALETTE.LABOR_PINK, description: 'Trả 5 chip để nhận 1 Thẻ Lao động.', icon: '🪚' },
  { id: 2, name: 'Casino', type: SquareType.CASINO, color: PALETTE.CASINO_RED, description: 'Cược chip và thử vận may với xúc xắc!', icon: '🎰',
    multipliers: { win: 2, bigWin: 3 }
  },
  { id: 3, name: 'Thị Trường', type: SquareType.MARKET, color: PALETTE.MARKET_GREEN, description: 'Bán 1 bộ (Nguyên liệu + Lao động) để nhận 20 chip.', icon: '🚂' },
  { id: 4, name: 'Vận Mệnh', type: SquareType.EVENT, color: PALETTE.EVENT_GREEN, description: 'Rút một thẻ sự kiện Vận Mệnh.', icon: '🍀', subType: 'van_menh' },
  { id: 5, name: 'Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.MATERIAL_RED, description: 'Trả 10 chip để nhận 1 Thẻ Nguyên liệu.', icon: '🪵' },
  { id: 6, name: 'Thời Cuộc', type: SquareType.EVENT, color: PALETTE.EVENT_BLUE, description: 'Rút một thẻ sự kiện Thời Cuộc.', icon: '🎲', subType: 'thoi_cuoc' },
  
  // Side 2: Right to Top
  { id: 7, name: 'Cách Mạng Công Nhân', type: SquareType.CORNER, color: PALETTE.CORNER_GREEN, description: 'San bằng khoảng cách! Đội nhiều chip nhất chia 10 chip cho đội ít chip nhất.', icon: '🚧' },
  { id: 8, name: 'Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.MATERIAL_RED, description: 'Trả 10 chip để nhận 1 Thẻ Nguyên liệu.', icon: '🦀' },
  { id: 9, name: 'Thời Cuộc', type: SquareType.EVENT, color: PALETTE.EVENT_BLUE, description: 'Rút một thẻ sự kiện Thời Cuộc.', icon: '🎲', subType: 'thoi_cuoc' },
  { id: 10, name: 'Casino', type: SquareType.CASINO, color: PALETTE.CASINO_RED, description: 'Cược chip và thử vận may với xúc xắc!', icon: '🎰',
    multipliers: { win: 2, bigWin: 3 }
  },
  { id: 11, name: 'Lao Động', type: SquareType.PRODUCTION, color: PALETTE.LABOR_PINK, description: 'Trả 5 chip để nhận 1 Thẻ Lao động.', icon: '👷' },
  { id: 12, name: 'Vận Mệnh', type: SquareType.EVENT, color: PALETTE.EVENT_GREEN, description: 'Rút một thẻ sự kiện Vận Mệnh.', icon: '🍀', subType: 'van_menh' },
  { id: 13, name: 'Thị Trường', type: SquareType.MARKET, color: PALETTE.MARKET_GREEN, description: 'Bán 1 bộ (Nguyên liệu + Lao động) để nhận 20 chip.', icon: '⚓' },
  
  // Side 3: Top to Left
  { id: 14, name: 'Nhà Nước Can Thiệp', type: SquareType.CORNER, color: PALETTE.CORNER_PINK, description: 'Tái phân phối! Đội nhiều chip nhất phải trả 10 chip cho Ngân hàng.', icon: '⚖️' },
  { id: 15, name: 'Casino', type: SquareType.CASINO, color: PALETTE.CASINO_RED, description: 'Cược chip và thử vận may với xúc xắc!', icon: '🎰',
    multipliers: { win: 2, bigWin: 3 }
  },
  { id: 16, name: 'Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.MATERIAL_RED, description: 'Trả 10 chip để nhận 1 Thẻ Nguyên liệu.', icon: '📦' },
  { id: 17, name: 'Vận Mệnh', type: SquareType.EVENT, color: PALETTE.EVENT_GREEN, description: 'Rút một thẻ sự kiện Vận Mệnh.', icon: '🍀', subType: 'van_menh' },
  { id: 18, name: 'Thị Trường', type: SquareType.MARKET, color: PALETTE.MARKET_GREEN, description: 'Bán 1 bộ (Nguyên liệu + Lao động) để nhận 20 chip.', icon: '⛲' },
  { id: 19, name: 'Lao Động', type: SquareType.PRODUCTION, color: PALETTE.LABOR_PINK, description: 'Trả 5 chip để nhận 1 Thẻ Lao động.', icon: '👷' },
  { id: 20, name: 'Thời Cuộc', type: SquareType.EVENT, color: PALETTE.EVENT_BLUE, description: 'Rút một thẻ sự kiện Thời Cuộc.', icon: '🎲', subType: 'thoi_cuoc' },
  
  // Side 4: Left to Bottom
  { id: 21, name: 'Khủng Hoảng Kinh Tế', type: SquareType.CORNER, color: PALETTE.CORNER_ORANGE, description: 'Vận rủi ập đến! Mất ngay 20 chip.', icon: '💥' },
  { id: 22, name: 'Vận Mệnh', type: SquareType.EVENT, color: PALETTE.EVENT_GREEN, description: 'Rút một thẻ sự kiện Vận Mệnh.', icon: '🍀', subType: 'van_menh' },
  { id: 23, name: 'Casino', type: SquareType.CASINO, color: PALETTE.CASINO_RED, description: 'Cược chip và thử vận may với xúc xắc!', icon: '🎰',
    multipliers: { win: 2, bigWin: 3 }
  },
  { id: 24, name: 'Thị Trường', type: SquareType.MARKET, color: PALETTE.MARKET_GREEN, description: 'Bán 1 bộ (Nguyên liệu + Lao động) để nhận 20 chip.', icon: '⛵' },
  { id: 25, name: 'Thời Cuộc', type: SquareType.EVENT, color: PALETTE.EVENT_BLUE, description: 'Rút một thẻ sự kiện Thời Cuộc.', icon: '🎲', subType: 'thoi_cuoc' },
  { id: 26, name: 'Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.MATERIAL_RED, description: 'Trả 10 chip để nhận 1 Thẻ Nguyên liệu.', icon: '💰' },
  { id: 27, name: 'Lao Động', type: SquareType.PRODUCTION, color: PALETTE.LABOR_PINK, description: 'Trả 5 chip để nhận 1 Thẻ Lao động.', icon: '🌾' },
];