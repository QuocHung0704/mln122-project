import React from 'react';
import { CHARACTER_MAP } from '../../config/constant';

interface PawnIconProps {
  color: string;
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

const PawnIcon: React.FC<PawnIconProps> = ({
  color,
  icon,
  className = '',
  style,
}) => {
  const character = CHARACTER_MAP[icon];

  return (
    <div
      className={`w-full h-full rounded-full border-[3px] border-black flex items-center justify-center overflow-hidden ${className}`} // Thêm overflow-hidden
      style={{ backgroundColor: color, ...style }}
    >
      {character ? (
        <img
          src={character.img}
          alt={character.name}
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/100')}
        />
      ) : (
        <span>{icon}</span>
      )}
    </div>
  );
};

export default PawnIcon;
