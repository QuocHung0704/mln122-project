import React from 'react';
import { Player, GamePhase } from '../../types/type';
import GameLog from './GameLog';
import CrisisBar from './CrisisBar';

const Dice: React.FC<{ value: number; isRolling: boolean }> = ({ value, isRolling }) => {
    const [displayValue, setDisplayValue] = React.useState(value);

    React.useEffect(() => {
        if (isRolling) {
            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 6) + 1);
            }, 100);
            return () => clearInterval(interval);
        } else {
            setDisplayValue(value);
        }
    }, [isRolling, value]);

    const positions: { [key: number]: string[] } = {
        1: ['center'],
        2: ['top-left', 'bottom-right'],
        3: ['top-left', 'center', 'bottom-right'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const pipPositions = positions[displayValue] || [];

    return (
        <div className="w-12 h-12 bg-white rounded-md border-2 border-black p-1 relative shadow-[inset_0_5px_0px_rgba(255,255,255,0.4),_inset_0_-5px_0px_rgba(0,0,0,0.2)]">
            {pipPositions.map(pos => {
                let posClass = '';
                if(pos === 'center') posClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
                if(pos === 'top-left') posClass = 'top-1.5 left-1.5';
                if(pos === 'top-right') posClass = 'top-1.5 right-1.5';
                if(pos === 'bottom-left') posClass = 'bottom-1.5 left-1.5';
                if(pos === 'bottom-right') posClass = 'bottom-1.5 right-1.5';
                if(pos === 'middle-left') posClass = 'top-1/2 left-1.5 -translate-y-1/2';
                if(pos === 'middle-right') posClass = 'top-1/2 right-1.5 -translate-y-1/2';
                
                return <div key={pos} className={`absolute w-2 h-2 bg-black rounded-full ${posClass}`}></div>
            })}
        </div>
    );
}

// --- Controls Component (embedded) ---
const Controls: React.FC<{
    onRollDice: () => void;
    onEndTurn: () => void;
    gamePhase: GamePhase;
    currentPlayer: Player;
    dice: [number, number];
    isDiceRolling: boolean;
}> = ({ onRollDice, onEndTurn, gamePhase, currentPlayer, dice, isDiceRolling }) => {

    const getButtonText = () => {
        if (isDiceRolling) return '...';
        switch (gamePhase) {
            case GamePhase.ROLLING: return currentPlayer.missNextTurn ? 'BỎ LƯỢT' : 'TUNG XÚC XẮC';
            case GamePhase.END_TURN: return 'KẾT THÚC LƯỢT';
            default: return 'ĐANG CHỜ...';
        }
    }
    const isDisabled = (gamePhase !== GamePhase.ROLLING && gamePhase !== GamePhase.END_TURN) || isDiceRolling;
    const handleClick = gamePhase === GamePhase.ROLLING ? onRollDice : onEndTurn;
    const buttonId = gamePhase === GamePhase.ROLLING ? 'roll-dice-button' : (gamePhase === GamePhase.END_TURN ? 'end-turn-button' : undefined);


    return (
        <div className="pixel-panel p-3 text-center">
            <h3 className="font-pixel text-sm mb-2 font-bold">Lượt của: <span style={{color: currentPlayer.color}}>{currentPlayer.name}</span></h3>
            <div className="flex justify-center gap-4 my-3">
                 <Dice value={dice[0]} isRolling={isDiceRolling} />
                 <Dice value={dice[1]} isRolling={isDiceRolling} />
            </div>
            <button
                id={buttonId}
                onClick={handleClick}
                disabled={isDisabled}
                className="w-full pixel-button-color bg-blue-500 text-white disabled:bg-gray-500 font-pixel py-3 px-4 text-lg text-shadow"
            >
                {getButtonText()}
            </button>
        </div>
    )
}

// --- Main Right Panel Component ---
interface RightPanelProps {
    round: number;
    crisisLevel: number;
    log: string[];
    dice: [number, number];
    isDiceRolling: boolean;
    onRollDice: () => void;
    onEndTurn: () => void;
    gamePhase: GamePhase;
    currentPlayer: Player;
    onShowRules: () => void;
    viewMode: 'board' | 'status';
    onToggleView: () => void;
    onShowCustomizer: () => void;
}

const RightPanel: React.FC<RightPanelProps> = (props) => {
    return (
        // THAY ĐỔI: Thêm 'lg:h-full' thay vì 'h-full'
         <aside id="right-panel" className="lg:h-full pixel-panel p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-pixel text-2xl text-center font-bold">
                    Vòng {props.round}/6
                </h2>
                <div className="flex items-center gap-2">
                    <button onClick={props.onToggleView} title="Toggle View" className="w-10 h-10 pixel-button-color bg-indigo-500 flex items-center justify-center font-pixel text-xs text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <button onClick={props.onShowCustomizer} title="Edit Board" className="w-10 h-10 pixel-button-color bg-pink-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                        </svg>
                    </button>
                    <button onClick={props.onShowRules} title="Show Rules" className="w-10 h-10 pixel-button-color bg-yellow-400 flex items-center justify-center font-pixel text-2xl font-bold text-black">?</button>
                </div>
            </div>
             <div id="crisis-panel">
                <CrisisBar crisisLevel={props.crisisLevel} maxLevel={10} />
            </div>
            
            <Controls 
                onRollDice={props.onRollDice}
                onEndTurn={props.onEndTurn}
                gamePhase={props.gamePhase}
                currentPlayer={props.currentPlayer}
                dice={props.dice}
                isDiceRolling={props.isDiceRolling}
            />
            
            <div id="game-log-panel" className="flex-grow flex flex-col min-h-0">
                <GameLog log={props.log} />
            </div>

        </aside>
    );
};

export default RightPanel;