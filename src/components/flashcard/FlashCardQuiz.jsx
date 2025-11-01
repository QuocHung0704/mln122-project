import React, { useState, useMemo } from 'react';
import QuizSetup from '../flashcard/QuizSetup';
import QuizActive from '../flashcard/QuizActive';
import QuizResults from '../flashcard/QuizResult';
import { Package } from 'lucide-react';
import { FLASHCARD_DATA } from '../../data'; 

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

// Helper function to generate quiz questions from the imported data
const generateQuizSet = (fullData, numQuestions) => {
  // 1. Shuffle the entire question bank
  const shuffledData = shuffleArray([...fullData]);
  
  // 2. Select the number of questions the user wants
  const selectedQuestions = shuffledData.slice(0, Math.min(numQuestions, shuffledData.length));

  // 3. Format them for the quiz
  return selectedQuestions.map((item, index) => {
    // Shuffle the options (A, B, C, D) for each question
    const shuffledOptions = shuffleArray([...item.options]);
    
    return {
      questionNumber: index + 1,
      question: item.question,
      answerOptions: shuffledOptions, // Dùng các lựa chọn đã được xáo trộn
      correctAnswer: item.correctAnswer, // Đáp án đúng vẫn được giữ nguyên
    };
  });
};


const FlashcardQuiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizState, setQuizState] = useState('setup'); // 'setup', 'active', 'results'
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLimit, setTimeLimit] = useState(5); // 0 for unlimited, default 5 mins

  const handleStartQuiz = (numQuestions, selectedTimeLimit) => {
    // Generate a new set of questions from the main data file
    const newQuizSet = generateQuizSet(FLASHCARD_DATA, numQuestions);
    
    if (newQuizSet.length === 0) {
        alert("Không thể tạo quiz. File data không có đủ câu hỏi.");
        return;
    }

    setQuizQuestions(newQuizSet);
    setTimeLimit(selectedTimeLimit); // Set the time limit
    setUserAnswers({});
    setQuizState('active');
  };

  const handleSubmitQuiz = (answers) => {
    setUserAnswers(answers);
    setQuizState('results');
  };

  const handleRestart = () => { // Goes back to setup
    setQuizQuestions([]);
    setUserAnswers({});
    setQuizState('setup');
  };
  
  const handleRedoQuiz = () => { // Restarts the same quiz
     setUserAnswers({});
     setQuizState('active'); // Re-use the current quizQuestions and timeLimit
  }

  const score = useMemo(() => {
    return quizQuestions.reduce((correctCount, q) => {
      const userAnswer = userAnswers[q.questionNumber];
      if (userAnswer === q.correctAnswer) {
        return correctCount + 1;
      }
      return correctCount;
    }, 0);
  }, [quizQuestions, userAnswers, quizState]);

  const renderContent = () => {
    switch (quizState) {
      case 'active':
        return (
          <QuizActive 
            questions={quizQuestions} 
            onSubmit={handleSubmitQuiz} 
            timeLimit={timeLimit} // Pass timeLimit
          />
        );
      case 'results':
        return (
          <QuizResults 
            score={score} 
            total={quizQuestions.length}
            onRestart={handleRedoQuiz} // "Làm lại bộ này"
            onNewSet={handleRestart} // "Cài đặt mới"
          />
        );
      case 'setup':
      default:
        return (
          <QuizSetup 
            onStartQuiz={handleStartQuiz} 
            maxQuestions={FLASHCARD_DATA.length} // Pass max questions
          />
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn">
      <div className="flex items-center justify-center text-center text-stone-600 mb-6">
        <Package className="h-10 w-10 text-amber-800" />
        <h2 className="text-3xl font-bold font-serif text-amber-900 ml-3">Quiz Luyện Tập</h2>
      </div>
      {renderContent()}
    </div>
  );
};

export default FlashcardQuiz;