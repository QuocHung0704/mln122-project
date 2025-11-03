import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, CheckCircle, XCircle, ChevronRight, Lock } from 'lucide-react';

// Thanh hiển thị trạng thái người chơi
const PlayerStatus = ({ players, lockedPlayers, currentPlayerId }) => (
  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
    {players.map((player) => {
      const isLocked = lockedPlayers.has(player.id);
      const isCurrent = player.id === currentPlayerId;
      return (
        <div
          key={player.id}
          className={`p-3 rounded-lg border-2 transition-all w-full sm:w-auto
                     ${isCurrent && !isLocked
                       ? 'bg-amber-100 border-amber-400 shadow-md'
                       : 'bg-stone-50 border-stone-200'
                     }
                     ${player.chips <= 0 ? 'opacity-50' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-800">{player.name}</span>
            {isLocked && <Lock className="h-4 w-4 text-green-600" title="Đã chốt" />}
            {player.chips <= 0 && <span className="text-xs text-red-600 font-bold">HẾT TIỀN</span>}
          </div>
          <div className="font-semibold text-green-700">${player.chips}</div>
        </div>
      );
    })}
  </div>
);

// Modal hiển thị kết quả
const RevealModal = ({ results, correctAnswer, onNextQuestion }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg animate-fadeIn">
      <h3 className="text-2xl font-bold mb-4 text-center">Kết Quả Vòng Này</h3>
      <p className="text-center text-lg mb-4">
        Đáp án đúng là: <strong className="text-green-700">{correctAnswer}</strong>
      </p>
      
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {results.map(res => (
          <div key={res.player.id} className="flex justify-between items-center p-3 rounded-lg"
               style={{ backgroundColor: res.isCorrect ? '#f0fdf4' : '#fef2f2' }}>
            <div>
              <p className="font-bold">{res.player.name}</p>
              <p className="text-sm">
                Đã cược: <span className="font-semibold">${res.bet}</span> | 
                Chọn: <span className="font-semibold">{res.answer || "(Bỏ lỡ)"}</span>
              </p>
            </div>
            <div className={`font-bold text-lg ${res.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {res.isCorrect ? `+${res.bet}` : `-${res.bet}`}
            </div>
          </div>
        ))}
      </div>
      
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

const QuizActive = ({ questions, players, setPlayers, onEndQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Index trong mảng activePlayers
  const [playerInputs, setPlayerInputs] = useState({}); // { playerId: { bet: 10, answer: null } }
  const [lockedPlayers, setLockedPlayers] = useState(new Set());
  const [viewState, setViewState] = useState('betting'); // 'betting', 'reveal'
  const [results, setResults] = useState([]); // [ { player, bet, answer, isCorrect }, ... ]

  const currentQuestion = questions[currentQuestionIndex];
  
  // Chỉ những người chơi còn chip mới được chơi
  const activePlayers = useMemo(() => players.filter(p => p.chips > 0), [players]);
  const currentPlayer = activePlayers[currentPlayerIndex];

  // Reset state cho câu hỏi mới
  useEffect(() => {
    setViewState('betting');
    setLockedPlayers(new Set());
    setResults([]);
    setCurrentPlayerIndex(0);
    // Đặt cược và câu trả lời mặc định cho tất cả người chơi CÒN TIỀN
    setPlayerInputs(activePlayers.reduce((acc, p) => {
      acc[p.id] = { bet: 10, answer: null };
      return acc;
    }, {}));
  }, [currentQuestionIndex, activePlayers.length]); // Chạy lại nếu số người chơi active thay đổi

  if (!currentPlayer || !currentQuestion) {
    // Trường hợp không còn người chơi hoặc câu hỏi
    return <div>Đang tải...</div>;
  }
  
  const currentBet = playerInputs[currentPlayer.id]?.bet || 10;
  const currentAnswer = playerInputs[currentPlayer.id]?.answer || null;

  const handleBetChange = (e) => {
    let newBet = parseInt(e.target.value, 10);
    if (isNaN(newBet) || newBet < 1) newBet = 1;
    if (newBet > currentPlayer.chips) newBet = currentPlayer.chips;
    
    setPlayerInputs(prev => ({
      ...prev,
      [currentPlayer.id]: { ...prev[currentPlayer.id], bet: newBet }
    }));
  };

  const handleAnswerSelect = (answerText) => {
    setPlayerInputs(prev => ({
      ...prev,
      [currentPlayer.id]: { ...prev[currentPlayer.id], answer: answerText }
    }));
  };

  const handleLockIn = () => {
    if (!currentAnswer) {
      alert('Bạn phải chọn một đáp án!');
      return;
    }
    
    const newLockedPlayers = new Set(lockedPlayers).add(currentPlayer.id);
    setLockedPlayers(newLockedPlayers);

    // Kiểm tra xem tất cả người chơi active đã chốt chưa
    if (newLockedPlayers.size === activePlayers.length) {
      // TẤT CẢ ĐÃ CHỐT -> CHUYỂN SANG VIEW REVEAL
      calculateResults();
      setViewState('reveal');
    } else {
      // Chuyển sang người chơi tiếp theo
      setCurrentPlayerIndex((currentPlayerIndex + 1) % activePlayers.length);
    }
  };
  
  const calculateResults = () => {
    const roundResults = [];
    let updatedPlayers = [...players];
    
    for (const player of activePlayers) {
      const input = playerInputs[player.id];
      const isCorrect = input.answer === currentQuestion.correctAnswer;
      const chipChange = isCorrect ? input.bet : -input.bet;
      
      roundResults.push({
        player,
        bet: input.bet,
        answer: input.answer,
        isCorrect: isCorrect,
      });
      
      // Cập nhật chip cho người chơi
      updatedPlayers = updatedPlayers.map(p => 
        p.id === player.id ? { ...p, chips: Math.max(0, p.chips + chipChange) } : p
      );
    }
    
    setResults(roundResults);
    setPlayers(updatedPlayers); // Cập nhật state chip của tất cả người chơi
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    const remainingPlayers = players.filter(p => p.chips > 0).length;

    if (nextQuestionIndex >= questions.length || remainingPlayers <= 1) {
      onEndQuiz();
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
      // useEffect sẽ xử lý việc reset state
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {viewState === 'reveal' && (
        <RevealModal 
          results={results} 
          correctAnswer={currentQuestion.correctAnswer}
          onNextQuestion={handleNextQuestion} 
        />
      )}

      {/* Header: Tiến độ và Trạng thái người chơi */}
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-600 text-center mb-2">
          Câu hỏi {currentQuestionIndex + 1} / {questions.length}
        </p>
        <div className="w-full bg-stone-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-amber-700 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <PlayerStatus 
          players={players} 
          lockedPlayers={lockedPlayers} 
          currentPlayerId={currentPlayer.id} 
        />
      </div>
      
      {/* Câu hỏi và Lượt */}
      <h3 className="text-xl font-semibold text-center text-amber-900 mb-4">
        Lượt của: {currentPlayer.name}
      </h3>
      <h2 className="text-2xl font-semibold text-stone-900 mb-6 text-center leading-relaxed">
        {currentQuestion.question}
      </h2>
      
      {/* Đặt cược */}
      <div className="flex items-center gap-3 max-w-sm mx-auto mb-6">
        <label htmlFor="bet" className="font-medium text-stone-700">
          <DollarSign className="mr-1 h-5 w-5 inline-block" />
          Đặt cược:
        </label>
        <input
          id="bet"
          type="number"
          value={currentBet}
          onChange={handleBetChange}
          min="1"
          max={currentPlayer.chips}
          className="w-full p-2 border border-stone-300 rounded-md text-lg font-bold"
        />
      </div>

      {/* Các lựa chọn */}
      <div className="space-y-3">
        {currentQuestion.answerOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option.text)}
            className={`w-full text-left p-4 rounded-lg border-2
                       transition-all duration-200 transform 
                       ${currentAnswer === option.text
                         ? 'bg-amber-200 border-amber-500 shadow-md scale-105'
                         : 'bg-stone-50 border-stone-200 hover:bg-amber-100 hover:border-amber-400'
                       }`}
          >
            <span className="text-base text-stone-800">{String.fromCharCode(65 + index)}. </span>
            <span className="text-base text-stone-800">{option.text}</span>
          </button>
        ))}
      </div>

      {/* Nút Chốt */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLockIn}
          disabled={!currentAnswer}
          className="px-10 py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700
                     disabled:bg-stone-400 disabled:cursor-not-allowed"
        >
          <Lock className="mr-2 h-5 w-5 inline-block" />
          Chốt!
        </button>
      </div>
    </div>
  );
};

export default QuizActive;