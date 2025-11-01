import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

// Helper to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const QuizActive = ({ questions, onSubmit, timeLimit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  // Timer state: timeLimit is in minutes, timeLeft in seconds
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const timerIntervalRef = useRef(null);

  // Mutable ref to hold the latest onSubmit and selectedAnswers for the timer
  // Điều này đảm bảo rằng ngay cả khi hết giờ, nó sẽ gọi hàm onSubmit
  // với state `selectedAnswers` mới nhất, thay vì state lúc interval được tạo.
  const handleSubmitRef = useRef(onSubmit);
  const selectedAnswersRef = useRef(selectedAnswers);

  useEffect(() => {
    handleSubmitRef.current = onSubmit;
    selectedAnswersRef.current = selectedAnswers;
  }, [onSubmit, selectedAnswers]);

  // Timer logic
  useEffect(() => {
    if (timeLimit > 0) { // Chỉ bắt đầu hẹn giờ nếu timeLimit được đặt
      setTimeLeft(timeLimit * 60); // Reset thời gian khi quiz mới bắt đầu
      
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerIntervalRef.current);
            // Hết giờ! Tự động nộp bài.
            // Sử dụng ref để lấy state mới nhất bên trong interval
            handleSubmitRef.current(selectedAnswersRef.current); 
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup interval khi component unmount hoặc khi quiz thay đổi
      return () => clearInterval(timerIntervalRef.current);
    }
  }, [questions, timeLimit]); // Chạy lại nếu 'questions' hoặc 'timeLimit' thay đổi
  
  const currentQuestion = questions[currentQIndex];
  const questionNumber = currentQuestion.questionNumber;
  
  const handleSelectAnswer = (answerText) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionNumber]: answerText,
    });
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmit = () => {
     clearInterval(timerIntervalRef.current); // Dừng đồng hồ khi nộp bài thủ công
     if (Object.keys(selectedAnswers).length < questions.length) {
      if (!confirm("Bạn chưa trả lời hết các câu hỏi. Bạn có chắc muốn nộp bài?")) {
        // Nếu người dùng hủy, khởi động lại đồng hồ
        if(timeLimit > 0) {
           timerIntervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                  if (prevTime <= 1) {
                    clearInterval(timerIntervalRef.current);
                    handleSubmitRef.current(selectedAnswersRef.current); 
                    return 0;
                  }
                  return prevTime - 1;
                });
              }, 1000);
        }
        return;
      }
    }
    onSubmit(selectedAnswers);
  };
  
  const progressPercentage = ((currentQIndex + 1) / questions.length) * 100;
  const isTimeRunningOut = timeLimit > 0 && timeLeft <= 60; // Còn 1 phút

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {/* Header: Tiến độ và Đồng hồ */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-stone-600">
              Câu hỏi {currentQIndex + 1} / {questions.length}
            </p>
            {timeLimit > 0 && (
                <div 
                  className={`flex items-center text-sm font-bold p-1 px-2 rounded
                            ${isTimeRunningOut ? 'text-red-600 animate-pulse' : 'text-stone-700'}`}
                >
                    <Clock className="mr-1 h-4 w-4" />
                    {formatTime(timeLeft)}
                </div>
            )}
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2.5">
          <div 
            className="bg-amber-700 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Câu hỏi */}
      <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 mb-6 text-center leading-relaxed" style={{ minHeight: '6rem' }}>
        {currentQuestion.question}
      </h2>
      
      {/* Các lựa chọn */}
      <div className="space-y-3">
        {currentQuestion.answerOptions.map((option, index) => {
          const isSelected = selectedAnswers[questionNumber] === option.text;
          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option.text)}
              className={`w-full text-left p-4 rounded-lg border-2
                         transition-all duration-200 transform 
                         ${isSelected
                           ? 'bg-amber-200 border-amber-500 shadow-md scale-105'
                           : 'bg-stone-50 border-stone-200 hover:bg-amber-100 hover:border-amber-400'
                         }`}
            >
              <span className="text-base text-stone-800">{String.fromCharCode(65 + index)}. </span>
              <span className="text-base text-stone-800">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Điều hướng */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrev}
          disabled={currentQIndex === 0}
          className="px-6 py-2 bg-stone-200 text-stone-700 font-medium rounded-lg hover:bg-stone-300 disabled:opacity-50"
        >
          Trước
        </button>
        
        {currentQIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700"
          >
            Nộp bài
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900"
          >
            Tiếp
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizActive;