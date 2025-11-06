import React, { useState, useMemo } from 'react';
import QuizSetup from '../flashcard/QuizSetup';
import QuizActive from '../flashcard/QuizActive';
import QuizResults from '../flashcard/QuizResult';
import { Package } from 'lucide-react';
import { FLASHCARD_DATA } from '../../data';

// ... (Hàm shuffleArray và generateQuizSet không đổi) ...
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const generateQuizSet = (fullData, numQuestions) => {
  const shuffledData = shuffleArray([...fullData]);
  const selectedQuestions = shuffledData.slice(0, Math.min(numQuestions, shuffledData.length)); 

  return selectedQuestions.map((item, index) => {
    const shuffledOptions = shuffleArray([...item.options]);
    const cleanedQuestion = item.question.replace(/^Câu \d+\. /, '');

    return {
      questionNumber: index + 1,
      question: cleanedQuestion,
      answerOptions: shuffledOptions,
      correctAnswer: item.correctAnswer,
    };
  });
};


const FlashcardQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizState, setQuizState] = useState('setup'); // 'setup', 'active', 'results'
  const [players, setPlayers] = useState([]);
  const [minBet, setMinBet] = useState(10);
  const [maxBet, setMaxBet] = useState(50);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  const handleStartQuiz = (initialPlayers, numQuestions, newMinBet, newMaxBet, newTimePerQuestion) => {
    const newQuizSet = generateQuizSet(FLASHCARD_DATA, numQuestions); 
    
    if (newQuizSet.length === 0) {
        alert("Không thể tạo quiz. File data không có đủ câu hỏi.");
        return;
    }

    setQuizQuestions(newQuizSet);
    setPlayers(initialPlayers);
    setMinBet(newMinBet);
    setMaxBet(newMaxBet);
    setTimePerQuestion(newTimePerQuestion);
    setQuizState('active');
  };

  const handleEndQuiz = () => {
    setQuizState('results');
  };

  const handleNewGame = () => {
    setQuizQuestions([]);
    setPlayers([]);
    setQuizState('setup');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'active':
        return (
          <QuizActive 
            questions={quizQuestions} 
            players={players}
            setPlayers={setPlayers}
            onEndQuiz={handleEndQuiz} 
            minBet={minBet}
            maxBet={maxBet}
            timePerQuestion={timePerQuestion}
          />
        );
      case 'results':
        return (
          <QuizResults 
            players={players}
            questions={quizQuestions}
            onNewSet={handleNewGame}
          />
        );
      case 'setup':
      default:
        return (
          <QuizSetup 
            onStartQuiz={handleStartQuiz} 
            maxQuestions={FLASHCARD_DATA.length}
          />
        );
    }
  };

  // *** CẬP NHẬT: Đảm bảo giao diện Sáng 100% ***
  const containerClass = quizState === 'active'
    ? "w-full max-w-7xl mx-auto bg-stone-50 p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn" // Nền sáng (stone-50)
    : "w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn";
  
  const titleClass = "text-amber-900"; // Luôn là màu tối

  return (
    <div className={containerClass}>
      {quizState !== 'active' && (
        <div className="flex items-center justify-center text-center text-stone-600 mb-6">
          <Package className={`h-10 w-10 ${titleClass}`} />
          <h2 className={`text-3xl font-bold font-serif ml-3 ${titleClass}`}>Quiz Đặt Cược</h2>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default FlashcardQuiz;