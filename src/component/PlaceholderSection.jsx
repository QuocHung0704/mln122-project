import React from 'react';
import { Package } from 'lucide-react';

const PlaceholderSection = ({ title }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center text-center text-stone-600">
        <Package className="h-16 w-16 text-stone-400 mb-4" />
        <h2 className="text-2xl font-semibold text-stone-800 mb-2">{title}</h2>
        <p className="text-base">Nội dung cho mục này sẽ sớm được cập nhật.</p>
        <p className="text-sm mt-1">Vui lòng quay lại sau!</p>
      </div>
    </div>
  );
};

export default PlaceholderSection;