import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm">
          Một ứng dụng nhỏ dành cho các nhà tư tưởng kinh tế.
        </p>
        <p className="text-xs mt-1"> &copy;{new Date().getFullYear()} Được thiết kế bởi Team Dự Án lớp GD1812
         </p>
      </div>
    </footer>
  );
};

export default Footer;
