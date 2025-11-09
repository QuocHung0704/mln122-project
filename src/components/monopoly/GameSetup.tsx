import React, { useState, useEffect } from 'react';
import { CHARACTER_MAP, CHARACTERS, PLAYER_COLORS } from '../../../public/constant';

interface GameSetupProps {
  onStartGame: (playerConfigs: { name: string; icon: string }[], startWithTutorial: boolean) => void;
}

interface PlayerConfig {
  name: string;
  icon: string;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [playerCharacters, setPlayerCharacters] = useState<string[]>(['', '']);
  const [startWithTutorial, setStartWithTutorial] = useState(true);

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
    // SỬA LỖI: Xóa bỏ logic kiểm tra trùng lặp để cho phép chọn trùng
    // if (playerCharacters.includes(characterId) && playerCharacters[index] !== characterId) {
    //   return;
    // }

    const newCharacters = [...playerCharacters];
    newCharacters[index] = newCharacters[index] === characterId ? '' : characterId;
    setPlayerCharacters(newCharacters);
  };

  const handleStartClick = () => {
    // SỬA LỖI: Gán các icon mặc định khác nhau
    const defaultIcons = ['♟️', '♝', '♞', '♜']; // Các icon mặc định
    const finalPlayerConfigs = playerCharacters.map((charId, index) => {
      const character = CHARACTER_MAP[charId];
      const defaultIcon = defaultIcons[index]; // Lấy icon mặc định theo thứ tự
      return {
        name: playerNames[index].trim() === '' ? `Đội ${index + 1}` : playerNames[index].trim(),
        // Lấy icon từ character, nếu không có thì dùng defaultIcon
        icon: (character ? character.cardImg : defaultIcon) || defaultIcon,
      };
    });
    onStartGame(finalPlayerConfigs, startWithTutorial);
  };

  // ✅ PlayerButton được đặt ngoài
  const PlayerButton = ({ count }: { count: number }) => (
    <button
      onClick={() => setSelectedPlayers(count)}
      className={`w-24 h-24 flex flex-col items-center justify-center transition-all duration-200 pixel-button ${
        selectedPlayers === count ? 'bg-cyan-300' : 'bg-gray-300'
      }`}
    >
      <span className="text-4xl font-bold">{count}</span>
      <span className="font-pixel text-xs mt-1">Đội</span>
    </button>
  );

  // ✅ return nằm ở thân chính của component
  // THAY ĐỔI: Chỉnh sửa các lớp CSS của div gốc
  // min-h-screen -> h-full (để vừa với layout cha)
  // w-screen -> w-full (để vừa với layout cha)
  // justify-center -> justify-start (để nội dung bắt đầu từ trên)
  // Thêm overflow-y-auto (để tự cuộn khi nội dung quá dài)
  return (
    <div className="h-full w-full p-4 flex flex-col items-center justify-start gap-8 overflow-y-auto">
      <h1
        className="text-4xl md:text-5xl font-pixel text-black text-center leading-tight pt-4" // Thêm pt-4 để không bị dính sát lề
        style={{ textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}
      >
        CỜ CÔNG DÂN
      </h1>

      {/* Thêm flex-shrink-0 để panel chính không bị co lại khi màn hình hẹp */}
      <main className="pixel-panel p-6 flex flex-col items-center gap-6 w-full max-w-2xl flex-shrink-0">
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
                <label className="font-pixel w-20">TÊN:</label>
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
                <label className="font-pixel w-20 flex-shrink-0">NHÂN VẬT:</label>
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CHARACTERS.map((char) => {
                    const isSelected = playerCharacters[index] === char.id;
                    // SỬA LỖI: Xóa bỏ logic isTaken
                    // const isTaken = playerCharacters.includes(char.id) && !isSelected;

                    return (
                      <button
                        key={char.id}
                        onClick={() => handleCharacterChange(index, char.id)}
                        // disabled={isTaken} // Bỏ disabled
                        className={`p-1 rounded-md transition-all duration-150 ${
                          isSelected
                            ? 'border-4 border-yellow-400 transform scale-105 shadow-lg'
                            : 'border-4 border-transparent'
                        } hover:border-yellow-200`} // Bỏ logic isTaken
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
                        <p className="text-xs font-pixel mt-1 text-center truncate">{char.name}</p>
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
      
      {/* Thêm một khoảng đệm ở dưới để cuộn đẹp hơn */}
      <div className="h-8 flex-shrink-0"></div>
    </div>
  );
};

export default GameSetup;