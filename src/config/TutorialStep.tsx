export interface TutorialStep {
    title: string;
    content: string;
    highlightId?: string;
    isInteractive?: boolean; 
  }
  
  export const TUTORIAL_STEPS: TutorialStep[] = [
    {
      title: 'Chào Mừng!',
      content: 'Chào mừng bạn đến với Vòng Xoáy Tư Bản! Hãy cùng tìm hiểu những điều cơ bản để trở thành nhà tư bản vĩ đại nhất.',
    },
    {
      title: 'Bảng Thông Tin',
      content: 'Đây là bảng thông tin của người chơi. Hãy theo dõi Lượng Chip (💰) và các Nguồn Lực của bạn tại đây.',
      highlightId: 'player-info-panel',
    },
    {
      title: 'Sản Xuất Hàng Hóa',
      content: 'Để sản xuất Hàng Hóa (📦), bạn cần cả Nguyên Liệu (🏭) và Sức Lao Động (👷). Khi có cả hai, chúng sẽ tự động kết hợp.',
      highlightId: 'player-resources-panel',
    },
    {
      title: 'Bắt Đầu Lượt Chơi',
      content: 'Đến lượt bạn rồi! Nhấn vào đây để tung xúc xắc và di chuyển.',
      highlightId: 'roll-dice-button',
      isInteractive: true,
    },
    {
      title: 'Di Chuyển & Hành Động',
      content: 'Quân cờ của bạn di chuyển theo kết quả xúc xắc. Việc dừng lại ở một ô sẽ kích hoạt một hành động.',
      highlightId: 'game-board',
    },
    {
      title: 'Nhật Ký Sự Kiện',
      content: 'Mọi hành động và sự kiện trong trò chơi đều được ghi lại ở đây.',
      highlightId: 'game-log-panel',
    },
    {
      title: 'Thị Trường & Bán Hàng',
      content: 'Khi bạn có Hàng Hóa (📦) và đi vào ô Chợ (💰), bạn sẽ tự động bán chúng để kiếm lời.',
      highlightId: 'game-board',
    },
    {
      title: 'Casino & Khủng Hoảng',
      content: 'Coi chừng các ô Casino! Mỗi lần vào đây sẽ làm tăng mức độ Khủng Hoảng, nhưng cũng cho bạn cơ hội trúng Jackpot lớn!',
      highlightId: 'crisis-jackpot-panel',
    },
    {
      title: 'Kết Thúc Lượt',
      content: 'Khi hành động của bạn hoàn tất, hãy nhấn vào đây để kết thúc lượt của mình.',
      highlightId: 'end-turn-button',
      isInteractive: true,
    },
    {
      title: 'Chúc May Mắn!',
      content: 'Đó là những điều cơ bản! Tích lũy nhiều vốn nhất sau 10 vòng để giành chiến thắng. Chúc may mắn, nhà tư bản!',
    },
  ];
  