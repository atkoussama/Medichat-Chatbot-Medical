import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-blue-600/90 to-indigo-700/90 backdrop-blur-sm py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white">MediChat</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/" 
              className={`font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-white font-bold border-b-2 border-white' 
                  : 'text-white hover:text-blue-100'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated() && (
            <>
              <Link
                to="/chat" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/chat') 
                    ? 'text-white font-bold border-b-2 border-white' 
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Chat
              </Link>

              <Link
                to="/news"
                className={`font-medium transition-colors duration-200 ${
                  isActive('/news') 
                    ? 'text-white font-bold border-b-2 border-white' 
                    : 'text-white hover:text-blue-100'
                }`}
              >
                News
              </Link>

              <Link
                to="/profile"
                className={`font-medium transition-colors duration-200 ${
                  isActive('/profile')
                    ? 'text-white font-bold border-b-2 border-white'
                    : 'text-white hover:text-blue-100'
                }`}
              >
                Profil
              </Link>
            </>
          )}

            
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  Welcome, {currentUser.name || currentUser.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="font-medium transition-colors duration-200 text-white hover:text-blue-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3 bg-white rounded-lg shadow-lg p-4">
              <Link 
                to="/" 
                className={`font-medium px-4 py-2 rounded ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {isAuthenticated() && (
                <Link 
                  to="/chat" 
                  className={`font-medium px-4 py-2 rounded ${isActive('/chat') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Chat
                </Link>
              )}
              
              {isAuthenticated() && (
                <>
                  <Link 
                    to="/profile" 
                    className={`font-medium px-4 py-2 rounded ${isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profil
                  </Link>
                </>
              )}
              
              {isAuthenticated() ? (
                <>
                  <div className="px-4 py-1 text-gray-600">
                    Welcome, {currentUser.name || currentUser.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="font-medium px-4 py-2 rounded bg-blue-600 text-white text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="font-medium px-4 py-2 rounded text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="font-medium px-4 py-2 rounded bg-blue-600 text-white text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;