
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
  PINK: '#ec4899', // Hot Pink
  CYAN: '#22d3ee', // Bright Cyan
  ORANGE: '#f97316', // Vibrant Orange
  LIME: '#84cc16', // Lime Green
  RED: '#dc2626', // Strong Red
  YELLOW: '#f59e0b', // Sunny Yellow
  BLUE: '#6366f1', // Indigo
  PURPLE: '#a855f7', // Purple
  GRAY: '#6b7280', // Gray
};

export const BOARD_SQUARES: Square[] = [
  { id: 0, name: 'Sản xuất Khởi nghiệp', type: SquareType.CORNER, color: PALETTE.GRAY, description: 'Điểm khởi đầu của mọi nhà tư bản.' },
  { id: 1, name: 'Mua Máy Móc', type: SquareType.PRODUCTION, color: PALETTE.PINK, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 2, name: 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.PINK, description: 'Trả 5 chip để có sức lao động.' },
  { id: 3, name: 'Cơ Hội', type: SquareType.EVENT, color: PALETTE.CYAN, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 4, name: 'Bán Hàng Có Lãi', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Bán sản phẩm, nhận 20 chip.' },
  { id: 5, name: 'Đầu Tư Chứng Khoán', type: SquareType.CASINO, color: PALETTE.RED, description: 'Mạo hiểm với thị trường tài chính.' },
  { id: 6, name: 'Chi Phí Sản Xuất', type: SquareType.PRODUCTION, color: PALETTE.PINK, description: 'Trả 10 chip cho chi phí vận hành.' },
  { id: 7, name: 'Vận Rủi', type: SquareType.EVENT, color: PALETTE.ORANGE, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 8, name: 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.CYAN, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 9, name: 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.CYAN, description: 'Trả 5 chip để có sức lao động.' },
  { id: 10, name: 'Khủng Hoảng Kinh Tế', type: SquareType.CORNER, color: PALETTE.GRAY, description: 'Chu kỳ tất yếu. Mất 15 chip hoặc nghỉ 1 lượt.' },
  { id: 11, name: 'Bán Siêu Lợi Nhuận', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Bán sản phẩm, nhận 25 chip.' },
  { id: 12, name: 'Bong Bóng BĐS', type: SquareType.CASINO, color: PALETTE.RED, description: 'Cơ hội và rủi ro từ nhà đất.' },
  { id: 13, name: 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.ORANGE, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 14, name: 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.ORANGE, description: 'Trả 5 chip để có sức lao động.' },
  { id: 15, name: 'Trúng Đậm!', type: SquareType.CASINO, color: PALETTE.RED, description: 'Vận may mỉm cười.' },
  { id: 16, 'name': 'Sự Kiện Bất Ngờ', type: SquareType.EVENT, color: PALETTE.BLUE, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 17, 'name': 'Bán Ra Nước Ngoài', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Bán sản phẩm, nhận 30 chip.' },
  { id: 18, 'name': 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.LIME, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 19, 'name': 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.LIME, description: 'Trả 5 chip để có sức lao động.' },
  { id: 20, 'name': 'Cách Mạng Công Nhân', type: SquareType.CORNER, color: PALETTE.GRAY, description: 'Tư sản > 70 chip phải chia 10 chip cho người < 40 chip.' },
  { id: 21, 'name': 'Cơ Hội', type: SquareType.EVENT, color: PALETTE.CYAN, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 22, 'name': 'Đầu Cơ Tích Trữ', type: SquareType.CASINO, color: PALETTE.RED, description: 'Mạo hiểm với thị trường tài chính.' },
  { id: 23, 'name': 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.PURPLE, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 24, 'name': 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.PURPLE, description: 'Trả 5 chip để có sức lao động.' },
  { id: 25, 'name': 'Thị Trường Bão Hòa', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Cung vượt cầu. Bán chỉ được 15 chip.' },
  { id: 26, 'name': 'Đầu Tư Thất Bại', type: SquareType.CASINO, color: PALETTE.RED, description: 'Mất trắng 15 chip.' },
  { id: 27, 'name': 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.BLUE, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 28, 'name': 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.BLUE, description: 'Trả 5 chip để có sức lao động.' },
  { id: 29, 'name': 'Bán Hàng Có Lãi', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Bán sản phẩm, nhận 20 chip.' },
  { id: 30, 'name': 'Nhà Nước Điều Tiết', type: SquareType.CORNER, color: PALETTE.GRAY, description: 'Người > 80 chip bị thu 10 chip, chia cho người nghèo nhất.' },
  { id: 31, 'name': 'Thoái Vốn', type: SquareType.CASINO, color: PALETTE.RED, description: 'Mạo hiểm với thị trường tài chính.' },
  { id: 32, 'name': 'Mua Nguyên Liệu', type: SquareType.PRODUCTION, color: PALETTE.ORANGE, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 33, 'name': 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.ORANGE, description: 'Trả 5 chip để có sức lao động.' },
  { id: 34, 'name': 'Cơ Hội', type: SquareType.EVENT, color: PALETTE.CYAN, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 35, 'name': 'Bán Hàng Có Lãi', type: SquareType.MARKET, color: PALETTE.YELLOW, description: 'Bán sản phẩm, nhận 20 chip.' },
  { id: 36, 'name': 'Vận Rủi', type: SquareType.EVENT, color: PALETTE.ORANGE, description: 'Một sự kiện bất ngờ có thể thay đổi tất cả.' },
  { id: 37, 'name': 'Mua Máy Móc', type: SquareType.PRODUCTION, color: PALETTE.LIME, description: 'Trả 10 chip để có tư liệu sản xuất.' },
  { id: 38, 'name': 'Cờ Bạc Tài Chính', type: SquareType.CASINO, color: PALETTE.RED, description: 'Mạo hiểm với thị trường tài chính.' },
  { id: 39, 'name': 'Thuê Công Nhân', type: SquareType.PRODUCTION, color: PALETTE.LIME, description: 'Trả 5 chip để có sức lao động.' },
];