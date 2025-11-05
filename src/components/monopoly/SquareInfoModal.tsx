import React from 'react';
import { Square, SquareType } from '../../types/type';
import SquareIcon from './SquareIcon';

interface SquareInfoModalProps {
    square: Square;
    onClose: () => void;
}

const getSquareTypeLabel = (type: SquareType) => {
    switch (type) {
        case SquareType.PRODUCTION: return 'Sản Xuất';
        case SquareType.MARKET: return 'Thị Trường';
        case SquareType.CASINO: return 'Casino';
        case SquareType.EVENT: return 'Sự Kiện';
        case SquareType.CORNER: return 'Ô Đặc Biệt';
        default: return '';
    }
};

const SquareInfoModal: React.FC<SquareInfoModalProps> = ({ square, onClose }) => {
    return (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 text-center w-full max-w-sm mx-4 animate-scale-in">
                <h2 className="text-2xl font-pixel mb-2" style={{ color: square.color }}>
                    {getSquareTypeLabel(square.type)}
                </h2>
                
                <div className="pixel-panel-inset p-6 my-4 bg-white">
                    <div className="text-6xl mb-4 flex justify-center">
                        <SquareIcon square={square} />
                    </div>
                    <h3 className="font-bold text-lg">{square.name}</h3>
                    <p className="text-sm my-4 text-gray-700 min-h-[50px]">{square.description}</p>
                </div>
                
                <button 
                    onClick={onClose} 
                    className="w-full pixel-button-color text-white font-pixel py-3 text-lg text-shadow"
                    style={{ backgroundColor: square.color }}
                >
                    TIẾP TỤC
                </button>
            </div>
        </div>
    );
};

export default SquareInfoModal;