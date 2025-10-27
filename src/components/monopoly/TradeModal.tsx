import React, { useState, useMemo } from 'react';
import { Player, TradeOffer } from '../../types/type';
import PawnIcon from './PawnIcon';

interface TradeModalProps {
    proposer: Player;
    partner: Player;
    onPropose: (proposal: { offer: TradeOffer['offer'], request: TradeOffer['request'] }) => void;
    onAccept: () => void;
    onReject: () => void;
    onCancel: () => void;
    tradeOffer: TradeOffer | null;
}

const PlayerProfile: React.FC<{ player: Player }> = ({ player }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 text-4xl">
            <PawnIcon color={player.color} icon={player.icon} />
        </div>
        <h3 className="font-pixel text-lg" style={{ color: player.color }}>{player.name}</h3>
    </div>
);

const PlayerAssets: React.FC<{ player: Player }> = ({ player }) => (
    <div className="text-sm space-y-1 pixel-panel-inset p-2">
        <p className="font-bold">💰 Chips: {player.chips}</p>
        <p>🏭 Nguyên liệu: {player.hasRawMaterials ? 'Có' : 'Không'}</p>
        <p>👷 Sức LĐ: {player.hasLabor ? 'Có' : 'Không'}</p>
    </div>
);

const TradeInputs: React.FC<{
    player: Player;
    tradeValues: TradeOffer['offer'];
    onValuesChange: (newValues: TradeOffer['offer']) => void;
}> = ({ player, tradeValues, onValuesChange }) => {
    return (
        <div className="space-y-3 p-4 pixel-panel">
            <div className="flex items-center gap-2">
                <label htmlFor="chips" className="font-bold w-20">💰 Chips:</label>
                <input 
                    type="number" 
                    min="0" 
                    max={player.chips}
                    value={tradeValues.chips}
                    onChange={(e) => {
                        const value = Math.max(0, parseInt(e.target.value) || 0);
                        onValuesChange({ ...tradeValues, chips: Math.min(value, player.chips) });
                    }}
                    className="w-full pixel-panel-inset px-3 py-1 outline-none"
                />
            </div>
             <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
                <input 
                    type="checkbox" 
                    disabled={!player.hasRawMaterials}
                    checked={tradeValues.hasRawMaterials}
                    onChange={(e) => onValuesChange({ ...tradeValues, hasRawMaterials: e.target.checked })}
                    className="w-5 h-5"
                />
                <span className={player.hasRawMaterials ? '' : 'text-gray-400 line-through'}>🏭 Nguyên Liệu</span>
            </label>
             <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
                <input 
                    type="checkbox" 
                    disabled={!player.hasLabor}
                    checked={tradeValues.hasLabor}
                    onChange={(e) => onValuesChange({ ...tradeValues, hasLabor: e.target.checked })}
                    className="w-5 h-5"
                />
                <span className={player.hasLabor ? '' : 'text-gray-400 line-through'}>👷 Sức Lao Động</span>
            </label>
        </div>
    );
};

const TradeSummary: React.FC<{ title: string, items: TradeOffer['offer'] }> = ({ title, items }) => {
    const hasItems = items.chips > 0 || items.hasRawMaterials || items.hasLabor;
    return (
        <div className="flex-1 p-4 pixel-panel-inset">
            <h3 className="font-pixel text-lg mb-3 text-center">{title}</h3>
            <div className="space-y-2 text-left min-h-[120px] text-sm">
                {hasItems ? (
                    <>
                        {items.chips > 0 && <p className="font-bold text-yellow-600">💰 ${items.chips}</p>}
                        {items.hasRawMaterials && <p>🏭 Nguyên Liệu</p>}
                        {items.hasLabor && <p>👷 Sức Lao Động</p>}
                    </>
                ) : <p className="text-gray-500 italic text-center pt-8">Không có gì</p>}
            </div>
        </div>
    );
};

