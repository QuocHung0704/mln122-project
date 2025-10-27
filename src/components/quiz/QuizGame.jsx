import React, { useState } from 'react';
import { RotateCcw, BarChart2 } from 'lucide-react';
import { quizData, resultsData, initialScores } from './QuizData';

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerClick = (scoreKey) => {
    setScores(prevScores => ({
      ...prevScores,
      [scoreKey]: prevScores[scoreKey] + 1
    }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores(initialScores);
    setShowResults(false);
  };

  const getFinalResult = () => {
    const finalResultKey = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );
    return resultsData[finalResultKey];
  };

  if (showResults) {
    const result = getFinalResult();
    
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);

    return (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl transition-all duration-500 ease-in-out transform animate-fadeIn">
        <h2 className="text-3xl font-bold font-serif text-center text-amber-900 mb-4">Kết quả của bạn</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={result.img}
            alt={result.name}
            className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg border-4 border-amber-200"
            onError={(e) => e.target.src = 'https://placehold.co/400x500/a0522d/ffffff?text=Image+Error'}
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-stone-800">{result.name}</h3>
            <p className="text-lg font-medium text-amber-800 italic mt-1">{result.title}</p>
            <p className="text-stone-700 mt-4 text-base leading-relaxed">{result.description}</p>
          </div>
        </div>
        
        {/* Nút chơi lại */}
        <button
          onClick={handleRestart}
          className="w-full mt-8 flex items-center justify-center px-6 py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Làm lại trắc nghiệm
        </button>
      </div>
    );
  }

  const { question, options } = quizData[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl transition-all duration-300 ease-in-out animate-fadeIn">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden mb-6 h-40 sm:h-48">
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop" 
          alt="Thư viện tri thức"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white text-center px-4">Bạn là nhà tư tưởng nào?</h1>
        </div>
      </div>

      {/* Tiến độ */}
      <div className="mb-6">
        <p className="text-sm font-medium text-stone-600 mb-2 text-center">
          Câu hỏi {currentQuestion + 1} / {quizData.length}
        </p>
        <div className="w-full bg-stone-200 rounded-full h-2.5">
          <div 
            className="bg-amber-700 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Câu hỏi */}
      <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 mb-6 text-center leading-relaxed">
        {question}
      </h2>
      
      {/* Các lựa chọn */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option.scoreKey)}
            className="w-full text-left p-4 bg-stone-50 rounded-lg border-2 border-stone-200 
                       hover:bg-amber-100 hover:border-amber-400 
                       transition-all duration-200 transform hover:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <span className="text-base text-stone-800">{String.fromCharCode(65 + index)}. </span>
            <span className="text-base text-stone-800">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizGame;
