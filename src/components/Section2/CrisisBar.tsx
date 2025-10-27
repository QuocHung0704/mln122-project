import React from 'react';

interface CrisisBarProps {
    crisisLevel: number;
    maxLevel: number;
}

const CrisisBar: React.FC<CrisisBarProps> = ({ crisisLevel, maxLevel }) => {
    const percentage = (crisisLevel / maxLevel) * 100;
    const barColor = percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-orange-400' : 'bg-yellow-400';

    return (
        <div className="p-3 pixel-panel">
            <h3 className="text-sm font-pixel mb-2 text-center text-red-600">
                KHỦNG HOẢNG
            </h3>
            <div className="w-full bg-gray-300 border-2 border-black h-6">
                <div
                    className={`h-full transition-all duration-500 ease-out flex items-center justify-center text-white font-pixel text-xs ${barColor} border-r-2 border-black`}
                    style={{ width: `${percentage}%` }}
                >
                   {crisisLevel > 0 && `${Math.round(percentage)}%`}
                </div>
            </div>
            <p className="text-center text-xs text-gray-700 mt-2 font-pixel">
                {crisisLevel} / {maxLevel}
            </p>
        </div>
    );
};

export default CrisisBar;