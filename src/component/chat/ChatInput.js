import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, language, setIsSpeaking, isLoading, isSpeaking }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [lastBotMessage, setLastBotMessage] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0); // Default speech rate
  const [audioUrl, setAudioUrl] = useState(null); // For API TTS audio
  const textareaRef = useRef(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      speechRecognition?.stop();
      setIsListening(false);
    } else {
      speechRecognition?.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    let currentBotMessages = [];
    
    const checkForBotMessages = () => {
      const botMessageElements = document.querySelectorAll('[data-sender="bot"]');
      if (botMessageElements.length > 0) {
        const lastElement = botMessageElements[botMessageElements.length - 1];
        // Only get the message text, not the timestamp
        const messageTextElement = lastElement.querySelector('.message-text');
        const messageText = messageTextElement ? messageTextElement.textContent : lastElement.textContent;

        if (botMessageElements.length !== currentBotMessages.length) {
          currentBotMessages = Array.from(botMessageElements);
          setLastBotMessage(messageText);

          if (autoSpeak) {
            setTimeout(() => speakText(messageText), 300);
          }
        }
      }
    };

    checkForBotMessages();
    
    const observer = new MutationObserver(checkForBotMessages);
    const chatContainer = document.querySelector('.overflow-y-auto');
    
    if (chatContainer) {
      observer.observe(chatContainer, { 
        childList: true, 
        subtree: true 
      });
    }
    
    return () => observer.disconnect();
  }, [autoSpeak]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log('Speech cancelled by user');
    }
  };

  // Remplace la fonction speakText par une version compatible API TTS (exemple ElevenLabs)
  const speakText = async (textToSpeak) => {
    let textContent = textToSpeak || lastBotMessage;
    if (!textContent) return;

    textContent = textContent.replace(/\b\d{1,2}:\d{2}(?:\s?[AP]M)?\b/gi, '').trim();

    setIsSpeaking(true);
    setAudioUrl(null);

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pqHfZKP75CvOlQylNhV4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_907bbbd6bd84cddf431b80ebf4f8cd78f4c42f0f7af161e8',
        },
        body: JSON.stringify({
          text: textContent,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.5 }
        }),
      });

      // Affiche le status et la réponse brute pour debug
      console.log('Status:', response.status);
      const debugText = await response.clone().text();
      console.log('API Response:', debugText);

      if (!response.ok) throw new Error('TTS API error: ' + debugText);

      // Si la réponse est un fichier audio (blob)
      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));

    } catch (err) {
      setIsSpeaking(false);
      alert('Text-to-speech failed.\n' + (err.message || err));
    }
  };

  const toggleAutoSpeak = () => {
    setAutoSpeak(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      // Ajoute ceci pour arrêter le micro après envoi
      if (isListening && speechRecognition) {
        speechRecognition.stop();
        setIsListening(false);
      }
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const testSpeech = () => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          const voices = window.speechSynthesis.getVoices();
          const simpleTest = new SpeechSynthesisUtterance("Testing speech synthesis function.");
          const testVoice = voices.find(v => v.lang === 'en-US' && v.default) || voices.find(v => v.lang === 'en-US');
          if(testVoice) simpleTest.voice = testVoice;
          
          simpleTest.onstart = () => console.log("Test speech started.");
          simpleTest.onend = () => console.log("Test speech completed successfully.");
          simpleTest.onerror = (e) => console.error("Test speech failed:", e.error);

          console.log(`Speech synthesis available. Voices: ${voices.length}`);
          console.log(`Default language: ${language}`);
          window.speechSynthesis.speak(simpleTest);
          alert("Testing speech... Check if you can hear anything.");
        }, 200);

      } catch (e) {
        console.error("Speech test error:", e);
        alert("Speech synthesis test failed. See console for details.");
      }
    } else {
      alert("Speech synthesis is not supported in your browser.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <button
            type="button"
            onClick={testSpeech}
            disabled={isLoading}
            className={`text-xs ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-blue-600'} flex items-center mr-3`}
            title="Test speech synthesis"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>
              {language === 'en-US' 
                ? "Test speech" 
                : language === 'fr-FR' 
                  ? "Tester la voix" 
                  : "اختبار الصوت"}
            </span>
          </button>
          
          <button
            type="button"
            onClick={toggleSettings}
            disabled={isLoading}
            className={`text-xs ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:text-blue-600'} flex items-center`}
            title="Voice settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {language === 'en-US' 
                ? "Voice settings" 
                : language === 'fr-FR' 
                  ? "Paramètres vocaux" 
                  : "إعدادات الصوت"}
            </span>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md flex items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>
                {language === 'en-US' 
                  ? "Stop" 
                  : language === 'fr-FR' 
                    ? "Arrêter" 
                    : "توقف"}
              </span>
            </button>
          )}
          
          <label className={`flex items-center ${isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
            <span className="text-sm text-gray-600 mr-2">
              {language === 'en-US' 
                ? "Auto speak" 
                : language === 'fr-FR' 
                  ? "Auto lecture" 
                  : "نطق تلقائي"}
            </span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={autoSpeak} 
                onChange={toggleAutoSpeak}
                disabled={isLoading}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${autoSpeak ? 'bg-blue-500' : 'bg-gray-300'} ${isLoading ? 'opacity-70' : ''}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${autoSpeak ? 'translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>
      
      {/* Voice Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 p-3 rounded-lg mb-3 border border-gray-200">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {language === 'en-US' 
                ? "Speech Rate" 
                : language === 'fr-FR' 
                  ? "Vitesse de lecture" 
                  : "سرعة الكلام"}
            </label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-xs text-gray-500">
                {language === 'en-US' 
                  ? "Slow" 
                  : language === 'fr-FR' 
                    ? "Lent" 
                    : "بطيء"}
              </span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-xs text-gray-500">
                {language === 'en-US' 
                  ? "Fast" 
                  : language === 'fr-FR' 
                    ? "Rapide" 
                    : "سريع"}
              </span>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                disabled={isLoading}
              >
                {language === 'en-US' 
                  ? "Reset" 
                  : language === 'fr-FR' 
                    ? "Réinitialiser" 
                    : "إعادة ضبط"}
              </button>
              <span className="text-xs font-medium text-gray-700">
                {speechRate.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={message}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e); // your function to send the message
                setIsSpeaking(false); // or stopListening() if you use a speech lib
              }
            }}
            disabled={isLoading}
            placeholder={
              isLoading 
                ? (language === 'en-US' 
                    ? "Waiting for response..." 
                    : language === 'fr-FR' 
                      ? "En attente de réponse..." 
                      : "في انتظار الرد...")
                : (language === 'en-US' 
                    ? "Type your message..." 
                    : language === 'fr-FR' 
                      ? "Tapez votre message..." 
                      : "اكتب رسالتك...")
            }
            className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none max-h-32 ${
              language === 'ar-SA' ? 'text-right' : 'text-left'
            } ${isLoading ? 'bg-gray-100 text-gray-500' : ''}`}
            dir={language === 'ar-SA' ? 'rtl' : 'ltr'}
          />
          
          <button
            type="button"
            onClick={toggleListening}
            disabled={isLoading || isListening}
            className={`absolute ${language === 'ar-SA' ? 'left-2' : 'right-2'} bottom-3 ${
              isLoading ? 'text-gray-400 cursor-not-allowed' : isListening ? 'text-red-500' : 'text-gray-500 hover:text-blue-600'
            } focus:outline-none transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : !message.trim()
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => speakText()}
          disabled={!lastBotMessage || isLoading}
          className={`p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            !lastBotMessage || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={language === 'en-US' 
            ? "Read aloud" 
            : language === 'fr-FR' 
              ? "Lire à haute voix" 
              : "قراءة بصوت عالٍ"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>
      </form>

      {audioUrl && isSpeaking && (
        <audio
          src={audioUrl}
          autoPlay
          onEnded={() => setIsSpeaking(false)}
          onError={() => setIsSpeaking(false)}
          controls={false}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default ChatInput;
