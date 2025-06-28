import React, { useState } from 'react';
import { Menu, X, User, Globe, ChevronDown } from 'lucide-react';
import { languages } from '../data/languages';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

interface HeaderProps {
  onNavigateToAssessments: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToAssessments }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const menuItems = [
    { key: 'home', href: '#home', onClick: () => {} },
    { key: 'assessments', href: '#assessments', onClick: onNavigateToAssessments },
    { key: 'progress', href: '#progress', onClick: () => {} },
    { key: 'reports', href: '#reports', onClick: () => {} },
    { key: 'professionalServices', href: '#professional', onClick: () => {} },
    { key: 'resources', href: '#resources', onClick: () => {} },
    { key: 'help', href: '#help', onClick: () => {} }
  ];

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SA</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Student Assessment</h1>
                <p className="text-xs text-gray-600">Assessment Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={item.onClick}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {t(item.key)}
                </button>
              ))}
            </nav>

            {/* Language Selector & User Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {languages.find(lang => lang.code === currentLanguage)?.shortName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          currentLanguage === lang.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Actions */}
              <div className="hidden sm:flex items-center space-x-2">
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsUserProfileOpen(true)}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{user.firstName}</p>
                        <p className="text-xs text-gray-600">Grade {user.grade}</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      {t('login')}
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {t('register')}
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-2 py-1 text-left"
                  >
                    {t(item.key)}
                  </button>
                ))}
                
                {/* Mobile Auth Buttons */}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsMenuOpen(false);
                      }}
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 px-2 py-1 text-left"
                    >
                      {t('login')}
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full"
                    >
                      {t('register')}
                    </button>
                  </div>
                )}

                {/* Mobile User Profile */}
                {isAuthenticated && user && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setIsUserProfileOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-2 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-600">Grade {user.grade} • View Profile</p>
                      </div>
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* User Profile Modal */}
      <UserProfile
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </>
  );
};

export default Header;