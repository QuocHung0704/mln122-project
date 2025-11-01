import React, { useState } from 'react';
import { Settings, Play, Clock } from 'lucide-react'; // Bỏ Upload, thêm Clock

const QuizSetup = ({ onStartQuiz, maxQuestions }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(5); // 0 for unlimited, default 5 mins

  const handleStart = () => {
    if (maxQuestions < 4) {
      alert("Không đủ dữ liệu (cần ít nhất 4 thẻ) để tạo quiz.");
      return;
    }
    onStartQuiz(numQuestions, timeLimit);
  };

  return (
    <div className="space-y-6">
      
      <h3 className="text-xl font-semibold flex items-center mb-2 text-center justify-center">
        <Settings className="mr-2 h-6 w-6" />
        Tùy Chỉnh Quiz
      </h3>

      {/* Tùy chỉnh số câu hỏi */}
      <div className="w-full sm:w-2/3 mx-auto">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-stone-700 mb-1">
          Số lượng câu hỏi
        </label>
        <input
          id="numQuestions"
          type="number"
          min="1"
          max={maxQuestions || 1}
          value={numQuestions > maxQuestions ? maxQuestions : numQuestions}
          onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full p-2 border border-stone-300 rounded-md"
          disabled={maxQuestions === 0}
        />
      </div>

      {/* Tùy chỉnh thời gian */}
      <div className="w-full sm:w-2/3 mx-auto">
        <label htmlFor="timeLimit" className="block text-sm font-medium text-stone-700 mb-1">
          <Clock className="mr-1 h-4 w-4 inline-block" />
          Thời gian hoàn thành
        </label>
        <select
          id="timeLimit"
          className="w-full p-2 border border-stone-300 rounded-md"
          value={timeLimit}
          onChange={(e) => setTimeLimit(parseInt(e.target.value))}
        >
          <option value={5}>5 phút</option>
          <option value={10}>10 phút</option>
          <option value={15}>15 phút</option>
          <option value={30}>30 phút</option>
          <option value={0}>Không giới hạn</option>
        </select>
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