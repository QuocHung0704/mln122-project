import React from 'react';
import { Player } from '../../types/type';
import PawnIcon from './PawnIcon';

// New StatBar component for visual stats
const StatBar: React.FC<{ label: string; value: number; maxValue: number; color: string; }> = ({ label, value, maxValue, color }) => {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold">{label}</span>
                <span className="font-pixel">{value}</span>
            </div>
            <div className="w-full bg-gray-300 border-2 border-black h-4 pixel-panel-inset overflow-hidden">
                <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
};

// New CasinoStat component for simple key-value pairs
const CasinoStat: React.FC<{ label: string; value: React.ReactNode; }> = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-300">
        <span className="font-bold">{label}:</span>
        <span className="font-pixel text-base">{value}</span>
    </div>
);

const PlayerStatusCard: React.FC<{
    player: Player;
    maxStats: { goodsSold: number; goodsProduced: number; combosHit: number; };
}> = ({ player, maxStats }) => {
    const { stats } = player;
    const totalCasinoPlays = stats.casinoWins + stats.casinoLosses;
    const winRate = totalCasinoPlays > 0 ? ((stats.casinoWins / totalCasinoPlays) * 100).toFixed(0) : '0';
    const averageBet = totalCasinoPlays > 0 ? (stats.casinoTotalWagered / totalCasinoPlays).toFixed(0) : '0';

    return (
        <div className="pixel-panel p-4 flex flex-col gap-3">
            {/* Player Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 text-3xl flex-shrink-0">
                     <PawnIcon color={player.color} icon={player.icon} />
                </div>
                <div>
                    <h3 className="font-pixel text-2xl" style={{ color: player.color, textShadow: '2px 2px 0 #000' }}>{player.name}</h3>
                    <p className="font-pixel text-xl text-green-600">${player.chips}</p>
                </div>
            </div>

            {/* General Stats */}
            <div className="pixel-panel-inset p-3 space-y-3">
                 <h4 className="font-pixel text-sm text-center text-gray-700 uppercase tracking-wider mb-2">Thống Kê Chung</h4>
                <StatBar label="Hàng Hóa Đã Bán" value={stats.goodsSold} maxValue={maxStats.goodsSold} color="#84cc16" />
                <StatBar label="Hàng Hóa Sản Xuất" value={stats.goodsProduced} maxValue={maxStats.goodsProduced} color="#22d3ee" />
                <StatBar label="Combo Thành Công" value={stats.combosHit} maxValue={maxStats.combosHit} color="#f97316" />
            </div>

            {/* Casino Stats */}
            <div className="pixel-panel-inset p-3">
                <h4 className="font-pixel text-sm text-center text-gray-700 uppercase tracking-wider mb-2">Thống Kê Casino</h4>
                <div className="space-y-2">
                    <CasinoStat
                        label="Lãi/Lỗ Ròng"
                        value={
                            <span className={stats.casinoNet > 0 ? 'text-green-600' : stats.casinoNet < 0 ? 'text-red-600' : ''}>
                                {stats.casinoNet > 0 ? '+' : ''}{stats.casinoNet}
                            </span>
                        }
                    />
                     <CasinoStat label="Jackpot Trúng" value={<>🎉 {stats.jackpotsWon}</>} />
                     <CasinoStat label="Cược Trung Bình" value={`$${averageBet}`} />

                    <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                            <span className="font-bold">Tỉ Lệ Thắng</span>
                            <span className="font-pixel">{totalCasinoPlays > 0 ? `${winRate}%` : 'N/A'}</span>
                        </div>
                        <div className="w-full flex bg-red-500 border-2 border-black h-4 pixel-panel-inset overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500 ease-out"
                                style={{ width: `${winRate}%`}}
                            />
                        </div>
                         <div className="flex justify-between text-xs mt-1 text-gray-600">
                            <span>Thắng: {stats.casinoWins}</span>
                            <span>Thua: {stats.casinoLosses}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlayerStatusView: React.FC<{ players: Player[] }> = ({ players }) => {
    // Calculate max values for bar chart scaling
    const maxStats = {
        goodsSold: Math.max(1, ...players.map(p => p.stats.goodsSold)),
        goodsProduced: Math.max(1, ...players.map(p => p.stats.goodsProduced)),
        combosHit: Math.max(1, ...players.map(p => p.stats.combosHit)),
    };

    return (
        <div className="w-full h-full p-4 pixel-panel flex flex-col items-center">
            <h1 className="text-4xl font-pixel text-black mb-6">PLAYER DASHBOARD</h1>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-auto p-2">
                {players.map(player => (
                    <PlayerStatusCard key={player.id} player={player} maxStats={maxStats} />
                ))}
            </div>
        </div>
    );
};

export default PlayerStatusView;