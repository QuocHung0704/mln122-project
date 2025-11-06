import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, CheckCircle, XCircle, ChevronRight, Lock, Heart, Spade, Diamond, Club, Clock, Check } from 'lucide-react';

// --- Component 1: Bảng điều khiển (Theme Sáng, Bỏ viền màu) ---
const PlayerQuadrant = ({ player, input, onBetChange, onAnswerSelect, onLockIn, minBet, maxBet, isDisabled }) => {
  const { bet, answerIndex, isLocked } = input;
  const isEliminated = player.chips <= 0;

  // Icons vẫn giữ màu để phân biệt
  const playerIcons = [
    <Heart className="h-6 w-6" style={{ color: player.color }} />,
    <Spade className="h-6 w-6" style={{ color: player.color }} />,
    <Club className="h-6 w-6" style={{ color: player.color }} />,
    <Diamond className="h-6 w-6" style={{ color: player.color }} />,
  ];

  const effectiveMin = Math.min(minBet, player.chips);
  const effectiveMax = Math.min(maxBet, player.chips);
  const isAllInForced = player.chips < minBet && player.chips > 0;
  
  const quadrantDisabled = isDisabled || isEliminated || isLocked;

  const handleBetClick = (amount) => {
    let newBet;
    if (amount === 'all') {
      newBet = player.chips;
    } else {
      newBet = Math.min(player.chips, amount);
    }
    if (newBet < effectiveMin && newBet < player.chips) {
      newBet = effectiveMin;
    }
    onBetChange(player.id, newBet);
  };

  const handleCustomBetChange = (e) => {
    let newBet = parseInt(e.target.value, 10);
    if (isNaN(newBet)) newBet = effectiveMin;
    newBet = Math.max(effectiveMin, newBet);
    newBet = Math.min(effectiveMax, newBet);
    onBetChange(player.id, newBet);
  };

  // *** CẬP NHẬT: Bỏ viền màu và viền xanh lá khi chốt ***
  return (
    <div 
      className={`p-4 rounded-lg border-4 bg-white shadow-md transition-all 
                 ${isEliminated ? 'opacity-40 bg-stone-100' : ''} 
                 ${isLocked ? 'shadow-lg' : ''} 
                 border-stone-300`} // Viền xám mặc định, không thay đổi khi chốt
    >
      {/* Header (Tên vẫn có màu) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold" style={{ color: player.color }}>{player.name}</h3>
        <span style={{ color: player.color }}>
          {isLocked ? <Lock className="h-6 w-6 text-green-500" /> : playerIcons[player.id % 4]}
        </span>
      </div>

      {/* Score */}
      <div className="text-center bg-stone-100 p-3 rounded-lg mb-4 border border-stone-200">
        <span className={`text-4xl font-bold ${isEliminated ? 'text-red-600' : 'text-green-700'}`}>
          <DollarSign className="inline h-8 w-8" />
          {isEliminated ? ' HẾT TIỀN' : ` ${player.chips}`}
        </span>
      </div>

      {/* Betting Area */}
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button onClick={() => handleBetClick(100)} disabled={quadrantDisabled || player.chips < 100} className="quiz-bet-button-light">100</button>
          <button onClick={() => handleBetClick(500)} disabled={quadrantDisabled || player.chips < 500} className="quiz-bet-button-light">500</button>
          <button onClick={() => handleBetClick(1000)} disabled={quadrantDisabled || player.chips < 1000} className="quiz-bet-button-light">1000</button>
          <button onClick={() => handleBetClick('all')} disabled={quadrantDisabled} className="quiz-bet-button-light bg-red-500 text-white hover:bg-red-600">CƯỢC HẾT</button>
        </div>
        <input 
          type="number" 
          value={bet} 
          onChange={handleCustomBetChange} 
          min={effectiveMin}
          max={effectiveMax}
          disabled={quadrantDisabled || isAllInForced}
          className="w-full p-2 text-center font-bold text-lg bg-white text-stone-900 rounded border border-stone-300" 
          placeholder="CƯỢC"
        />
        {isAllInForced && !isLocked && (
            <p className="text-center text-red-500 text-xs mt-1">Phải cược tất cả!</p>
        )}
      </div>

      {/* Answer Area */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {['A', 'B', 'C', 'D'].map((opt, index) => (
          <button 
            key={opt}
            onClick={() => onAnswerSelect(player.id, index)} 
            disabled={quadrantDisabled}
            className={`p-4 font-bold text-xl rounded transition-all border-2
                        ${answerIndex === index ? 'bg-amber-400 border-amber-600 text-black scale-105 shadow-lg' : 'bg-stone-200 border-stone-300 hover:bg-stone-300 text-stone-800'}
                        disabled:bg-stone-100 disabled:opacity-70 disabled:scale-100`}
          >
            {opt}
          </button>
        ))}
      </div>
      
      {/* Lock In Button */}
      {!isLocked && !isEliminated && (
        <button 
          onClick={() => onLockIn(player.id)} 
          disabled={quadrantDisabled || answerIndex === null || bet < effectiveMin} 
          className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded shadow-lg
                     disabled:bg-stone-400 disabled:cursor-not-allowed"
        >
          <Lock className="inline h-5 w-5 mr-2" />
          CHỐT
        </button>
      )}
      
      {/* Hiển thị khi đã chốt (không còn viền) */}
      {isLocked && !isEliminated && (
         <div className="w-full p-3 bg-green-100 text-green-800 font-bold text-xl rounded border-2 border-green-300 text-center">
            <Check className="inline h-5 w-5 mr-2" />
            ĐÃ CHỐT
         </div>
      )}

    </div>
  );
};

// --- Component 2: Modal Hiển thị Đáp án (Đây là phần bạn yêu cầu) ---
const RevealModal = ({ results, correctAnswerText, onNextQuestion, answerOptions }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg animate-fadeIn">
      <h3 className="text-2xl font-bold mb-4 text-center">Kết Thúc Vòng</h3>
      
      {/* 1. Hiển thị đáp án đúng (theo yêu cầu) */}
      <div className="space-y-2 mb-6">
        <h4 className="text-xl font-bold mb-3 text-center text-stone-900 uppercase">Đáp án đúng:</h4>
        {answerOptions.map((option, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border-2 transition-all ${
              option.text === correctAnswerText 
                ? 'bg-green-500 border-green-600 shadow-lg scale-105' // Tô xanh đậm đáp án đúng
                : 'bg-stone-100 border-stone-200 opacity-50' // Làm mờ đáp án sai
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-xl ${
                  option.text === correctAnswerText ? 'text-white' : 'text-stone-700'
                }`}>
                  {String.fromCharCode(65 + index)}. 
                </span>
                <span className={`text-base ${option.text === correctAnswerText ? 'font-bold text-white' : 'text-stone-800'}`}>
                  {option.text}
                </span>
              </div>
              {option.text === correctAnswerText && (
                <CheckCircle className="h-6 w-6 text-white flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <h4 className="text-lg font-bold mb-2 text-center text-stone-800">Kết quả các đội:</h4>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {results.map(res => (
          <div key={res.player.id} className="flex justify-between items-center p-3 rounded-lg"
               style={{ backgroundColor: res.isCorrect ? '#f0fdf4' : '#fef2f2' }}>
            <div>
              <p className="font-bold" style={{color: res.player.color}}>{res.player.name}</p>
              <p className="text-sm">
                Đã cược: <span className="font-semibold">${res.bet}</span> | 
                Chọn: <span className={`font-semibold ${res.answer ? (res.isCorrect ? 'text-green-700' : 'text-red-700') : 'text-gray-500 italic'}`}>
                  {res.answer || "(Hết giờ/Bỏ lỡ)"}
                </span>
              </p>
            </div>
            <div className={`font-bold text-lg ${res.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {res.isCorrect ? `+${res.bet}` : `-${res.bet}`}
            </div>
          </div>
        ))}
      </div>
      
      {/* 2. Nút "Câu hỏi tiếp theo" (theo yêu cầu) */}
      <button
        onClick={onNextQuestion}
        className="w-full flex items-center justify-center px-6 py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 mt-6"
      >
        Câu hỏi tiếp theo
        <ChevronRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  </div>
);


// --- Component 3: Màn hình chơi chính (Logic chính) ---
const QuizActive = ({ questions, players, setPlayers, onEndQuiz, minBet, maxBet, timePerQuestion }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewState, setViewState] = useState('betting'); // 'betting', 'reveal'
  const [results, setResults] = useState([]);
  const [playerInputs, setPlayerInputs] = useState({});
  const [timer, setTimer] = useState(timePerQuestion);

  const currentQuestion = questions[currentQuestionIndex];
  const activePlayers = useMemo(() => players.filter(p => p.chips > 0), [players]);

  // Reset state cho câu hỏi mới
  useEffect(() => {
    setViewState('betting');
    setResults([]);
    setTimer(timePerQuestion);
    setPlayerInputs(players.reduce((acc, p) => {
      const effectiveMin = Math.min(minBet, p.chips);
      acc[p.id] = { 
        bet: p.chips > 0 ? effectiveMin : 0, 
        answerIndex: null, answerText: null,
        isLocked: p.chips <= 0
      };
      return acc;
    }, {}));
  }, [currentQuestionIndex, players, minBet, timePerQuestion]);

  // Logic Timer
  useEffect(() => {
    if (viewState !== 'betting') return;
    if (timer <= 0) {
      autoLockAll();
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, viewState]);
  
  // Xử lý inputs
  const handleBetChange = (playerId, newBet) => {
    setPlayerInputs(prev => ({
      ...prev, [playerId]: { ...prev[playerId], bet: newBet }
    }));
  };
  const handleAnswerSelect = (playerId, answerIndex) => {
    const answerText = currentQuestion.answerOptions[answerIndex].text;
    setPlayerInputs(prev => ({
      ...prev, [playerId]: { ...prev[playerId], answerIndex, answerText }
    }));
  };
  const handleLockIn = (playerId, isAutoLock = false) => {
    const player = players.find(p => p.id === playerId);
    const input = playerInputs[playerId];
    if (isAutoLock) {
        // Hết giờ, chỉ khóa lại
    } else {
      // Người dùng tự chốt, kiểm tra logic
      if (player.chips >= minBet && input.bet < minBet) {
        alert(`Bạn phải cược ít nhất ${minBet} chip!`); return;
      }
      if (player.chips < minBet && input.bet !== player.chips) {
        alert(`Bạn có quá ít chip. Bạn phải cược tất cả ${player.chips} chip!`);
        handleBetChange(playerId, player.chips);
      }
      if (input.answerIndex === null) {
        alert('Bạn phải chọn một đáp án!'); return;
      }
    }
    setPlayerInputs(prev => ({
      ...prev, [playerId]: { ...prev[playerId], isLocked: true }
    }));
  };

  // Tự động khóa khi hết giờ
  const autoLockAll = () => {
    activePlayers.forEach(p => {
      if (!playerInputs[p.id]?.isLocked) {
        handleLockIn(p.id, true); // true = auto-lock
      }
    });
  };

  // Chuyển sang 'reveal' khi tất cả đã khóa
  useEffect(() => {
    if (viewState !== 'betting' || activePlayers.length === 0) return;
    const allActivePlayersLocked = activePlayers.every(p => playerInputs[p.id]?.isLocked);
    
    // Đây là logic kích hoạt Modal (theo yêu cầu)
    if (allActivePlayersLocked) {
      setTimer(0);
      setTimeout(() => {
        calculateResults();
        setViewState('reveal'); // Kích hoạt Modal
      }, 1000); 
    }
  }, [playerInputs, activePlayers, viewState]);
  
  // Tính kết quả
  const calculateResults = () => {
    const roundResults = [];
    let updatedPlayers = [...players];
    
    for (const player of activePlayers) {
      const input = playerInputs[player.id];
      const isCorrect = input.answerText === currentQuestion.correctAnswer;
      const chipChange = isCorrect ? input.bet : -input.bet;
      
      roundResults.push({ player, bet: input.bet, answer: input.answerText, isCorrect });
      
      updatedPlayers = updatedPlayers.map(p => 
        p.id === player.id ? { ...p, chips: Math.max(0, p.chips + chipChange) } : p
      );
    }
    setResults(roundResults);
    setPlayers(updatedPlayers);
  };

  // Qua câu tiếp theo (được gọi từ Modal)
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    const remainingPlayers = players.filter(p => p.chips > 0).length;

    if (nextQuestionIndex >= questions.length || remainingPlayers <= 1) {
      onEndQuiz();
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const timerColor = timer <= 10 ? 'text-red-500' : 'text-stone-800';
  const timerBarWidth = (timer / timePerQuestion) * 100;

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {/* Modal sẽ hiển thị khi viewState === 'reveal' */}
      {viewState === 'reveal' && (
        <RevealModal 
          results={results} 
          correctAnswerText={currentQuestion.correctAnswer}
          answerOptions={currentQuestion.answerOptions}
          onNextQuestion={handleNextQuestion} 
        />
      )}

      {/* Header: Câu hỏi và Timer */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
           <p className="text-sm font-medium text-stone-600">
            Câu hỏi {currentQuestionIndex + 1} / {questions.length}
          </p>
          <div className={`text-3xl font-bold font-mono ${timerColor} flex items-center`}>
            <Clock className="h-6 w-6 mr-2" />
            {timer}
          </div>
        </div>
        
        <div className="w-full bg-stone-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ease-linear ${timer <= 10 ? 'bg-red-500' : 'bg-amber-500'}`}
            style={{ width: `${timerBarWidth}%` }}
          ></div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-6 text-center leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* 2x2 Grid cho người chơi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <PlayerQuadrant 
            key={player.id}
            player={player}
            input={playerInputs[player.id] || { bet: 0, answerIndex: null, isLocked: true }}
            onBetChange={handleBetChange}
            onAnswerSelect={handleAnswerSelect}
            onLockIn={handleLockIn}
            minBet={minBet}
            maxBet={maxBet}
            isDisabled={playerInputs[player.id]?.isLocked || viewState === 'reveal'}
          />
        ))}
        {/* Thêm các ô trống nếu ít hơn 4 người chơi */}
        {players.length < 4 && <div className="hidden md:block rounded-lg border-4 border-dashed border-stone-300 bg-stone-100 min-h-[360px]"></div>}
        {players.length < 3 && <div className="hidden md:block rounded-lg border-4 border-dashed border-stone-300 bg-stone-100 min-h-[360px]"></div>}
      </div>

      {/* Hiển thị các đáp án */}
      <div className="mt-8 p-4 bg-white border border-stone-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-stone-800 text-center mb-3">CÁC LỰA CHỌN ĐÁP ÁN</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQuestion.answerOptions.map((option, index) => (
            <div key={index} className="p-3 bg-stone-100 border border-stone-200 rounded">
              <span className="font-bold text-amber-700 text-lg">{String.fromCharCode(65 + index)}. </span>
              <span className="text-stone-800 text-base">{option.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizActive;