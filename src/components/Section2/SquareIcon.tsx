import React from 'react';
import { Square, SquareType } from '../../type';

const SquareIcon: React.FC<{ square: Square }> = ({ square }) => {
    const iconClass = "text-2xl leading-none";

    const renderIcon = () => {
        switch (square.type) {
            case SquareType.PRODUCTION:
                if (square.name.includes('Công Nhân')) return <span className={iconClass}>👷</span>;
                if (square.name.includes('Chi Phí')) return <span className={iconClass}>💸</span>;
                return <span className={iconClass}>🏭</span>;
            case SquareType.MARKET:
                return <span className={iconClass}>💰</span>;
            case SquareType.CASINO:
                return <span className={iconClass}>🎲</span>;
            case SquareType.EVENT:
                return <span className={iconClass}>❓</span>;
            case SquareType.CORNER:
                if (square.id === 0) return <span className={iconClass}>🏁</span>;
                if (square.id === 10) return <span className={iconClass}>📉</span>;
                if (square.id === 20) return <span className={iconClass}>✊</span>;
                if (square.id === 30) return <span className={iconClass}>⚖️</span>;
                return null;
            default:
                return null;
        }
    };
    
    return (
        <div className="w-full flex-grow flex items-center justify-center">
            {renderIcon()}
        </div>
    );
};

export default SquareIcon;
