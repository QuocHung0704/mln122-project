import React from 'react';
import { Player, Square, SquareType } from '../../types/type';
import SquareIcon from './SquareIcon';
import PawnIcon from './PawnIcon';

// --- Constants for circular layout ---
const BOARD_RADIUS_PERCENT = 45; // Radius of the circle on which squares are centered
const PAWN_RADIUS_PERCENT = 37; // Radius for player pawns, slightly inside the squares

interface LayoutProps {
    layout: {
        squareSize: number;
        fontSize: number;
        boardSize: number;
        pageBackground: string;
    };
}

// --- Positioning logic for a circular layout ---
const getPositionOnCircle = (index: number, totalSquares: number, radius: number) => {
    // Angle for each square slot
    const slotAngleRad = (2 * Math.PI) / totalSquares;

    // Start at the bottom (PI/2 or 90 degrees) and lay out squares clockwise
    const angleRad = (Math.PI / 2) + (index * slotAngleRad);

    // Center coordinates are (50, 50) in percentage.
    const left = 50 + radius * Math.cos(angleRad);
    const top = 50 + radius * Math.sin(angleRad);

    // Rotation of the element to face outwards from the center.
    const rotationDeg = angleRad * (180 / Math.PI) - 90;

    return { top, left, rotationDeg };
};


