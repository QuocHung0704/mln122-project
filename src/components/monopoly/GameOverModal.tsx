import React from 'react';
import { Player } from '../../types/type';
import PawnIcon from './PawnIcon';

interface GameOverModalProps {
    players: Player[];
    onPlayAgain: () => void;
}

const StatItem: React.FC<{ icon: string; value: string | number; label: string; className?: string }> = ({ icon, value, label, className = '' }) => (
    <div className={`flex flex-col items-center justify-center p-1 text-center ${className}`}>
        <div className="text-xl">{icon}</div>
        <div className="font-pixel text-lg font-bold">{value}</div>
        <div className="text-xs text-gray-600 font-semibold">{label}</div>
    </div>
);


const GameOverModal: React.FC<GameOverModalProps> = ({ players, onPlayAgain }) => {
    const sortedPlayers = [...players].sort((a, b) => b.chips - a.chips);
    const winner = sortedPlayers[0];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 text-center w-full max-w-2xl mx-4 flex flex-col animate-scale-in">
                <h2 className="text-3xl font-pixel text-black mb-2">WINNER'S DASHBOARD</h2>
                
                <div className="pixel-panel-inset p-4 my-4 border-4 border-yellow-400" style={{ background: 'radial-gradient(circle, rgba(253,244,204,1) 0%, rgba(251,211,141,1) 100%)'}}>
                    <p className="font-pixel text-lg text-yellow-700">ĐỘI CHIẾN THẮNG</p>
                    <div className="flex items-center justify-center gap-4 my-2">
                        <div className="w-20 h-20 text-6xl">
                           <PawnIcon color={winner.color} icon={winner.icon} className="w-full h-full" style={{ filter: 'drop-shadow(3px 3px 0px #1f2937)' }} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-pixel" style={{ color: winner.color, textShadow: '2px 2px 0 #000' }}>{winner.name}</h3>
                            <p className="font-pixel text-2xl">${winner.chips}</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-pixel mb-3 text-black">BẢNG XẾP HẠNG CUỐI CÙNG</h3>
                <div className="space-y-3 mt-2 overflow-y-auto max-h-[40vh] pr-2">
                    {sortedPlayers.map((player, index) => (
                        <div key={player.id} className="pixel-panel p-2">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-md flex items-center gap-3">
                                    <span className="font-pixel text-gray-500 w-6 text-xl">#{index + 1}</span> 
                                    <div className="w-5 h-5 text-sm">
                                        <PawnIcon color={player.color} icon={player.icon} className="w-full h-full" />
                                    </div>
                                    <span className="text-black">{player.name}</span>
                                </span>
                                <span className="font-pixel text-lg text-black">${player.chips}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mt-2 pixel-panel-inset bg-gray-200 p-1">
                                <StatItem icon="💹" value={player.stats.goodsSold} label="Đã bán" />
                                <StatItem 
                                    icon="🎲" 
                                    value={player.stats.casinoNet > 0 ? `+${player.stats.casinoNet}` : player.stats.casinoNet} 
                                    label="Casino" 
                                    className={player.stats.casinoNet > 0 ? 'text-green-600' : (player.stats.casinoNet < 0 ? 'text-red-600' : '')} 
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onPlayAgain}
                    className="w-full pixel-button-color bg-green-500 text-white font-pixel py-3 px-4 text-lg mt-6"
                >
                    Chơi Lại
                </button>
            </div>
        </div>
    );
};

export default GameOverModal;
