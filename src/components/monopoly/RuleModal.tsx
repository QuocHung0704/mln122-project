import React from 'react';

const RulesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel w-full max-w-2xl mx-4 flex flex-col animate-scale-in">
                <div className="flex justify-between items-center p-4 bg-yellow-400 border-b-4 border-black">
                    <h2 className="text-2xl font-pixel text-black">LUẬT CHƠI</h2>
                    <button onClick={onClose} className="w-10 h-10 pixel-button-color bg-red-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[70vh] bg-white">
                    <h3 className="font-bold text-lg mb-2">Mục Tiêu</h3>
                    <p className="mb-4 text-sm">Trở thành người chơi có nhiều Chip nhất sau 6 vòng chơi.</p>

                    <h3 className="font-bold text-lg mb-2">Cách Chơi</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Vào lượt của mình, người chơi tung 2 viên xúc xắc và di chuyển quân cờ theo tổng số nút.</li>
                        <li>Khi đi qua ô "Khởi Nghiệp", bạn nhận 10 chip tiền lương.</li>
                        <li>Dừng lại ở một ô sẽ kích hoạt hành động tương ứng của ô đó.</li>
                    </ul>

                    <h3 className="font-bold text-lg mt-4 mb-2">Các Loại Ô</h3>
                    <div className="space-y-3 text-sm">
                        <p><strong>🏭 Sản Xuất:</strong> Trả chip để nhận thẻ Nguyên Liệu hoặc Lao Động. Khi có cả hai, chúng sẽ tự động kết hợp thành một Hàng Hóa.</p>
                        <p><strong>💹 Thị Trường:</strong> Bán Hàng Hóa để nhận chip. Càng bán nhiều, combo càng lớn và thưởng càng cao.</p>
                        <p><strong>🎲 Casino:</strong> Cược chip để thử vận may. Thắng có thể nhân đôi, nhân ba tiền cược, hoặc thậm chí trúng Jackpot! Tuy nhiên, mỗi lần chơi sẽ làm tăng mức độ Khủng Hoảng.</p>
                        <p><strong>❓ Sự Kiện:</strong> Rút một thẻ sự kiện và thực hiện theo hướng dẫn.</p>
                        <p><strong>⚡ Ô Góc:</strong> Các ô đặc biệt với hiệu ứng riêng, có thể tốt hoặc xấu.</p>
                    </div>
                    
                    <h3 className="font-bold text-lg mt-4 mb-2">Khủng Hoảng & Jackpot</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Mỗi khi một người chơi vào ô Casino (dù có cược hay không), thanh <span className="text-red-600 font-bold">Khủng Hoảng</span> sẽ tăng lên.</li>
                        <li>Khi thanh Khủng Hoảng đạt 100%, một sự kiện <span className="text-red-600 font-bold">ĐẠI SUY THOÁI</span> sẽ xảy ra, tất cả người chơi mất 25% số chip hiện có.</li>
                        <li>Mỗi khi người chơi thua cược tại Casino, một phần tiền cược sẽ được thêm vào hũ <span className="text-yellow-600 font-bold">Jackpot</span>.</li>
                        <li>Để trúng Jackpot, người chơi phải tung được hai con 6 khi cược ở Casino.</li>
                    </ul>
                    
                    <h3 className="font-bold text-lg mt-4 mb-2">Giao Dịch</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Vào đầu lượt của mình (trước khi tung xúc xắc), bạn có thể mời người chơi khác giao dịch.</li>
                        <li>Bạn có thể trao đổi Chip, thẻ Nguyên Liệu và Lao Động.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;
