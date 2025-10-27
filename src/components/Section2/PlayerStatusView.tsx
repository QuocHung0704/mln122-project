import React from 'react';
import { Player } from '../../type';
import { BOARD_SQUARES } from '../../utils/constant';

const StatusItem: React.FC<{ icon: string; label: string; value: string | number; color?: string }> = ({ icon, label, value, color }) => (
    <div className="flex items-center gap-3 text-sm">
        <span className="text-xl w-6 text-center">{icon}</span>
        <span className="w-24 font-bold">{label}:</span>
        <span className={`font-pixel text-lg ${color || ''}`}>{value}</span>
    </div>
);

const PlayerStatusCard: React.FC<{ player: Player }> = ({ player }) => {
    const currentSquare = BOARD_SQUARES[player.position];

    return (
        <div className="pixel-panel p-4">
            <div className="flex items-center gap-4 mb-4 border-b-4 border-black pb-3">
                <div className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center text-3xl" style={{ backgroundColor: player.color }}>
                    <span>{player.icon}</span>
                </div>
                <div>
                    <h3 className="font-pixel text-2xl" style={{ color: player.color, textShadow: '2px 2px 0 #000' }}>{player.name}</h3>
                </div>
            </div>
            <div className="space-y-2 pixel-panel-inset p-3">
                <StatusItem icon="💰" label="Chips" value={`$${player.chips}`} color="text-green-600" />
                <StatusItem icon="📍" label="Vị trí" value={currentSquare.name} />
                <StatusItem icon="🏭" label="Nguyên liệu" value={player.hasRawMaterials ? "Có" : "Không"} />
                <StatusItem icon="👷" label="Lao động" value={player.hasLabor ? "Có" : "Không"} />
                <StatusItem icon="📦" label="Hàng hóa" value={player.goodsCount} />
                <StatusItem icon="🔥" label="Combo" value={`${player.combo.type !== 'none' ? player.combo.type.toUpperCase() : '---'} (x${player.combo.count})`} />
                {player.missNextTurn && <StatusItem icon="⏳" label="Trạng thái" value="Mất lượt" color="text-red-500" />}
            </div>
        </div>
    );
}

interface PlayerStatusViewProps {
    players: Player[];
}

const PlayerStatusView: React.FC<PlayerStatusViewProps> = ({ players }) => {
    return (
        <div className="w-full h-full p-4 pixel-panel flex flex-col items-center">
            <h1 className="text-4xl font-pixel text-black mb-6">PLAYER STATUS</h1>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                {players.map(player => (
                    <PlayerStatusCard key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default PlayerStatusView;