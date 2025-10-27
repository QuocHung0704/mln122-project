import React, { useState } from 'react';

const getEventEntryStyle = (entry: string): string => {
    if (entry.includes('nhận') || entry.includes('thắng') || entry.includes('thu về')) return 'text-green-700';
    if (entry.includes('mất') || entry.includes('trả') || entry.includes('thua') || entry.includes('bị thu')) return 'text-red-700';
    if(entry.startsWith('---')) return 'text-blue-700 font-bold text-center my-1';
    return 'text-gray-800';
};

const getTradeEntryStyle = (entry: string): string => {
    if (entry.startsWith('✅')) return 'text-green-700';
    if (entry.startsWith('❌')) return 'text-red-700';
    if (entry.startsWith('🚫')) return 'text-yellow-600';
    return 'text-gray-800';
};

interface GameLogProps {
    log: string[];
    tradeLog: string[];
}

const GameLog: React.FC<GameLogProps> = ({ log, tradeLog }) => {
    const [activeTab, setActiveTab] = useState<'events' | 'trades'>('events');
    
    return (
        <div className="flex-grow flex flex-col min-h-0">
            <div className="flex">
                <button 
                    onClick={() => setActiveTab('events')}
                    className={`flex-1 py-2 font-pixel text-sm border-4 border-b-0 border-black ${activeTab === 'events' ? 'bg-white' : 'bg-gray-300'}`}
                >
                    SỰ KIỆN
                </button>
                <button 
                    onClick={() => setActiveTab('trades')}
                    className={`flex-1 py-2 font-pixel text-sm border-4 border-b-0 border-black ${activeTab === 'trades' ? 'bg-white' : 'bg-gray-300'}`}
                >
                    GIAO DỊCH
                </button>
            </div>
            <div className="flex-grow pixel-panel-inset p-2 overflow-y-auto flex flex-col-reverse bg-white border-4 border-black">
                {activeTab === 'events' ? (
                     <ul className="space-y-1 text-xs p-1">
                        {log.map((entry, index) => (
                            <li key={index} className={`transition-opacity duration-300 ${getEventEntryStyle(entry)}`}>
                               {entry.startsWith('---') ? entry : `> ${entry}`}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        {tradeLog.length > 0 ? (
                            <ul className="space-y-1 text-xs p-1">
                                {tradeLog.map((entry, index) => (
                                    <li key={index} className={`transition-opacity duration-300 ${getTradeEntryStyle(entry)}`}>
                                       {entry}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 italic text-sm">
                                Chưa có giao dịch.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GameLog;