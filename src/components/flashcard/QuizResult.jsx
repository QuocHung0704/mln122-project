import React from 'react';
import { BarChart2, RotateCcw, Settings } from 'lucide-react'; // Thay FilePlus bằng Settings

const QuizResults = ({ score, total, onRestart, onNewSet }) => {
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
          Cài đặt mới
        </button>
        <button
          onClick={onRestart} // Nút này làm lại BỘ CÂU HỎI HIỆN TẠI
          className="w-full flex-1 flex items-center justify-center px-6 py-3 bg-amber-800 text-white font-bold rounded-lg shadow-md hover:bg-amber-900 transition-all duration-300"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Làm lại bộ này
        </button>
      </div>
    </div>
  );
};

export default QuizResults;