const TradeModal: React.FC<TradeModalProps> = ({ proposer, partner, onPropose, onAccept, onReject, onCancel, tradeOffer }) => {
    const [offer, setOffer] = useState<TradeOffer['offer']>({ chips: 0, hasRawMaterials: false, hasLabor: false });
    const [request, setRequest] = useState<TradeOffer['request']>({ chips: 0, hasRawMaterials: false, hasLabor: false });
    const [isOfferSent, setIsOfferSent] = useState(false);

    const validationError = useMemo(() => {
        if (offer.chips > proposer.chips) return `Bạn chỉ có ${proposer.chips} chip.`;
        if (request.chips > partner.chips) return `${partner.name} chỉ có ${partner.chips} chip.`;
        if (offer.chips < 0 || request.chips < 0) return "Chip không thể âm.";
        const isOfferEmpty = offer.chips === 0 && !offer.hasRawMaterials && !offer.hasLabor;
        const isRequestEmpty = request.chips === 0 && !request.hasRawMaterials && !request.hasLabor;
        if(isOfferEmpty && isRequestEmpty) return "Giao dịch không thể trống.";
        return null;
    }, [offer, request, proposer, partner]);

    const handleProposeClick = () => {
        if (validationError) return;
        onPropose({ offer, request });
        setIsOfferSent(true);
    };

    if (!tradeOffer) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 w-full max-w-4xl mx-4 flex flex-col text-center">
                 {!isOfferSent ? ( // PROPOSER'S VIEW
                    <>
                        <h2 className="text-2xl font-pixel text-teal-600 mb-4">TẠO GIAO DỊCH</h2>
                        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 mb-4">
                            <div className="flex flex-col gap-4">
                                <PlayerProfile player={proposer} />
                                <PlayerAssets player={proposer} />
                                <h3 className="font-pixel text-lg">BẠN ĐƯA</h3>
                                <TradeInputs player={proposer} tradeValues={offer} onValuesChange={setOffer} />
                            </div>
                            <div className="flex items-center h-full pt-48">
                                <span className="font-pixel text-5xl">⇄</span>
                            </div>
                             <div className="flex flex-col gap-4">
                                <PlayerProfile player={partner} />
                                <PlayerAssets player={partner} />
                                <h3 className="font-pixel text-lg">BẠN NHẬN</h3>
                                <TradeInputs player={partner} tradeValues={request} onValuesChange={setRequest} />
                            </div>
                        </div>
                        {validationError && <p className="text-red-500 mb-2 h-6 text-sm font-bold">{validationError}</p>}
                        <div className="flex gap-4 mt-2">
                             <button onClick={onCancel} className="flex-1 pixel-button font-pixel py-3 px-4 text-lg">HỦY</button>
                             <button onClick={handleProposeClick} disabled={!!validationError} className="flex-1 pixel-button-color bg-teal-500 text-white disabled:bg-gray-500 disabled:cursor-not-allowed font-pixel py-3 px-4 text-lg">GỬI ĐỀ NGHỊ</button>
                        </div>
                    </>
                ) : ( // PARTNER'S (or proposer waiting) VIEW
                    <>
                         <h2 className="text-2xl font-pixel text-teal-600 mb-2">ĐỀ NGHỊ TỪ {proposer.name.toUpperCase()}</h2>
                         <p className="mb-4 text-gray-600 animate-pulse h-6">Chờ <span className="font-bold" style={{color: partner.color}}>{partner.name}</span> trả lời...</p>
                         <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 mb-4">
                            <div className="flex flex-col gap-4">
                                <PlayerProfile player={proposer} />
                                <PlayerAssets player={proposer} />
                                <TradeSummary title="ĐƯA CHO BẠN" items={tradeOffer.offer} />
                            </div>
                            <div className="flex items-center h-full pt-36">
                                <span className="font-pixel text-5xl">⇄</span>
                            </div>
                             <div className="flex flex-col gap-4">
                                <PlayerProfile player={partner} />
                                <PlayerAssets player={partner} />
                                <TradeSummary title="LẤY TỪ BẠN" items={tradeOffer.request} />
                            </div>
                         </div>
                        <div className="flex gap-4 mt-4">
                             <button onClick={onReject} className="flex-1 pixel-button-color bg-red-500 text-white font-pixel py-3 px-4 text-lg">TỪ CHỐI</button>
                             <button onClick={onAccept} className="flex-1 pixel-button-color bg-green-500 text-white font-pixel py-3 px-4 text-lg">CHẤP NHẬN</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TradeModal;