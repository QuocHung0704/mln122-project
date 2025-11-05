import React from 'react';

interface PawnIconProps {
  color: string;
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

const PawnIcon: React.FC<PawnIconProps> = ({ color, icon, className = '', style }) => {
  // The parent container should control the font size for the emoji
  return (
    <div
      className={`w-full h-full rounded-full border-[3px] border-black flex items-center justify-center ${className}`}
      style={{ backgroundColor: color, ...style }}
    >
      <span>{icon}</span>
    </div>
  );
};

export default PawnIcon;
