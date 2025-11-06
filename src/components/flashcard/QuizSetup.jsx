import React, { useState } from 'react';
import { Settings, Play, Users, DollarSign, ListChecks, ChevronsDown, ChevronsUp, Clock } from 'lucide-react';

const QuizSetup = ({ onStartQuiz, maxQuestions }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([
    { name: 'Đội 1', chips: 100, color: '#ef4444' },
    { name: 'Đội 2', chips: 100, color: '#3b82f6' },
  ]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [minBet, setMinBet] = useState(10);
  const [maxBet, setMaxBet] = useState(50);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  const handleNumPlayersChange = (num) => {
    setNumPlayers(num);
    const defaultColors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308']; // Đỏ, Xanh, Lá, Vàng
    const newPlayers = Array(num)
      .fill(null)
      .map((_, i) => ({
        name: `Đội ${i + 1}`,
        chips: 100,
        color: defaultColors[i],
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

  const handleNumQuestionsChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > maxQuestions) num = maxQuestions;
    setNumQuestions(num);
  };

  const handleMinBetChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > maxBet) setMinBet(maxBet);
    else setMinBet(num);
  };

  const handleMaxBetChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num < minBet) setMaxBet(minBet);
    else setMaxBet(num);
  };

  const handleTimeChange = (e) => {
    let num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 5) num = 5;
    setTimePerQuestion(num);
  };

  const handleStart = () => {
    if (maxQuestions < 4) {
      alert("Không đủ dữ liệu (cần ít nhất 4 thẻ) để tạo quiz.");
      return;
    }
    try {
      const validPlayers = players.map(p => {
        const startingChips = parseInt(p.chips, 10) || 100;
        if (startingChips < minBet) {
           alert(`Người chơi ${p.name} phải có ít nhất ${minBet} chip (cược tối thiểu) để bắt đầu!`);
           throw new Error("Invalid starting chips");
        }
        return {
          ...p,
          chips: startingChips,
          id: p.name + Date.now()
        };
      });
      
      onStartQuiz(validPlayers, numQuestions, minBet, maxBet, timePerQuestion);

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center mb-2 text-center justify-center">
        <Settings className="mr-2 h-6 w-6" />
        Tùy Chỉnh Quiz
      </h3>

      {/* Tùy chỉnh câu hỏi và thời gian */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3 mx-auto">
        <div className="flex-1">
          <label htmlFor="numQuestions" className="block text-sm font-medium text-stone-700 mb-1">
            <ListChecks className="mr-1 h-4 w-4 inline-block" />
            Số lượng câu hỏi (Tối đa: {maxQuestions})
          </label>
          <input
            id="numQuestions" type="number" min="1" max={maxQuestions} value={numQuestions}
            onChange={handleNumQuestionsChange}
            className="w-full p-2 border border-stone-300 rounded-md"
            disabled={maxQuestions === 0}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="timePerQuestion" className="block text-sm font-medium text-stone-700 mb-1">
            <Clock className="mr-1 h-4 w-4 inline-block" />
            Thời gian mỗi câu (giây)
          </label>
          <input
            id="timePerQuestion" type="number" min="5" step="5" value={timePerQuestion}
            onChange={handleTimeChange}
            className="w-full p-2 border border-stone-300 rounded-md"
          />
        </div>
      </div>

      {/* Cài đặt Cược */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-2/3 mx-auto">
        <div className="flex-1">
          <label htmlFor="minBet" className="block text-sm font-medium text-stone-700 mb-1">
            <ChevronsDown className="mr-1 h-4 w-4 inline-block" />
            Cược Tối Thiểu
          </label>
          <input
            id="minBet" type="number" min="1" value={minBet}
            onChange={handleMinBetChange}
            className="w-full p-2 border border-stone-300 rounded-md"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="maxBet" className="block text-sm font-medium text-stone-700 mb-1">
            <ChevronsUp className="mr-1 h-4 w-4 inline-block" />
            Cược Tối Đa
          </label>
          <input
            id="maxBet" type="number" min={minBet} value={maxBet}
            onChange={handleMaxBetChange}
            className="w-full p-2 border border-stone-300 rounded-md"
          />
        </div>
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
              key={num} onClick={() => handleNumPlayersChange(num)}
              className={`w-20 h-20 flex items-center justify-center font-bold text-2xl rounded-lg border-4 transition-all
                         ${numPlayers === num ? 'bg-amber-200 border-amber-500 scale-105 shadow-md' : 'bg-stone-100 border-stone-300 hover:bg-amber-100'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-stone-200" />

      {/* Nhập thông tin người chơi */}
      <div className="space-y-4">
        {/* *** CẬP NHẬT: Bỏ viền màu, thay bằng viền xám mặc định *** */}
        {players.map((player, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border-2 border-stone-200">
            <div className="flex-1">
              <label htmlFor={`playerName${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                Tên Đội {index + 1} 
                <span className="font-bold" style={{color: player.color}}> ({player.name})</span>
              </label>
              <input
                id={`playerName${index}`} type="text" value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-md"
              />
            </div>
            <div className="sm:w-1/3">
              <label htmlFor={`playerChips${index}`} className="block text-sm font-medium text-stone-700 mb-1">
                <DollarSign className="mr-1 h-4 w-4 inline-block" />
                Chip Bắt Đầu (Phải ≥ {minBet})
              </label>
              <input
                id={`playerChips${index}`} type="number" min={minBet} step="10" value={player.chips}
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
        onClick={handleStart} disabled={maxQuestions < 4}
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