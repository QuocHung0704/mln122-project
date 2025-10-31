import React, { useState, useEffect } from 'react';
import { CHARACTERS, PLAYER_COLORS } from '../../config/constant';

interface GameSetupProps {
    onStartGame: (
        numPlayers: number,
        playerNames: string[],
        playerCharacters: string[],
        startWithTutorial: boolean
    ) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
    const [selectedPlayers, setSelectedPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
    const [startWithTutorial, setStartWithTutorial] = useState(true);
    const [playerCharacters, setPlayerCharacters] = useState<string[]>(['', '']);

    useEffect(() => {
        const newNames = new Array(selectedPlayers).fill('');
        const newCharacters = new Array(selectedPlayers).fill('');

        setPlayerNames((currentNames) => {
            for (let i = 0; i < Math.min(selectedPlayers, currentNames.length); i++) {
                newNames[i] = currentNames[i];
            }
            return newNames;
        });

        setPlayerCharacters((currentChars) => {
            for (let i = 0; i < Math.min(selectedPlayers, currentChars.length); i++) {
                newCharacters[i] = currentChars[i];
            }
            return newCharacters;
        });
    }, [selectedPlayers]);

    const handleNameChange = (index: number, name: string) => {
        const newNames = [...playerNames];
        newNames[index] = name;
        setPlayerNames(newNames);
    };

    const handleCharacterChange = (index: number, characterId: string) => {
        if (
            playerCharacters.includes(characterId) &&
            playerCharacters[index] !== characterId
        ) {
            return;
        }

        const newCharacters = [...playerCharacters];
        if (newCharacters[index] === characterId) {
            newCharacters[index] = '';
        } else {
            newCharacters[index] = characterId;
        }
        setPlayerCharacters(newCharacters);
    };

    const handleStartClick = () => {
        const finalPlayerNames = playerNames.map((name, index) =>
            name.trim() === '' ? `Tư Bản ${index + 1}` : name.trim(),
        );

        const availableCharacterIds = CHARACTERS.map((c) => c.id);
        const unselectedCharacters = availableCharacterIds.filter(
            (id) => !playerCharacters.includes(id),
        );

        const finalPlayerCharacters = playerCharacters.map((charId, index) => {
            if (charId) return charId;
            return unselectedCharacters.length > 0
                ? unselectedCharacters.shift()!
                : availableCharacterIds[index % availableCharacterIds.length];
        });

        const uniqueChars = new Set(finalPlayerCharacters);
        if (uniqueChars.size !== finalPlayerCharacters.length) {
            for (let i = 0; i < finalPlayerCharacters.length; i++) {
                if (!finalPlayerCharacters[i]) {
                    finalPlayerCharacters[i] = availableCharacterIds[i];
                }
            }
        }

        onStartGame(
            selectedPlayers,
            finalPlayerNames,
            finalPlayerCharacters,
            startWithTutorial,
        );
    };

    const PlayerButton = ({ count }: { count: number }) => (
        <button
            onClick={() => setSelectedPlayers(count)}
            className={`w-24 h-24 flex flex-col items-center justify-center transition-all duration-200 pixel-button ${selectedPlayers === count ? 'bg-cyan-300' : 'bg-gray-300'
                }`}
        >
            <span className="text-4xl font-bold">{count}</span>
            <span className="font-pixel text-xs mt-1">Players</span>
        </button>
    );

    return (
        <div className="min-h-screen w-screen p-4 flex flex-col items-center justify-center gap-8">
          <h1
            className="text-4xl md:text-5xl font-pixel text-black text-center leading-tight"
            style={{ textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}
          >
            VÒNG XOÁY TƯ BẢN
          </h1>
    
          <main className="pixel-panel p-6 flex flex-col items-center gap-6 w-full max-w-2xl">
            {' '}
            <div>
              <h2 className="text-xl font-pixel text-center">CHỌN SỐ NGƯỜI CHƠI</h2>
              <div className="flex justify-center gap-4 mt-4">
                <PlayerButton count={2} />
                <PlayerButton count={3} />
                <PlayerButton count={4} />
              </div>
            </div>
            <div className="w-full space-y-4">
              <h2 className="text-xl font-pixel text-center">TÙY CHỈNH NGƯỜI CHƠI</h2>
              {Array.from({ length: selectedPlayers }).map((_, index) => (
                <div
                  key={index}
                  className="pixel-panel-inset p-4 space-y-3" 
                  style={{
                    borderLeft: `8px solid ${PLAYER_COLORS[index]}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <label className="font-pixel w-20">TÊN:</label>{' '}
                    <input
                      type="text"
                      value={playerNames[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Tư Bản ${index + 1}`}
                      maxLength={20}
                      className="w-full pixel-panel-inset px-3 py-2 placeholder-gray-500 outline-none transition"
                    />
                  </div>
    
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="font-pixel w-20 flex-shrink-0">
                      NHÂN VẬT:
                    </label>
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CHARACTERS.map((char) => {
                        const isSelected = playerCharacters[index] === char.id;
                        const isTaken =
                          playerCharacters.includes(char.id) && !isSelected;
    
                        return (
                          <button
                            key={char.id}
                            onClick={() => handleCharacterChange(index, char.id)}
                            disabled={isTaken}
                            className={`p-1 rounded-md transition-all duration-150 ${
                              isSelected
                                ? 'border-4 border-yellow-400 transform scale-105 shadow-lg'
                                : 'border-4 border-transparent'
                            } ${
                              isTaken
                                ? 'opacity-40 cursor-not-allowed'
                                : 'hover:border-yellow-200'
                            }`}
                          >
                            <img
                              src={char.cardImg}
                              alt={char.name}
                              className="w-full object-contain rounded"
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/150x200?text=Loi+Anh';
                                e.currentTarget.alt = 'Lỗi tải ảnh';
                              }}
                            />
                            <p className="text-xs font-pixel mt-1 text-center truncate">
                              {char.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
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