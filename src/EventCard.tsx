import { EventCard, EffectType } from './type';

export const EVENT_CARDS: EventCard[] = [
  {
    id: 'evt_001',
    title: 'Chính Phủ Trợ Cấp',
    description: 'Một khoản trợ cấp bất ngờ từ chính phủ giúp bạn mở rộng sản xuất.',
    effectType: EffectType.GAIN_CHIPS,
    value: 15,
  },
  {
    id: 'evt_002',
    title: 'Công Nhân Đình Công',
    description: 'Bất đồng về lương bổng khiến dây chuyền sản xuất của bạn phải tạm dừng.',
    effectType: EffectType.MISS_TURN,
    value: 1,
  },
  {
    id: 'evt_003',
    title: 'Kiểm Tra Thuế',
    description: 'Cơ quan thuế phát hiện một vài sai sót trong sổ sách của bạn. Phải nộp phạt thôi.',
    effectType: EffectType.LOSE_CHIPS,
    value: 10,
  },
  {
    id: 'evt_004',
    title: 'Trúng Thầu Hợp Đồng Lớn',
    description: 'Bạn đã vượt qua các đối thủ để giành được một hợp đồng béo bở. Lợi nhuận đang tuôn chảy!',
    effectType: EffectType.GAIN_CHIPS,
    value: 20,
  },
  {
    id: 'evt_005',
    title: 'Khủng Hoảng Chuỗi Cung Ứng',
    description: 'Một mắt xích quan trọng trong chuỗi cung ứng bị đứt gãy. Bạn phải tốn chi phí để giải quyết.',
    effectType: EffectType.LOSE_CHIPS,
    value: 15,
  },
  {
    id: 'evt_006',
    title: 'Thị Trường Bùng Nổ',
    description: 'Nhu cầu thị trường tăng đột biến. Tất cả các nhà tư bản đều hưởng lợi.',
    effectType: EffectType.EVERYONE_GAINS,
    value: 10,
  },
  {
    id: 'evt_007',
    title: 'Luật Môi Trường Mới',
    description: 'Quy định mới về bảo vệ môi trường có hiệu lực. Mọi người đều phải đầu tư để nâng cấp.',
    effectType: EffectType.EVERYONE_LOSES,
    value: 5,
  },
  {
    id: 'evt_008',
    title: 'Tái Cấu Trúc',
    description: 'Bạn quyết định tái cấu trúc doanh nghiệp. Quay trở lại ô "Sản xuất Khởi nghiệp" để bắt đầu lại kế hoạch của mình.',
    effectType: EffectType.MOVE_TO,
    value: 0,
  },
  {
    id: 'evt_009',
    title: 'Đổi Mới Sáng Tạo',
    description: 'Một ý tưởng đột phá giúp bạn tối ưu hóa chi phí và tăng lợi nhuận.',
    effectType: EffectType.GAIN_CHIPS,
    value: 10,
  },
  {
    id: 'evt_010',
    title: 'Vụ Kiện Bằng Sáng Chế',
    description: 'Bạn thắng một vụ kiện bản quyền quan trọng. Nhà tư bản giàu nhất phải bồi thường cho bạn.',
    effectType: EffectType.PAY_PLAYER,
    value: 15, // Richest player pays current player 15
  },
];
