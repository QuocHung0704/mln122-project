import React, { useState } from 'react'; // Import useState
import { BarChart2, RotateCcw, Settings, List, ChevronDown, ChevronUp } from 'lucide-react'; // Import icons

const QuizResults = ({ score, total, onRestart, onNewSet, questions }) => { // Thêm 'questions' prop
  const [showAnswers, setShowAnswers] = useState(false); // Thêm state để bật/tắt đáp án

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  let feedback = "Hãy cố gắng hơn nhé!";
  if (percentage >= 90) {
      feedback = "Tuyệt vời! Bạn thật xuất sắc!";
  } else if (percentage >= 70) {
      feedback = "Làm tốt lắm! Bạn đã nắm vững kiến thức.";
  } else if (percentage >= 50) {
      feedback = "Khá tốt! Cố gắng thêm chút nữa nhé.";
  }

  return (
    <div className="flex flex-col items-center text-center animate-fadeIn">
      <BarChart2 className="h-16 w-16 text-amber-800 mb-4" />
      <h3 className="text-3xl font-bold font-serif text-amber-900 mb-2">Hoàn thành!</h3>
      <p className="text-xl text-stone-800 font-semibold">
        Kết quả của bạn: {score} / {total} ({percentage}%)
      </p>
      <p className="text-lg text-stone-600 mt-2 italic">{feedback}</p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
        <button
          onClick={onNewSet} // Nút này quay về màn hình setup
          className="w-full flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <Settings className="mr-2 h-5 w-5" />
          Tùy chỉnh quiz
        </button>
        <button
          onClick={onRestart} // Nút này làm lại BỘ CÂU HỎI HIỆN TẠI
          className="w-full flex-1 flex items-center justify-center px-6 py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-all duration-300"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Làm lại đề này
        </button>
      </div>

      {/* *** KHU VỰC MỚI: HIỂN THỊ ĐÁP ÁN *** */}
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