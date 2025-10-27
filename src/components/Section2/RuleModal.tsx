import React from 'react';

const RulesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel w-full max-w-2xl mx-4 flex flex-col">
                <div className="flex justify-between items-center p-4 bg-yellow-400 border-b-4 border-black">
                    <h2 className="text-2xl font-pixel text-black">LUẬT CHƠI</h2>
                    <button onClick={onClose} className="w-10 h-10 pixel-button-color bg-red-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 text-gray-800 space-y-4 overflow-y-auto max-h-[70vh] pixel-panel-inset m-4">
                    <section>
                        <h3 className="text-lg font-pixel text-black mb-2">I. MỤC ĐÍCH</h3>
                        <p className="text-sm">Trò chơi giúp người chơi hiểu các khái niệm Kinh tế chính trị Mác – Lênin qua hình thức giải trí tương tác, kết hợp may rủi và chiến lược.</p>
                    </section>
                    
                    <section>
                        <h3 className="text-lg font-pixel text-black mb-2">II. CÁCH CHƠI</h3>
                        <div className="space-y-2 pl-4 text-sm">
                            <div>
                                <h4 className="font-bold">1. Khởi đầu</h4>
                                <ul className="list-disc list-inside ml-2">
                                    <li>Mỗi người chơi bắt đầu với 50 chip tại ô "Khởi nghiệp".</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold">2. Lượt chơi</h4>
                                <ul className="list-disc list-inside ml-2">
                                    <li>Tung 2 xúc xắc và di chuyển.</li>
                                    <li>Vượt qua ô "Khởi nghiệp", nhận 20 chip.</li>
                                    <li>Thực hiện hành động tại ô bạn dừng.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold">3. Sản xuất & Bán hàng</h4>
                                 <ul className="list-disc list-inside ml-2">
                                    <li>Cần có cả "Nguyên liệu" và "Lao động" để sản xuất.</li>
                                    <li>Khi đủ, chúng tự động chuyển thành 1 "Hàng hóa".</li>
                                    <li>Đến ô "Thị Trường" để bán "Hàng hóa" lấy chip.</li>
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold">4. Casino & Khủng hoảng</h4>
                                <ul className="list-disc list-inside ml-2">
                                    <li>Vào ô Casino sẽ chơi game may rủi.</li>
                                    <li>Mỗi lần vào Casino, "Thanh Khủng hoảng" sẽ tăng lên.</li>
                                    <li>Khi thanh này đầy, **"Đại Suy thoái"** xảy ra, tất cả mất 25% số chip!</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                     <section>
                        <h3 className="text-lg font-pixel text-black mb-2">III. KẾT THÚC</h3>
                        <p className="text-sm">Trò chơi kết thúc sau 10 vòng. Người có nhiều chip nhất sẽ thắng.</p>
                    </section>
                </div>

                <div className="p-4 text-center">
                     <button
                        onClick={onClose}
                        className="w-1/2 pixel-button-color bg-green-500 text-white font-pixel py-3 px-4 text-lg"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RulesModal;