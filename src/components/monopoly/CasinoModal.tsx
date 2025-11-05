import React, { useState, useEffect } from 'react';
import { Square, Player, CasinoBetResult } from '../../types/type';

interface CasinoModalProps {
    square: Square;
    player: Player;
    jackpot: number;
    onClose: (result: CasinoBetResult | null) => void;
}

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


const CasinoModal: React.FC<CasinoModalProps> = ({ square, player, jackpot, onClose }) => {
    const [view, setView] = useState<'selection' | 'rolling' | 'result'>('selection');
    const [animatedDice, setAnimatedDice] = useState<[number, number]>([1, 1]);
    const [dice, setDice] = useState<[number, number]>([1, 1]);
    const [betResult, setBetResult] = useState<CasinoBetResult | null>(null);
    const [resultMessage, setResultMessage] = useState<React.ReactNode>('');
    const [animatedJackpot, setAnimatedJackpot] = useState(0);
    const [isJackpotAnimationComplete, setIsJackpotAnimationComplete] = useState(false);
    
    const betOptions = square.betOptions || [5, 10, 15, 20];
    const multipliers = square.multipliers || { win: 2, bigWin: 3, jackpot: 5 };
    const jackpotRoll = square.multipliers?.jackpotRoll || [6, 6];

    useEffect(() => {
        setIsJackpotAnimationComplete(false);
        const animationDuration = 700;
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(animationDuration / frameDuration);
        let frame = 0;

        const easeOutQuad = (t: number) => t * (2 - t);

        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentValue = Math.round(jackpot * progress);
            setAnimatedJackpot(currentValue);

            if (frame === totalFrames) {
                clearInterval(counter);
                setAnimatedJackpot(jackpot); // Ensure it ends on the exact value
                setIsJackpotAnimationComplete(true);
            }
        }, frameDuration);

        return () => clearInterval(counter);
    }, [jackpot]);


    const handleBet = (betCost: number) => {
        if (player.chips < betCost) return;
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
            const jackpotWon = (d1 === jackpotRoll[0] && d2 === jackpotRoll[1]) || (d1 === jackpotRoll[1] && d2 === jackpotRoll[0]);

            let winnings = 0;
            if (jackpotWon) {
                winnings = betCost * multipliers.jackpot; 
                setResultMessage(
                     <div className="animate-text-glow">
                        <p className="text-3xl">🎉 JACKPOT! 🎉</p>
                        <p className="text-lg mt-2">Thắng {winnings} chip & hũ {jackpot} chip!</p>
                    </div>
                );
            } else if (total >= 10) {
                winnings = betCost * multipliers.bigWin;
                setResultMessage(`THẮNG LỚN! +${winnings - betCost} chip`);
            } else if (total >= 7) {
                winnings = betCost * multipliers.win;
                setResultMessage(`Thắng! +${winnings - betCost} chip`);
            } else {
                winnings = 0;
                setResultMessage(`Thua! -${betCost} chip`);
            }

            const result: CasinoBetResult = { betCost, winnings, jackpotWon };
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
            <p className="font-pixel text-lg">Hũ Jackpot Hiện tại: 
                <span 
                    className={`inline-block text-yellow-500 text-2xl ${isJackpotAnimationComplete ? 'animate-jackpot-glow' : ''}`}
                    style={{textShadow: '2px 2px 0 #000'}}
                >
                    ${animatedJackpot}
                </span>
            </p>
            <p className="text-sm my-4">Chọn mức cược và tung xúc xắc. Tung được {jackpotRoll[0]} và {jackpotRoll[1]} để trúng Jackpot!</p>
            <div className="grid grid-cols-2 gap-4 my-6">
                {betOptions.map(bet => {
                    const canAfford = player.chips >= bet;
                    return (
                        <button key={bet} onClick={() => handleBet(bet)} disabled={!canAfford || view !== 'selection'} className="w-full pixel-button-color bg-red-500 text-white font-pixel py-3 disabled:bg-gray-500">
                            Cược {bet}
                        </button>
                    )
                })}
            </div>
             <button onClick={handleSkip} disabled={view !== 'selection'} className="w-full pixel-button mt-3 font-pixel py-2 text-sm">
                Bỏ qua
            </button>
        </>
    );
    
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
        const finalMessageColor = netChange > 0 ? 'text-green-600' : (betResult?.jackpotWon ? 'text-yellow-500' : 'text-red-600');

        return (
            <>
                <div className="flex justify-center gap-4">
                    <Dice value={dice[0]} />
                    <Dice value={dice[1]} />
                </div>
                <div className={`text-xl font-pixel my-4 ${finalMessageColor}`}>
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
                <div className="pixel-panel-inset p-4 min-h-[250px] flex flex-col justify-center">
                   {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CasinoModal;