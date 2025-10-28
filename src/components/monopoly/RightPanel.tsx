import React, { useState, useEffect } from 'react';
import { Player, GamePhase } from '../../types/type';
import CrisisBar from './CrisisBar';
import GameLog from './GameLog';

const Dice: React.FC<{ value: number; isRolling: boolean }> = ({ value, isRolling }) => {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
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
        <div className="w-12 h-12 bg-white border-2 border-black p-1 relative">
            {pipPositions.map(pos => {
                let posClass = '';
                if (pos === 'center') posClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
                if (pos === 'top-left') posClass = 'top-1 left-1';
                if (pos === 'top-right') posClass = 'top-1 right-1';
                if (pos === 'bottom-left') posClass = 'bottom-1 left-1';
                if (pos === 'bottom-right') posClass = 'bottom-1 right-1';
                if (pos === 'middle-left') posClass = 'top-1/2 left-1 -translate-y-1/2';
                if (pos === 'middle-right') posClass = 'top-1/2 right-1 -translate-y-1/2';

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
            case GamePhase.TRADING: return 'ĐANG GIAO DỊCH...';
            default: return 'ĐANG CHỜ...';
        }
    }
    const isDisabled = (gamePhase !== GamePhase.ROLLING && gamePhase !== GamePhase.END_TURN) || isDiceRolling;
    const handleClick = gamePhase === GamePhase.ROLLING ? onRollDice : onEndTurn;
    const buttonId = gamePhase === GamePhase.ROLLING ? 'roll-dice-button' : (gamePhase === GamePhase.END_TURN ? 'end-turn-button' : undefined);


    return (
        <div className="pixel-panel p-3 text-center">
            <h3 className="font-pixel text-sm mb-2">Lượt của: <span style={{ color: currentPlayer.color }}>{currentPlayer.name}</span></h3>
            <div className="flex justify-center gap-4 my-3">
                <Dice value={dice[0]} isRolling={isDiceRolling} />
                <Dice value={dice[1]} isRolling={isDiceRolling} />
            </div>
            <button
                id={buttonId}
                onClick={handleClick}
                disabled={isDisabled}
                className="w-full pixel-button-color bg-cyan-500 text-white disabled:bg-gray-500 font-pixel py-3 px-4 text-lg"
            >
                {getButtonText()}
            </button>
        </div>
    )
}

const JackpotDisplay: React.FC<{ amount: number }> = ({ amount }) => (
    <div className="p-3 pixel-panel text-center bg-gray-900 text-white border-yellow-400">
        <h3 className="text-sm font-pixel mb-2 text-yellow-400 animate-pulse">
            CASINO JACKPOT
        </h3>
        <p className="font-pixel text-4xl text-green-400" style={{ textShadow: '2px 2px 0px #000' }}>
            ${amount}
        </p>
    </div>
);

// --- Main Right Panel Component ---
interface RightPanelProps {
    round: number;
    crisisLevel: number;
    jackpot: number;
    log: string[];
    tradeLog: string[];
    dice: [number, number];
    isDiceRolling: boolean;
    onRollDice: () => void;
    onEndTurn: () => void;
    gamePhase: GamePhase;
    currentPlayer: Player;
    onShowRules: () => void;
    viewMode: 'board' | 'status';
    onToggleView: () => void;
}

const RightPanel: React.FC<RightPanelProps> = (props) => {
    return (
        <aside className="h-full pixel-panel p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-pixel text-xl text-center">
                    Vòng {props.round}/10
                </h2>
                <div className="flex items-center gap-2">
                    <button onClick={props.onToggleView} className="h-10 px-3 pixel-button-color bg-indigo-500 flex items-center justify-center font-pixel text-xs text-white">
                        {props.viewMode === 'board' ? 'STATUS' : 'BOARD'}
                    </button>
                    <button onClick={props.onShowRules} className="w-10 h-10 pixel-button-color bg-yellow-400 flex items-center justify-center font-pixel text-xl text-black">?</button>
                </div>
            </div>

            <Controls
                onRollDice={props.onRollDice}
                onEndTurn={props.onEndTurn}
                gamePhase={props.gamePhase}
                currentPlayer={props.currentPlayer}
                dice={props.dice}
                isDiceRolling={props.isDiceRolling}
            />
            <div id="crisis-jackpot-panel" className="flex flex-col gap-4">
                <JackpotDisplay amount={props.jackpot} />
                <CrisisBar crisisLevel={props.crisisLevel} maxLevel={10} />
            </div>

            <div className="flex-grow flex flex-col min-h-0 relative"> {/* Thêm relative */}
                <div className="absolute inset-0 overflow-hidden"> {/* Thêm absolute container */}
                    <GameLog log={props.log} tradeLog={props.tradeLog} />
                </div>
            </div>

        </aside>
    );
};

export default RightPanel;