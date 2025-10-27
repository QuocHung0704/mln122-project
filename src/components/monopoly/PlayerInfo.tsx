import React, { useState, useEffect, useRef } from 'react';
import { Player, GamePhase } from '../../types/type';
import PawnIcon from './PawnIcon';

function usePrevious<T>(value: T): T | undefined {
    // Fix: Provide an initial value to useRef to satisfy TypeScript.
    const ref = useRef<T | undefined>(undefined);
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

const ResourceIndicator: React.FC<{ label: string; count?: number; has?: boolean; icon: string }> = ({ label, count, has, icon }) => (
    <div className={`flex items-center gap-2 p-1 ${(has || (count && count > 0)) ? '' : 'opacity-40'}`}>
        <span className="text-xl">{icon}</span>
        <div className="text-xs">
            <div className="font-bold">{label}</div>
            {typeof count !== 'undefined' && <div className="font-pixel">{count}</div>}
        </div>
    </div>
);

interface PlayerCardProps {
    player: Player;
    isCurrent: boolean;
    canTrade: boolean;
    onInitiateTrade: (id: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isCurrent, canTrade, onInitiateTrade }) => {
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
    <div className={`pixel-panel p-3 transition-shadow duration-300 ${isCurrent ? 'bg-yellow-200' : ''}`}>
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
             {canTrade && (
                <button onClick={() => onInitiateTrade(player.id)} title={`Giao dịch với ${player.name}`} className="w-10 h-10 pixel-button-color bg-cyan-400 flex items-center justify-center text-black">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </button>
            )}
        </div>
        <div className="grid grid-cols-3 gap-1 pixel-panel-inset p-1" id={isCurrent ? 'player-resources-panel' : undefined}>
            <ResourceIndicator label="Nguyên liệu" has={player.hasRawMaterials} icon="🏭" />
            <ResourceIndicator label="Lao động" has={player.hasLabor} icon="👷" />
            <ResourceIndicator label="Hàng hóa" count={player.goodsCount} icon="📦" />
        </div>
    </div>
)};

interface PlayerInfoProps {
    players: Player[];
    currentPlayerIndex: number;
    gamePhase: GamePhase;
    onInitiateTrade: (partnerId: number) => void;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players, currentPlayerIndex, gamePhase, onInitiateTrade }) => {
    const canTrade = gamePhase === GamePhase.ROLLING;
    const currentPlayerId = players[currentPlayerIndex].id;

    return (
        <aside id="player-info-panel" className="h-full pixel-panel p-4 flex flex-col gap-4 overflow-y-auto">
            <h2 className="font-pixel text-xl text-center">PLAYERS</h2>
             {players.map((player, index) => (
                <PlayerCard 
                    key={player.id}
                    player={player}
                    isCurrent={index === currentPlayerIndex}
                    canTrade={canTrade && player.id !== currentPlayerId}
                    onInitiateTrade={onInitiateTrade}
                />
            ))}
        </aside>
    );
};

export default PlayerInfo;