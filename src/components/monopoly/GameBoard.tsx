import React from 'react';
import { Player } from '../../types/type';
import { BOARD_SQUARES } from '../../../public/constant';
import SquareIcon from './SquareIcon';
import PawnIcon from './PawnIcon';

const getPositionOnGrid = (index: number, boardSize: number) => {
    const sideLength = boardSize / 4;
    let x = 0, y = 0;
    
    if (index >= 0 && index < sideLength) { // Bottom side
        x = index;
        y = sideLength - 1;
    } else if (index >= sideLength && index < sideLength * 2) { // Left side
        x = sideLength - 1;
        y = (sideLength - 1) - (index - sideLength);
    } else if (index >= sideLength * 2 && index < sideLength * 3) { // Top side
        x = (sideLength - 1) - (index - sideLength * 2);
        y = 0;
    } else { // Right side
        x = 0;
        y = index - sideLength * 3;
    }
    return { x, y };
};

const PlayerPawn: React.FC<{ player: Player; order: number; isCurrent: boolean }> = ({ player, order, isCurrent }) => {
    const { x, y } = getPositionOnGrid(player.position, BOARD_SQUARES.length);

    const offsets = [
      { x: '10%', y: '10%' }, { x: '60%', y: '10%' }, { x: '10%', y: '60%' }, { x: '60%', y: '60%' }
    ];
    const offset = offsets[order] || offsets[0];

    return (
        <div
            className="absolute transition-all duration-700 ease-in-out w-[10%] h-[10%]"
            style={{ 
                top: `${y * 10}%`, 
                left: `${x * 10}%`,
            }}
        >
            <div
                className={`absolute transition-transform duration-300 transform text-xl ${isCurrent ? 'scale-125 animate-player-bob' : 'hover:scale-110'}`}
                style={{
                    left: offset.x,
                    top: offset.y,
                    width: '60%',
                    height: '60%',
                }}
            >
                <PawnIcon color={player.color} icon={player.icon} className="w-full h-full" />
            </div>
        </div>
    );
};

const BoardSquare: React.FC<{ gridPosition: {x:number, y:number}; squareId: number }> = ({ gridPosition, squareId }) => {
    const square = BOARD_SQUARES[squareId];
    if (!square) return null;

    return (
        <div 
            className="bg-white border-2 border-black flex flex-col items-center justify-start text-center"
            style={{
                gridColumnStart: gridPosition.x + 1,
                gridRowStart: gridPosition.y + 1,
            }}
        >
            <div className="w-full h-4 border-b-2 border-black" style={{ backgroundColor: square.color }}></div>
            <div className="flex-1 flex flex-col justify-center items-center p-1">
                <p className="font-pixel text-[9px] font-bold leading-none uppercase text-center mb-1">{square.name}</p>
                <SquareIcon square={square} />
            </div>
        </div>
    );
};

const ProductionFeedback: React.FC<{ position: number }> = ({ position }) => {
    const { x, y } = getPositionOnGrid(position, BOARD_SQUARES.length);

    return (
        <div
            className="absolute transition-all duration-700 ease-in-out w-[10%] h-[10%] pointer-events-none"
            style={{ top: `${y * 10}%`, left: `${x * 10}%` }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping-fade-out font-pixel text-lg text-white" style={{ textShadow: '2px 2px 0 #000' }}>
                📦+1
            </div>
        </div>
    );
};

interface GameBoardProps {
    players: Player[];
    productionFeedback: { playerId: number; position: number } | null;
    currentPlayerId: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ players, productionFeedback, currentPlayerId }) => {
    const sideLength = BOARD_SQUARES.length / 4;
    
    return (
        <div id="game-board" className="w-full aspect-square max-w-[70vh] max-h-[70vh] pixel-panel p-4">
            <div className="relative w-full h-full">
                <div className="grid grid-cols-10 grid-rows-10 w-full h-full gap-1">
                    {Array.from({ length: sideLength * 4 }).map((_, index) => {
                        const gridPos = getPositionOnGrid(index, BOARD_SQUARES.length);
                        return <BoardSquare key={index} gridPosition={gridPos} squareId={index} />
                    })}
                </div>
                
                <div className="absolute inset-0">
                     {players.map((p) => {
                        const playersOnSquare = players.filter(pl => pl.position === p.position);
                        const order = playersOnSquare.findIndex(pl => pl.id === p.id);
                        return <PlayerPawn key={p.id} player={p} order={order} isCurrent={p.id === currentPlayerId} />
                    })}
                </div>

                {productionFeedback && <ProductionFeedback position={productionFeedback.position} />}

                <div className="absolute inset-[10%] border-4 border-black bg-emerald-500/80 flex items-center justify-center p-4">
                     <h1 className="text-4xl lg:text-5xl font-pixel text-white text-center leading-tight"
                        style={{ textShadow: '4px 4px 0 #000' }}>
                        VÒNG XOÁY TƯ BẢN
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default GameBoard;