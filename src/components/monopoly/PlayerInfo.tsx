import React, { useState, useEffect, useRef } from 'react';
import { Player, GamePhase } from '../../types/type';
import PawnIcon from './PawnIcon';

function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const ChipChangeIndicator: React.FC<{ change: number }> = ({ change }) => {
    if (change === 0) return null;
    const isGain = change > 0;
    const text = isGain ? `+${change}` : `${change}`;
    const colorClass = isGain ? 'text-green-500' : 'text-red-500';

    return (
        <div className={`absolute -top-4 right-0 font-pixel font-bold text-lg animate-fade-up-out ${colorClass}`} style={{ textShadow: '1px 1px 0px #000' }}>
            {text}
        </div>
    );
};

const ResourceIndicator: React.FC<{ label: string; count: number; icon: string }> = ({ label, count, icon }) => (
    <div className={`flex items-center gap-2 p-1 ${count > 0 ? '' : 'opacity-40'}`}>
        <span className="text-xl">{icon}</span>
        <div className="text-xs">
            <div className="font-bold">{label}</div>
            <div className="font-pixel text-lg">{count}</div>
        </div>
    </div>
);

interface PlayerCardProps {
    player: Player;
    isCurrent: boolean;
    isInteractive: boolean;
    onInitiateTrade: (playerId: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isCurrent, isInteractive, onInitiateTrade }) => {
    const [chipChange, setChipChange] = useState<number | null>(null);
    const prevChips = usePrevious(player.chips);

    useEffect(() => {
        if (prevChips !== undefined && player.chips !== prevChips) {
            const change = player.chips - prevChips;
            setChipChange(change);
            const timer = setTimeout(() => setChipChange(null), 1500); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [player.chips, prevChips]);

    return (
    <div className={`pixel-panel p-3 transition-shadow duration-300 ${isCurrent ? 'current-player-highlight' : ''}`}>
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-2xl">
                    <PawnIcon color={player.color} icon={player.icon} className="w-full h-full" />
                </div>
                <div>
                    <h3 className="font-bold text-base">{player.name}</h3>
                    <div className="relative">
                        <p className="font-pixel font-bold text-lg" style={{ color: player.color }}>${player.chips}</p>
                         {chipChange !== null && <ChipChangeIndicator change={chipChange} />}
                    </div>
                </div>
            </div>
             {isInteractive && !isCurrent && (
                <button onClick={() => onInitiateTrade(player.id)} className="pixel-button text-xs p-1">Giao dịch</button>
            )}
        </div>
        <div className="grid grid-cols-3 gap-1 pixel-panel-inset p-1" id={isCurrent ? 'player-resources-panel' : undefined}>
            <ResourceIndicator label="Nguyên liệu" count={player.hasRawMaterials ? 1 : 0} icon="🏭" />
            <ResourceIndicator label="Lao động" count={player.hasLabor ? 1 : 0} icon="👷" />
            <ResourceIndicator label="Hàng hóa" count={player.goodsCount} icon="📦" />
        </div>
    </div>
)};

interface PlayerInfoProps {
    players: Player[];
    currentPlayerIndex: number;
    gamePhase: GamePhase;
    onInitiateTrade: (playerId: number) => void;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players, currentPlayerIndex, gamePhase, onInitiateTrade }) => {
    const canTrade = gamePhase === GamePhase.ROLLING;
    return (
        <aside id="player-info-panel" className="h-full pixel-panel p-4 flex flex-col gap-4 overflow-y-auto">
            <h2 className="font-pixel text-2xl text-center">PLAYERS</h2>
             {players.map((player, index) => (
                <PlayerCard 
                    key={player.id}
                    player={player}
                    isCurrent={index === currentPlayerIndex}
                    isInteractive={canTrade}
                    onInitiateTrade={onInitiateTrade}
                />
            ))}
        </aside>
    );
};

export default PlayerInfo;
