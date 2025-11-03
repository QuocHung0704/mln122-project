import React, { useState } from 'react';
import { Award, Settings, List, ChevronDown, ChevronUp } from 'lucide-react';

const QuizResults = ({ players, questions, onNewSet }) => {
  const [showAnswers, setShowAnswers] = useState(false); // Thêm state
  const sortedPlayers = [...players].sort((a, b) => b.chips - a.chips);
  const winner = sortedPlayers[0];

  return (
    <div className="flex flex-col items-center text-center animate-fadeIn">
      <Award className="h-16 w-16 text-amber-800 mb-4" />
      <h3 className="text-3xl font-bold font-serif text-amber-900 mb-2">Kết Thúc!</h3>
      
      {/* Người thắng cuộc */}
      <div className="w-full bg-amber-100 border-2 border-amber-400 p-4 rounded-lg my-4">
        <p className="text-sm font-semibold text-amber-800">NGƯỜI CHIẾN THẮNG</p>
        <h4 className="text-2xl font-bold text-amber-900">{winner.name}</h4>
        <p className="text-xl font-semibold text-green-700">${winner.chips}</p>
      </div>

      {/* Bảng xếp hạng */}
      <div className="w-full max-w-md space-y-3 mt-4">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-200"
          >
            <span className="text-lg font-bold text-stone-800">
              #{index + 1} {player.name}
            </span>
            <span className="text-lg font-semibold text-stone-700">
              ${player.chips}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={onNewSet} // Nút này quay về màn hình setup
          className="w-full flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <Settings className="mr-2 h-5 w-5" />
          Tạo Game Mới
        </button>
      </div>

      {/* *** KHU VỰC: HIỂN THỊ ĐÁP ÁN *** */}
      <div className="w-full mt-6 border-t border-stone-200 pt-6">
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="w-full flex items-center justify-center px-4 py-2 bg-stone-100 text-stone-700 font-semibold rounded-lg hover:bg-stone-200 transition-colors"
        >
          <List className="mr-2 h-5 w-5" />
          {showAnswers ? 'Ẩn đáp án' : 'Xem đáp án bộ câu hỏi này'}
          {showAnswers ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
        </button>

        {showAnswers && (
          <div className="mt-4 text-left space-y-4 max-h-60 overflow-y-auto pr-2">
            {questions
                .sort((a, b) => a.questionNumber - b.questionNumber) // Sắp xếp lại theo thứ tự 1, 2, 3...
                .map((q) => (
              <div key={q.questionNumber} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <p className="text-sm font-semibold text-stone-800">
                  {q.questionNumber}. {q.question}
                </p>
                <p className="text-sm text-green-700 font-bold mt-1">
                  Đáp án: {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* *** KẾT THÚC KHU VỰC MỚI *** */}

    </div>
  );
};

export default QuizResults;