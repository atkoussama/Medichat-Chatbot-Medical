import React, { useState } from 'react';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
    { code: 'ar-SA', label: 'العربية', flag: '🇸🇦' }
  ];

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
          disabled 
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        disabled={disabled}
      >
        <span className="text-xl">{selectedLang.flag}</span>
        <span>{selectedLang.label}</span>
        {!disabled && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelect(language.code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  selectedLanguage === language.code
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                } flex items-center space-x-2`}
                role="menuitem"
              >
                <span className="text-xl">{language.flag}</span>
                <span>{language.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 