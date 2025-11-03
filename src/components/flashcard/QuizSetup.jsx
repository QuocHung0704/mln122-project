import React, { useState } from 'react';
import { Settings, Play, Users, DollarSign, ListChecks } from 'lucide-react'; // Thêm icon ListChecks

const QuizSetup = ({ onStartQuiz, maxQuestions }) => { // Đổi tên prop thành maxQuestions
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([
    { name: 'Player 1', chips: 100 },
    { name: 'Player 2', chips: 100 },
  ]);
  const [numQuestions, setNumQuestions] = useState(10); // *** STATE MỚI ***

  const handleNumPlayersChange = (num) => {
    setNumPlayers(num);
    const newPlayers = Array(num)
      .fill(null)
      .map((_, i) => ({
        name: `Player ${i + 1}`,
        chips: 100,
      }));
    setPlayers(newPlayers);
  };

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index] = {
      ...newPlayers[index],
      [field]: value,
    };
    setPlayers(newPlayers);
  };

  // *** HÀM MỚI ***
  const handleNumQuestionsChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > maxQuestions) num = maxQuestions;
    setNumQuestions(num);
  };

  const handleStart = () => {
    if (maxQuestions < 4) {
      alert("Không đủ dữ liệu (cần ít nhất 4 thẻ) để tạo quiz.");
      return;
    }
    // Đảm bảo chip là số
    const validPlayers = players.map(p => ({
      ...p,
      chips: parseInt(p.chips, 10) || 100,
      id: p.name + Date.now() // Thêm ID duy nhất
    }));
    // *** TRUYỀN THÊM numQuestions ***
    onStartQuiz(validPlayers, numQuestions);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center mb-2 text-center justify-center">
        <Settings className="mr-2 h-6 w-6" />
        Tùy Chỉnh Quiz
      </h3>

      {/* *** KHỐI MỚI: TÙY CHỈNH CÂU HỎI *** */}
      <div className="w-full sm:w-2/3 mx-auto">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-stone-700 mb-1">
          <ListChecks className="mr-1 h-4 w-4 inline-block" />
          Số lượng câu hỏi (Tối đa: {maxQuestions})
        </label>
        <input
          id="numQuestions"
          type="number"
          min="1"
          max={maxQuestions}
          value={numQuestions}
          onChange={handleNumQuestionsChange}
          className="w-full p-2 border border-stone-300 rounded-md"
          disabled={maxQuestions === 0}
        />
      </div>

      {/* Chọn số người chơi */}
      <div className="w-full sm:w-2/3 mx-auto">
        <label className="block text-sm font-medium text-stone-700 mb-2 text-center">
          <Users className="mr-1 h-4 w-4 inline-block" />
          Số lượng người chơi
        </label>
        <div className="flex justify-center gap-4">
          {[2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleNumPlayersChange(num)}
              className={`w-20 h-20 flex items-center justify-center font-bold text-2xl rounded-lg border-4 transition-all
                         ${numPlayers === num
                           ? 'bg-amber-200 border-amber-500 scale-105 shadow-md'
                           : 'bg-stone-100 border-stone-300 hover:bg-amber-100'
                         }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-stone-200" />

      {/* Nhập thông tin người chơi */}
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor={`playerName${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                Tên Người Chơi {index + 1}
              </label>
              <input
                id={`playerName${index}`}
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md"
              />
            </div>
            <div className="sm:w-1/3">
              <label htmlFor={`playerChips${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                <DollarSign className="mr-1 h-4 w-4 inline-block" />
                Chip Bắt Đầu
              </label>
              <input
                id={`playerChips${index}`}
                type="number"
                min="1"
                step="10"
                value={player.chips}
                onChange={(e) => handlePlayerChange(index, 'chips', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="border-stone-200" />

      {/* Bắt đầu */}
      <button
        onClick={handleStart}
        disabled={maxQuestions < 4}
        className="w-full flex items-center justify-center px-6 py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md 
                   hover:bg-amber-900 transition-all duration-300 transform hover:scale-105
                   disabled:bg-stone-400 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Play className="mr-2 h-5 w-5" />
        Bắt đầu
      </button>
      {maxQuestions < 4 && (
        <p className="text-sm text-red-600 text-center mt-2">
          Cần ít nhất 4 câu hỏi trong file data để bắt đầu.
        </p>
      )}
    </div>
  );
};

export default QuizSetup;