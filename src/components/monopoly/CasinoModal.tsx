import React, { useState, useEffect } from 'react';
import { Square, Player, CasinoBetResult } from '../../types/type';

// Dice sub-component remains the same
const Dice: React.FC<{ value: number }> = ({ value }) => {
    const positions: { [key: number]: string[] } = {
        1: ['center'],
        2: ['top-left', 'bottom-right'],
        3: ['top-left', 'center', 'bottom-right'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };
    const pipPositions = positions[value] || [];

    return (
        <div className="w-20 h-20 bg-white rounded-lg border-4 border-black p-1 relative shadow-lg">
            {pipPositions.map(pos => {
                let posClass = '';
                if(pos === 'center') posClass = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
                if(pos === 'top-left') posClass = 'top-2 left-2';
                if(pos === 'top-right') posClass = 'top-2 right-2';
                if(pos === 'bottom-left') posClass = 'bottom-2 left-2';
                if(pos === 'bottom-right') posClass = 'bottom-2 right-2';
                if(pos === 'middle-left') posClass = 'top-1/2 left-2 -translate-y-1/2';
                if(pos === 'middle-right') posClass = 'top-1/2 right-2 -translate-y-1/2';
                return <div key={pos} className={`absolute w-3 h-3 bg-black rounded-full ${posClass}`}></div>
            })}
        </div>
    );
};

// Define new types for betting
type BetTier = 5 | 10 | 15;
type BetType = 'odd' | 'even' | 'small' | 'big' | 1 | 2 | 3 | 4 | 5 | 6;

// Fix: Define CasinoModalProps interface
interface CasinoModalProps {
    square: Square;
    player: Player;
    onClose: (result: CasinoBetResult | null) => void;
}

const CasinoModal: React.FC<CasinoModalProps> = ({ square, player, onClose }) => {
    const [view, setView] = useState<'selection' | 'betting' | 'rolling' | 'result'>('selection');
    const [betTier, setBetTier] = useState<BetTier | null>(null);
    const [animatedDice, setAnimatedDice] = useState<[number, number]>([1, 1]);
    const [dice, setDice] = useState<[number, number]>([1, 1]);
    const [betResult, setBetResult] = useState<CasinoBetResult | null>(null);
    const [resultMessage, setResultMessage] = useState<React.ReactNode>('');
    
    const multipliers = square.multipliers || { win: 2, bigWin: 3 };

    const handlePlaceBet = (placedBetType: BetType) => {
        if (!betTier || player.chips < betTier) return;

        setView('rolling');

        const rollInterval = setInterval(() => {
            setAnimatedDice([
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
            ]);
        }, 80);

        setTimeout(() => {
            clearInterval(rollInterval);
            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            setDice([d1, d2]);

            const total = d1 + d2;

            let winnings = 0;
            let msg: React.ReactNode = '';

            switch (placedBetType) {
                case 'odd':
                    if (total % 2 !== 0) winnings = betTier * multipliers.win;
                    break;
                case 'even':
                    if (total % 2 === 0) winnings = betTier * multipliers.win;
                    break;
                case 'small':
                    if (total >= 2 && total <= 6) winnings = betTier * multipliers.win;
                    else if (total === 7) msg = "Tổng là 7! Cược Xỉu thua!";
                    break;
                case 'big':
                    if (total >= 8 && total <= 12) winnings = betTier * multipliers.win;
                    else if (total === 7) msg = "Tổng là 7! Cược Tài thua!";
                    break;
                default: // Betting on a specific number (1-6)
                    const hits = (d1 === placedBetType ? 1 : 0) + (d2 === placedBetType ? 1 : 0);
                    if (hits === 1) winnings = betTier * multipliers.win;
                    if (hits === 2) winnings = betTier * multipliers.bigWin;
                    break;
            }
            if (winnings > 0) {
                msg = `Thắng! +${winnings - betTier} chip`;
            } else if (msg === '') {
                msg = `Thua! -${betTier} chip`;
            }


            setResultMessage(msg);
            const result: CasinoBetResult = { betCost: betTier, winnings };
            setBetResult(result);
            setView('result');
        }, 1500);
    };

    const handleClose = () => {
        onClose(betResult);
    };

    const handleSkip = () => {
        onClose(null);
    }
    
    const renderSelectionView = () => (
         <>
            <p className="font-pixel text-lg">Chào mừng tới Casino!</p>
            <p className="text-sm my-4">Chọn mức cược để thử vận may của bạn.</p>
            <div className="space-y-3 my-6">
                {([5, 10, 15] as BetTier[]).map(tier => {
                    const canAfford = player.chips >= tier;
                    return (
                        <button key={tier} onClick={() => { setBetTier(tier); setView('betting'); }} disabled={!canAfford} className="w-full pixel-button-color bg-red-500 text-white font-pixel py-3 disabled:bg-gray-500">
                            Cược {tier} Chip
                        </button>
                    )
                })}
            </div>
             <button onClick={handleSkip} disabled={view !== 'selection'} className="w-full pixel-button mt-3 font-pixel py-2 text-sm">
                Bỏ qua
            </button>
        </>
    );
    
    const renderBettingView = () => {
        let options: { type: BetType, label: string }[] = [];
        switch (betTier) {
            case 5:
                options = [{ type: 'odd', label: 'Tổng Lẻ' }, { type: 'even', label: 'Tổng Chẵn' }];
                break;
            case 10:
                options = [
                    { type: 'odd', label: 'Tổng Lẻ' }, { type: 'even', label: 'Tổng Chẵn' },
                    { type: 'small', label: 'Xỉu (Tổng 2-6)' }, { type: 'big', label: 'Tài (Tổng 8-12)' }
                ];
                break;
            case 15:
                options = [1, 2, 3, 4, 5, 6].map(n => ({ type: n as BetType, label: `Mặt ${n}` }));
                break;
             default: return null;
        }

        return (
            <>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setView('selection')} className="pixel-button text-xs py-1 px-2">‹ Quay lại</button>
                    <h3 className="font-pixel text-lg">Cược {betTier} Chip</h3>
                    <div className="w-14"></div>
                </div>
                <div className={`grid ${betTier === 15 ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                    {options.map(opt => (
                        <button key={opt.label} onClick={() => handlePlaceBet(opt.type)} className="w-full pixel-button-color bg-red-400 text-white font-pixel py-3 text-sm">
                            {opt.label}
                        </button>
                    ))}
                </div>
            </>
        );
    };

     const renderRollingView = () => (
        <>
            <p className="text-xl font-pixel my-4 animate-pulse">Đang tung xúc xắc...</p>
            <div className="flex justify-center gap-4">
                <Dice value={animatedDice[0]} />
                <Dice value={animatedDice[1]} />
            </div>
        </>
    );

    const renderResultView = () => {
        const netChange = betResult ? betResult.winnings - betResult.betCost : 0;
        const finalMessageColor = netChange > 0 ? 'text-green-600' : 'text-red-600';

        return (
            <>
                <div className="flex justify-center gap-4">
                    <Dice value={dice[0]} />
                    <Dice value={dice[1]} />
                </div>
                <div className={`text-xl font-pixel my-4 min-h-[70px] flex items-center justify-center ${finalMessageColor}`}>
                    {resultMessage}
                </div>
                <button onClick={handleClose} className="w-full pixel-button-color bg-green-500 text-white font-pixel py-3 mt-4">
                    TIẾP TỤC
                </button>
            </>
        );
    }
    
    const renderContent = () => {
        switch(view) {
            case 'betting': return renderBettingView();
            case 'rolling': return renderRollingView();
            case 'result': return renderResultView();
            case 'selection':
            default:
                return renderSelectionView();
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 text-center w-full max-w-md mx-4 animate-scale-in">
                <h2 className="text-2xl font-pixel text-red-600 mb-2">{square.name} {square.icon}</h2>
                <div className="pixel-panel-inset p-4 min-h-[280px] flex flex-col justify-center">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CasinoModal;