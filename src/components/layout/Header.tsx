import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainNavItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'عن القبول العالمي', path: '/about' },
  ];

  const resourcesNavItems = [
    { name: 'الأدوات', path: '/tools' },
    { name: 'المصادر', path: '/resources' },
    { name: 'تعلم', path: '/learn' },
  ];

  const secondaryNavItems = [
    { name: 'اشترك', path: '/subscribe' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-primary-700 font-bold text-xl">
            <img src="/1024U.png" alt="القبول العالمي" className="w-6 h-6" />
            <span className='text-sm md:text-base lg:text-lg'>بوابة القبول العالمي</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 mr-4">
            {/* Main Navigation Items */}
            <div className="flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-base font-medium transition-colors hover:text-primary-600 ${isActive ? 'text-primary-600' : 'text-gray-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Resources Navigation Items */}
            <div className="flex items-center space-x-1 mx-4 border-r border-l border-gray-200 px-4">
              {resourcesNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-base font-medium transition-colors hover:text-primary-600 ${isActive ? 'text-primary-600' : 'text-gray-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Secondary Navigation Items */}
            <div className="flex items-center space-x-1">
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-base font-medium transition-colors hover:text-primary-600 ${isActive ? 'text-primary-600' : 'text-gray-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  {/* Display the user's name if available, otherwise their email */}
                  <span className="text-gray-700 font-medium">
                    {user.fullname ? user.fullname : user.email}
                  </span>
                  {/* Logout button */}
                  <Button onClick={logout} variant="outline" size="sm">
                    خروج
                  </Button>
                </>
              ) : (
                <>
                  {/* If no user is logged in, show Login and Signup buttons */}
                  <Button to="/login" variant="outline" size="sm">
                    تسجيل الدخول
                  </Button>
                  <Button to="/signup" variant="primary" size="sm">
                    إنشاء حساب
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <span className="text-gray-700 mr-4">{user.fullname || user.email}</span>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary-600 ml-4">تسجيل الدخول</Link>
            )}
            <button
              className="text-gray-700 hover:text-primary-600 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {mainNavItems.concat(resourcesNavItems, secondaryNavItems).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 text-base font-medium transition-colors hover:text-primary-600 hover:bg-gray-50 rounded-md ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button to="/signup" variant="primary" className="w-full mb-2">إنشاء حساب</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;