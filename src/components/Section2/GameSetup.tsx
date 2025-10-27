import React, { useState, useEffect } from 'react';
import { PLAYER_COLORS } from '../../utils/constant';

interface GameSetupProps {
    onStartGame: (numPlayers: number, playerNames: string[], startWithTutorial: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
    const [selectedPlayers, setSelectedPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
    const [startWithTutorial, setStartWithTutorial] = useState(true);

    useEffect(() => {
        setPlayerNames(currentNames => {
            const newNames = new Array(selectedPlayers).fill('');
            for (let i = 0; i < Math.min(selectedPlayers, currentNames.length); i++) {
                newNames[i] = currentNames[i];
            }
            return newNames;
        });
    }, [selectedPlayers]);

    const handleNameChange = (index: number, name: string) => {
        const newNames = [...playerNames];
        newNames[index] = name;
        setPlayerNames(newNames);
    };

    const handleStartClick = () => {
        const finalPlayerNames = playerNames.map((name, index) => 
            name.trim() === '' ? `Tư Bản ${index + 1}` : name.trim()
        );
        onStartGame(selectedPlayers, finalPlayerNames, startWithTutorial);
    };

    const PlayerButton = ({ count }: { count: number }) => (
        <button
            onClick={() => setSelectedPlayers(count)}
            className={`w-24 h-24 flex flex-col items-center justify-center transition-all duration-200 pixel-button ${selectedPlayers === count ? 'bg-cyan-300' : 'bg-gray-300'}`}
        >
            <span className="text-4xl font-bold">{count}</span>
            <span className="font-pixel text-xs mt-1">Players</span>
        </button>
    );

    return (
        <div className="min-h-screen w-screen p-4 flex flex-col items-center justify-center gap-8">
             <h1 className="text-4xl md:text-5xl font-pixel text-black text-center leading-tight" style={{ textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}>
                    VÒNG XOÁY TƯ BẢN
                </h1>

            <main className="pixel-panel p-6 flex flex-col items-center gap-6 w-full max-w-md">
                <div>
                    <h2 className="text-xl font-pixel text-center">CHỌN SỐ NGƯỜI CHƠI</h2>
                    <div className="flex justify-center gap-4 mt-4">
                        <PlayerButton count={2} />
                        <PlayerButton count={3} />
                        <PlayerButton count={4} />
                    </div>
                </div>

                <div className="w-full space-y-3">
                    <h2 className="text-xl font-pixel text-center">NHẬP TÊN</h2>
                    {Array.from({ length: selectedPlayers }).map((_, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div 
                                className="w-6 h-6 border-2 border-black" 
                                style={{ backgroundColor: PLAYER_COLORS[index] }} 
                            />
                            <input
                                type="text"
                                value={playerNames[index]}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                placeholder={`Tư Bản ${index + 1}`}
                                maxLength={20}
                                className="w-full pixel-panel-inset px-3 py-2 placeholder-gray-500 outline-none transition"
                            />
                        </div>
                    ))}
                </div>

                <div className="w-full flex items-center justify-center my-2">
                    <label className="flex items-center gap-3 cursor-pointer p-2">
                        <input
                            type="checkbox"
                            checked={startWithTutorial}
                            onChange={(e) => setStartWithTutorial(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <span className="font-pixel text-sm">Bắt đầu với Hướng Dẫn</span>
                    </label>
                </div>

                <button
                    onClick={handleStartClick}
                    className="w-full pixel-button-color bg-red-500 text-white font-pixel py-3 px-4 text-xl"
                >
                    BẮT ĐẦU!
                </button>
            </main>
        </div>
    );
};

export default GameSetup;