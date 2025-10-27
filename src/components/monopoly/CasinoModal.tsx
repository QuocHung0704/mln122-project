import React, { useEffect, useState } from 'react';
import { Square, Player } from '../../types/type';

interface CasinoModalProps {
    square: Square;
    player: Player;
    jackpot: number;
    onClose: (result: { betCost: number; winnings: number; jackpotWon: boolean } | null) => void;
}

type BetType = 'safe' | 'standard' | 'risky';
type BetChoice = 'even' | 'odd' | '1-2' | '3-4' | '5-6' | 1 | 2 | 3 | 4 | 5 | 6;

const BET_CONFIG = {
    safe: { cost: 5, payout: 10, choices: ['even', 'odd'] as BetChoice[], name: "Cược An Toàn" },
    standard: { cost: 10, payout: 30, choices: ['1-2', '3-4', '5-6'] as BetChoice[], name: "Cược Tiêu Chuẩn" },
    risky: { cost: 15, payout: 90, choices: [1, 2, 3, 4, 5, 6] as BetChoice[], name: "Cược Mạo Hiểm" },
};

const CasinoModal: React.FC<CasinoModalProps> = ({ square, player, jackpot, onClose }) => {
    const [view, setView] = useState<'selection' | 'result'>('selection');
    const [selectedBetType, setSelectedBetType] = useState<BetType | null>(null);
    const [selectedBetChoice, setSelectedBetChoice] = useState<BetChoice | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    
    // Result state
    const [diceValue, setDiceValue] = useState<number>(0);
    const [winnings, setWinnings] = useState(0);
    const [jackpotWon, setJackpotWon] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        const minBet = BET_CONFIG.safe.cost;
        if (player.chips < minBet) {
            onClose(null);
        }
    }, [player.chips, onClose]);

    const canAfford = (type: BetType) => player.chips >= BET_CONFIG[type].cost;

    const handleSelectBetType = (type: BetType) => {
        if (!canAfford(type)) return;
        setSelectedBetType(type);
        setSelectedBetChoice(null); // Reset choice when type changes
    };
    
    const handleRoll = () => {
        if (!selectedBetType || selectedBetChoice === null) return;
        setIsRolling(true);

        const config = BET_CONFIG[selectedBetType];
        const roll = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            let isWin = false;
            switch (selectedBetType) {
                case 'safe':
                    isWin = (selectedBetChoice === 'even' && roll % 2 === 0) || (selectedBetChoice === 'odd' && roll % 2 !== 0);
                    break;
                case 'standard':
                    const range = (selectedBetChoice as string).split('-').map(Number);
                    isWin = roll >= range[0] && roll <= range[1];
                    break;
                case 'risky':
                    isWin = roll === selectedBetChoice;
                    break;
            }

            const currentWinnings = isWin ? config.payout : 0;
            const isJackpotWin = isWin && selectedBetType === 'risky';

            setDiceValue(roll);
            setWinnings(currentWinnings);
            setJackpotWon(isJackpotWin);
            
            if (isJackpotWin) {
                setResultMessage(`TRÚNG SỐ ĐỘC ĐẮC! +${currentWinnings - config.cost} & JACKPOT!`);
            } else if (isWin) {
                setResultMessage(`Thắng! +${currentWinnings - config.cost} chip`);
            } else {
                setResultMessage(`Thua! -${config.cost} chip`);
            }

            setIsRolling(false);
            setView('result');
        }, 1000);
    };

    const handleClose = () => {
        if (!selectedBetType) {
            onClose(null); // Should not happen with the new UI flow, but for safety
            return;
        };
        const config = BET_CONFIG[selectedBetType];
        onClose({
            betCost: config.cost,
            winnings: winnings,
            jackpotWon: jackpotWon,
        });
    };
    
    const renderSelectionView = () => (
         <>
            <p className="font-pixel text-xs text-gray-800 mb-4">CHỌN MỘT MỨC CƯỢC</p>
            <div className="grid grid-cols-1 gap-3 mb-4">
                {(Object.keys(BET_CONFIG) as BetType[]).map(type => {
                    const config = BET_CONFIG[type];
                    const affordable = canAfford(type);
                    return (
                        <div key={type} className={`p-3 pixel-button text-left transition-all ${selectedBetType === type ? 'bg-cyan-200' : 'bg-gray-200'} ${!affordable ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSelectBetType(type)}>
                             <h4 className="font-bold font-pixel">{config.name} (Cược {config.cost})</h4>
                             <p className="text-xs">Thắng nhận {config.payout}. {type === 'risky' && `Cơ hội trúng JACKPOT $${jackpot}!`}</p>
                        </div>
                    );
                })}
            </div>
            
            {selectedBetType && (
                <div className="my-4">
                    <p className="font-pixel text-xs text-gray-800 mb-2">ĐẶT CƯỢC VÀO</p>
                    <div className="grid grid-cols-3 gap-2">
                         {BET_CONFIG[selectedBetType].choices.map(choice => (
                             <button key={String(choice)} onClick={() => setSelectedBetChoice(choice)} className={`p-2 font-pixel text-sm pixel-button ${selectedBetChoice === choice ? 'bg-yellow-300' : 'bg-gray-300'}`}>
                                 {String(choice).toUpperCase()}
                             </button>
                         ))}
                    </div>
                </div>
            )}

            <button onClick={handleRoll} disabled={!selectedBetChoice || isRolling} className="w-full pixel-button-color bg-red-500 text-white font-pixel py-3 disabled:bg-gray-500 mt-2">
                {isRolling ? '...' : 'QUAY!'}
            </button>
        </>
    );

    const renderResultView = () => {
         const config = BET_CONFIG[selectedBetType!];
         const netChange = winnings - config.cost;
         const finalMessageColor = jackpotWon ? 'text-yellow-500' : netChange > 0 ? 'text-green-600' : 'text-red-600';

        return (
            <>
                <p className="font-pixel text-gray-600">Kết quả:</p>
                <p className="font-pixel text-7xl font-bold my-2">{diceValue}</p>
                <p className={`text-lg font-pixel my-4 ${finalMessageColor}`}>
                    {resultMessage}
                </p>
                {jackpotWon && <p className="text-xl font-pixel text-green-500 animate-bounce">+ ${jackpot} TỪ JACKPOT!</p>}
                <button onClick={handleClose} className="w-full pixel-button-color bg-green-500 text-white font-pixel py-3 mt-4">
                    TIẾP TỤC
                </button>
            </>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 text-center w-full max-w-md mx-4">
                <h2 className="text-2xl font-pixel text-red-600 mb-2">{square.name}</h2>
                <p className="text-sm text-gray-700 mb-4">{square.description}</p>
                
                <div className="pixel-panel-inset p-4 min-h-[300px]">
                    {view === 'selection' ? renderSelectionView() : renderResultView()}
                </div>
            </div>
        </div>
    );
};

export default CasinoModal;
