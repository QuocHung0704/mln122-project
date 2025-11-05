import { EventCard, EffectType } from '../../types/type';

export const THOI_CUOC_CARDS: EventCard[] = [
  {
    id: 'tc_001',
    title: 'Công Nghệ Mới',
    description: 'Bạn áp dụng công nghệ mới giúp tối ưu sản xuất. Nhận 10 chip.',
    effectType: EffectType.GAIN_CHIPS,
    value: 10,
  },
  {
    id: 'tc_002',
    title: 'Công Nhân Đình Công',
    description: 'Bất đồng về lương bổng khiến dây chuyền sản xuất của bạn phải tạm dừng.',
    effectType: EffectType.MISS_TURN,
    value: 1,
  },
  {
    id: 'tc_003',
    title: 'Hợp Đồng Lớn',
    description: 'Bạn trúng một hợp đồng sản xuất lớn. Nhận ngay 20 chip để mở rộng quy mô.',
    effectType: EffectType.GAIN_CHIPS,
    value: 20,
  },
  {
    id: 'tc_004',
    title: 'Đối Thủ Cạnh Tranh',
    description: 'Đối thủ tung sản phẩm mới, bạn phải giảm giá để cạnh tranh. Mất 10 chip.',
    effectType: EffectType.LOSE_CHIPS,
    value: 10,
  },
  {
    id: 'tc_005',
    title: 'Nguồn Cung Gián Đoạn',
    description: 'Nguồn cung nguyên liệu bị gián đoạn, chi phí tăng cao. Mất 15 chip.',
    effectType: EffectType.LOSE_CHIPS,
    value: 15,
  },
];

export const VAN_MENH_CARDS: EventCard[] = [
  {
    id: 'vm_001',
    title: 'Trúng Xổ Số',
    description: 'Vận may bất ngờ mỉm cười. Nhận 15 chip.',
    effectType: EffectType.GAIN_CHIPS,
    value: 15,
  },
  {
    id: 'vm_002',
    title: 'Kiểm Tra Thuế',
    description: 'Cơ quan thuế phát hiện sai sót. Nộp phạt 10 chip.',
    effectType: EffectType.LOSE_CHIPS,
    value: 10,
  },
  {
    id: 'vm_003',
    title: 'Thị Trường Bùng Nổ',
    description: 'Nhu cầu thị trường tăng đột biến. Tất cả các đội đều hưởng lợi!',
    effectType: EffectType.EVERYONE_GAINS,
    value: 10,
  },
  {
    id: 'vm_004',
    title: 'Luật Mới',
    description: 'Quy định mới có hiệu lực. Mọi người đều phải tốn chi phí để thích ứng.',
    effectType: EffectType.EVERYONE_LOSES,
    value: 5,
  },
  {
    id: 'vm_005',
    title: 'Tái Cấu Trúc',
    description: 'Bạn quyết định tái cấu trúc. Quay trở lại ô "Khởi Nghiệp" để bắt đầu lại kế hoạch.',
    effectType: EffectType.MOVE_TO,
    value: 0,
  },
];

// Fix: Export combined event cards array.
export const EVENT_CARDS = [...THOI_CUOC_CARDS, ...VAN_MENH_CARDS];
