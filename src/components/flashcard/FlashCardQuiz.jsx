import React, { useState, useMemo } from 'react';
import QuizSetup from '../flashcard/QuizSetup';
import QuizActive from '../flashcard/QuizActive';
import QuizResults from '../flashcard/QuizResult';
import { Package } from 'lucide-react';
import { FLASHCARD_DATA } from '../../data'; // IMPORT DỮ LIỆU

// Helper function to shuffle an array
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

// *** HÀM ĐÃ ĐƯỢC CẬP NHẬT ***
// Helper function to generate quiz questions from the imported data
const generateQuizSet = (fullData, numQuestions) => { // Chấp nhận numQuestions
  const shuffledData = shuffleArray([...fullData]);
  // Sử dụng numQuestions thay vì hardcode
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
  const [players, setPlayers] = useState([]); // State mới: [ { id, name, chips }, ... ]

  // *** HÀM ĐÃ ĐƯỢC CẬP NHẬT ***
  const handleStartQuiz = (initialPlayers, numQuestions) => { // Chấp nhận numQuestions
    // Truyền numQuestions vào hàm generator
    const newQuizSet = generateQuizSet(FLASHCARD_DATA, numQuestions); 
    
    if (newQuizSet.length === 0) {
        alert("Không thể tạo quiz. File data không có đủ câu hỏi.");
        return;
    }

    setQuizQuestions(newQuizSet);
    setPlayers(initialPlayers);
    setQuizState('active');
  };

  const handleEndQuiz = () => {
    setQuizState('results');
  };

  const handleNewGame = () => { // Quay về setup
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
            setPlayers={setPlayers} // Truyền hàm setPlayers
            onEndQuiz={handleEndQuiz} 
          />
        );
      case 'results':
        return (
          <QuizResults 
            players={players}
            questions={quizQuestions} // Truyền câu hỏi để xem đáp án
            onNewSet={handleNewGame} // "Cài đặt mới"
          />
        );
      case 'setup':
      default:
        return (
          // *** PROP ĐÃ ĐƯỢC CẬP NHẬT ***
          <QuizSetup 
            onStartQuiz={handleStartQuiz} 
            maxQuestions={FLASHCARD_DATA.length} // Truyền số câu hỏi tối đa
          />
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn">
      <div className="flex items-center justify-center text-center text-stone-600 mb-6">
        <Package className="h-10 w-10 text-amber-800" />
        <h2 className="text-3xl font-bold font-serif text-amber-900 ml-3">Quiz Đặt Cược</h2>
      </div>
      {renderContent()}
    </div>
  );
};

export default FlashcardQuiz;