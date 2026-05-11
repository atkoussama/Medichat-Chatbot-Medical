import React from 'react';

// Format the timestamp based on the selected language
const formatTime = (timestamp, language) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(language.split('-')[0], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Loading animation component
const LoadingIndicator = ({ language }) => {
  const isRTL = language === 'ar-SA';
  return (
    <div className={`flex ${isRTL ? 'justify-start' : 'justify-start'} my-4`}>
      <div 
        className={`max-w-[75%] bg-white border border-gray-200 shadow-sm rounded-lg p-4 ${
          isRTL ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="ml-3 text-gray-600 text-sm">
            {language === 'en-US' ? 'Thinking...' : 
             language === 'fr-FR' ? 'Réflexion en cours...' : 
             'جاري التفكير...'}
          </span>
        </div>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages, language, isLoading }) => {
  const isRTL = language === 'ar-SA';
  
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white border border-gray-200 shadow-sm rounded-bl-none'
            }`}
            data-sender={message.sender}
            dir={isRTL ? 'rtl' : 'ltr'}
            aria-label={message.sender === 'user' ? 'Your message' : 'Doctor\'s response'}
          >
            <div 
              className={`${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}
              data-message-content="true"
              aria-live={message.sender === 'bot' ? 'polite' : 'off'}
            >
              {message.text}
            </div>
            <div
              className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
              } ${isRTL ? 'text-left' : 'text-right'}`}
              aria-label={`Sent at ${formatTime(message.timestamp, language)}`}
            >
              {formatTime(message.timestamp, language)}
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading animation that appears only during API calls */}
      {isLoading && <LoadingIndicator language={language} />}
    </div>
  );
};

export default ChatMessages; 