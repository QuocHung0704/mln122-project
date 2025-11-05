import React from 'react';
import { Square } from '../../types/type';

const SquareIcon: React.FC<{ square: Square }> = ({ square }) => {
    const iconClass = "text-2xl leading-none";
    
    return (
        <div className="w-full flex-grow flex items-center justify-center">
            <span className={iconClass}>{square.icon}</span>
        </div>
    );
};

export default SquareIcon;