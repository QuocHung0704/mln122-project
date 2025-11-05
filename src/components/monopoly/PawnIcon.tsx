import React from 'react';

interface PawnIconProps {
  color: string;
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

const PawnIcon: React.FC<PawnIconProps> = ({ color, icon, className = '', style }) => {
  // Kiểm tra xem icon có phải là URL/path (chứa / hoặc .) hay không
  // Hoặc kiểm tra xem có phải là http
  const isImage = icon.includes('http') || icon.includes('/') || icon.includes('.');

  return (
    <div
      className={`w-full h-full rounded-full border-[3px] border-black flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: color, ...style }}
    >
      {isImage ? (
        <img src={icon} alt="pawn" className="w-full h-full object-cover" />
      ) : (
        <span className="text-lg">{icon}</span> // Thêm class để emoji to hơn một chút nếu cần
      )}
    </div>
  );
};

export default PawnIcon;