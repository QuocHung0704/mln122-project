
import { Library, ClipboardList, Package, Link } from 'lucide-react';

const Header = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'quiz', label: 'Trắc Nghiệm Tư Tưởng', icon: ClipboardList },
    { id: 'section2', label: 'Mục 2', icon: Package },
    { id: 'section3', label: 'Mục 3', icon: Package },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Tiêu đề trang */}
          <a href="QuizGame">
          <div className="flex-shrink-0 flex items-center">           
            <Library className="h-8 w-8 text-amber-900" />
            <span className="ml-2 text-xl sm:text-2xl font-bold font-serif text-amber-900">
              Triết Học Kinh Tế
            </span>
          </div>
          </a>

          {/* Các nút điều hướng */}
          <div className="hidden sm:flex sm:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${activeSection === item.id
                    ? 'bg-amber-800 text-white'
                    : 'text-stone-600 hover:bg-amber-100 hover:text-amber-900'
                  }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Menu cho di động (dùng select) */}
          <div className="sm:hidden">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-amber-800 focus:border-amber-800 rounded-md bg-stone-50"
            >
              {navItems.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