const PlayerPawn: React.FC<{ player: Player; order: number; isCurrent: boolean; totalSquares: number; } & LayoutProps> = ({ player, order, isCurrent, totalSquares, layout }) => {
    const PAWN_SIZE_PERCENT = layout.squareSize * 0.8; // Relative to square size
    // Stagger pawns inward from the main pawn radius for multiple players on the same square
    const pawnRadius = PAWN_RADIUS_PERCENT - (order * (PAWN_SIZE_PERCENT * 0.6));
    const { top, left } = getPositionOnCircle(player.position, totalSquares, pawnRadius);

    return (
        <div
            className="absolute transition-all duration-700 ease-in-out"
            style={{ 
                top: `${top}%`, 
                left: `${left}%`,
                width: `${PAWN_SIZE_PERCENT}%`,
                height: `${PAWN_SIZE_PERCENT}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20 + order, // Pawns are above squares
            }}
        >
            <div
                className={`w-full h-full transition-transform duration-300 transform ${isCurrent ? 'scale-125 animate-player-bob' : 'hover:scale-110'}`}
            >
                <PawnIcon color={player.color} icon={player.icon} className="w-full h-full" />
            </div>
        </div>
    );
};

const BoardSquare: React.FC<{ square: Square; index: number; totalSquares: number; } & LayoutProps> = ({ square, index, totalSquares, layout }) => {
    if (!square) return null;
    
    const { top, left, rotationDeg } = getPositionOnCircle(index, totalSquares, BOARD_RADIUS_PERCENT);
    
    const widthPercent = layout.squareSize;
    const heightPercent = layout.squareSize * 1.5;

    const isCasino = square.type === SquareType.CASINO;
    const hasCustomBackground = !!square.backgroundUrl;

    const squareStyle: React.CSSProperties = {
        top: `${top}%`,
        left: `${left}%`,
        width: `${widthPercent}%`,
        height: `${heightPercent}%`,
        transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
        zIndex: 10,
    };

    let squareClassName = "absolute border-2 border-black flex flex-col items-center justify-start text-center";

    if (hasCustomBackground) {
        squareStyle.backgroundImage = `url(${square.backgroundUrl})`;
        squareStyle.backgroundSize = 'cover';
        squareStyle.backgroundPosition = 'center';
    } else if (square.backgroundColor) {
        squareStyle.backgroundColor = square.backgroundColor;
    } else {
        squareClassName += ' bg-white';
    }
    
    if (isCasino && !hasCustomBackground) {
         squareStyle.animation = 'casino-glow 2s ease-in-out infinite';
    }

    return (
        <div 
            className={squareClassName}
            style={squareStyle}
        >
            {isCasino && !hasCustomBackground && (
                <>
                    <div style={{ position: 'absolute', top: '15%', left: '10%', width: '8%', height: '5%', background: 'white', borderRadius: '50%', animation: 'sparkle 2s infinite 0s', boxShadow: '0 0 5px #fff, 0 0 10px #fef08a' }} />
                    <div style={{ position: 'absolute', top: '20%', left: '85%', width: '10%', height: '6%', background: 'white', borderRadius: '50%', animation: 'sparkle 2s infinite 0.5s', boxShadow: '0 0 5px #fff, 0 0 10px #fef08a' }} />
                    <div style={{ position: 'absolute', top: '70%', left: '80%', width: '7%', height: '4%', background: 'white', borderRadius: '50%', animation: 'sparkle 2s infinite 1s', boxShadow: '0 0 5px #fff, 0 0 10px #fef08a' }} />
                    <div style={{ position: 'absolute', top: '80%', left: '20%', width: '9%', height: '5%', background: 'white', borderRadius: '50%', animation: 'sparkle 2s infinite 1.5s', boxShadow: '0 0 5px #fff, 0 0 10px #fef08a' }} />
                </>
            )}
            <div className={`w-full h-2 flex-shrink-0 border-b-2 border-black`} style={{ backgroundColor: square.color }}></div>
            <div className="flex-1 flex flex-col justify-center items-center p-1 w-full overflow-hidden">
                <p 
                    className="font-pixel font-bold leading-tight uppercase text-center" 
                    style={{ 
                        fontSize: `${layout.fontSize}vh`,
                        ...(isCasino && !hasCustomBackground && { color: '#fce7f3', textShadow: '0 0 2px #fff, 0 0 5px #fff, 0 0 10px #ec4899, 0 0 15px #ec4899' })
                    }}
                >
                    {square.name}
                </p>
                {!hasCustomBackground && (
                    <div className="text-[2.5vh] mt-1">
                        <SquareIcon square={square} />
                    </div>
                )}
            </div>
        </div>
    );
};


const ProductionFeedback: React.FC<{ position: number; totalSquares: number }> = ({ position, totalSquares }) => {
    // Position the feedback near where the pawns are.
    const { top, left } = getPositionOnCircle(position, totalSquares, PAWN_RADIUS_PERCENT);

    return (
        <div
            className="absolute pointer-events-none"
            style={{ 
                top: `${top}%`, 
                left: `${left}%`,
                zIndex: 50,
            }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping-fade-out font-pixel text-lg text-white" style={{ textShadow: '2px 2px 0 #000' }}>
                💰+20
            </div>
        </div>
    );
};

interface GameBoardProps {
    players: Player[];
    productionFeedback: { playerId: number; position: number } | null;
    currentPlayerId: number;
    board: Square[];
    layout: { squareSize: number; fontSize: number; boardSize: number; pageBackground: string; };
}

const GameBoard: React.FC<GameBoardProps> = ({ players, productionFeedback, currentPlayerId, board, layout }) => {
    const boardStyle: React.CSSProperties = {
        maxWidth: `${layout.boardSize}vh`,
        maxHeight: `${layout.boardSize}vh`,
    };

    return (
        <div 
            id="game-board" 
            className="w-full aspect-square pixel-panel p-4 bg-[#e7e2c9] rounded-full"
            style={boardStyle}
        >
            <div className="relative w-full h-full">
                {/* Centerpiece - ĐÃ SỬA ĐỔI */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] border-4 border-black bg-[#166534] rounded-full flex flex-col items-center justify-center p-4">
                    {/* XÓA SVG VÀ H1, THAY BẰNG IMG */}
                    <img 
                        src="/public/assets/CCD-06.png" 
                        alt="Logo Cờ Công Dân" 
                        className="max-w-[80%] max-h-[80%] object-contain" 
                    />
                </div>

                {/* Squares rendered on the circumference */}
                <div className="w-full h-full">
                    {board.map((square, index) => (
                        <BoardSquare key={index} square={square} index={index} totalSquares={board.length} layout={layout} />
                    ))}
                </div>
                
                {/* Players rendered on top */}
                <div className="absolute inset-0">
                     {players.map((p) => {
                        const playersOnSquare = players.filter(pl => pl.position === p.position);
                        const order = playersOnSquare.findIndex(pl => pl.id === p.id);
                        return <PlayerPawn key={p.id} player={p} order={order} isCurrent={p.id === currentPlayerId} totalSquares={board.length} layout={layout} />
                    })}
                </div>

                {productionFeedback && <ProductionFeedback position={productionFeedback.position} totalSquares={board.length} />}
            </div>
        </div>
    );
};

export default GameBoard;