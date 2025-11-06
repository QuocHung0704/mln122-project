import React from 'react';

const getEventEntryStyle = (entry: string): string => {
    if (entry.includes('nhận') || entry.includes('thắng') || entry.includes('thu về')) return 'text-green-700';
    if (entry.includes('mất') || entry.includes('trả') || entry.includes('thua') || entry.includes('bị thu')) return 'text-red-700';
    if(entry.startsWith('---')) return 'text-blue-700 font-bold text-center my-1';
    return 'text-gray-800';
};

interface GameLogProps {
    log: string[];
}

const GameLog: React.FC<GameLogProps> = ({ log }) => {
    return (
        <div className="flex-grow flex flex-col min-h-0">
             <div className="flex">
                <div className="flex-1 py-2 font-pixel text-sm border-4 border-b-0 border-black bg-white text-center">
                    SỰ KIỆN
                </div>
            </div>
            <div className="h-64 lg:flex-grow lg:min-h-0 pixel-panel-inset p-2 overflow-y-auto flex flex-col-reverse bg-white border-4 border-black">
                 <ul className="space-y-1 text-xs p-1">
                    {log.map((entry, index) => (
                        <li key={index} className={`transition-opacity duration-300 ${getEventEntryStyle(entry)}`}>
                           {entry.startsWith('---') ? entry : `> ${entry}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GameLog;