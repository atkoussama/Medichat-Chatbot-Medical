import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import axios from 'axios'; // Import axios
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import LanguageSelector from '../components/chat/LanguageSelector';
import DoctorAvatarFallback from '../components/chat/DoctorAvatarFallback';
import { useAuth } from '../context/AuthContext';

// Lazy load the 3D avatar component to avoid blocking rendering
const DoctorAvatar = lazy(() => import('../components/chat/DoctorAvatar'));

// --- GROQ Configuration ---
const API_KEY = process.env.REACT_APP_GROQ_API_KEY || 'inserer votre api key';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';

// --- System Prompt Definition ---
const getSystemPrompt = (lang, username) => {
  const prompts = {
    'en-US': `You are an AI medical assistant named MediChat. 
      Your purpose is to provide preliminary medical information and guidance based on user-described symptoms or questions. 
      You should be empathetic, clear, and concise.
      The user's name is ${username}, make sure to address them by name occasionally. 
      Respond in English.`,
    'fr-FR': `Vous êtes un assistant médical IA nommé MediChat. 
      Votre objectif est de fournir des informations et des conseils médicaux préliminaires basés sur les symptômes ou les questions décrits par l'utilisateur. 
      Vous devez être empathique, clair et concis.
      Le nom de l'utilisateur est ${username}, assurez-vous de vous adresser à lui par son nom de temps en temps. 
      Répondez en Français.`,
    'ar-SA': `أنت مساعد طبي ذكاء اصطناعي اسمك MediChat. 
      هدفك هو تقديم معلومات وإرشادات طبية أولية بناءً على الأعراض أو الأسئلة التي يصفها المستخدم. 
      يجب أن تكون متعاطفًا وواضحًا وموجزًا.
      اسم المستخدم هو ${username}، تأكد من مخاطبته باسمه من وقت لآخر.
      الرد باللغة العربية.`
  };
  return prompts[lang] || prompts['en-US']; // Default to English
};

const ChatPage = () => {
  // Get authenticated user
  const { currentUser } = useAuth();
  
  // Language state
  const [language, setLanguage] = useState(currentUser?.language || 'en-US');
  const [languageLocked, setLanguageLocked] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [use3DAvatar, setUse3DAvatar] = useState(true);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  
  // Refs
  const chatContainerRef = useRef(null);

  // Check Web Speech API compatibility on component mount
  useEffect(() => {
    // Add welcome message
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: `Welcome ${currentUser.name || currentUser.username}! How can I assist you with your health concerns today?`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
    
    // Check for speech synthesis
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
    } else {
      // Initialize speech synthesis
      const checkVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length) {
          console.log('Speech synthesis voices loaded successfully:', 
                     voices.length, 'available');
          
          // Add a global speech synthesis event listener for better debug
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            console.log('Voices changed, now available:', 
                        window.speechSynthesis.getVoices().length);
          });
          
          // Add browser-specific speech synthesis polyfills and fixes
          if (typeof window.SpeechSynthesisUtterance === 'undefined') {
            console.warn('SpeechSynthesisUtterance not supported in this browser');
          }
        }
      };
      
      if (window.speechSynthesis.getVoices().length) {
        checkVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = checkVoices;
      }
    }
    
    // Clean up speech synthesis if the component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentUser.username, messages.length]);
  
  // Monitor speaking state changes for debugging
  useEffect(() => {
    console.log(`Speaking state in ChatPage changed to: ${isSpeaking ? 'speaking' : 'not speaking'}`);
  }, [isSpeaking]);

  // Handle errors with the 3D avatar
  useEffect(() => {
    const handleError = () => {
      console.warn('Error detected with 3D avatar, falling back to 2D');
      setUse3DAvatar(false);
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    if (!languageLocked) {
      setLanguage(newLanguage);
    }
  };

  // Send message handler - Updated with API call
  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoadingResponse) return;

    // Lock language after first message
    if (!languageLocked) {
      setLanguageLocked(true);
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    // Prepare message history for API, including the new user message
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoadingResponse(true); // Start loading indicator
    
    // Format messages for the API
    const apiMessages = currentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));
    
    // Define the system prompt based on language, including username
    const systemPrompt = { 
      role: 'system', 
      content: getSystemPrompt(language, currentUser.username) 
    };

    try {
      const response = await axios.post(
        API_URL,
        {
          model: MODEL,
          messages: [systemPrompt, ...apiMessages], // Include system prompt and history
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.href, 
            'X-Title': 'MediChat AI Assistant', 
          },
        }
      );

      let botReplyText = "Sorry, I couldn't get a response. Please try again."; // Default error message
      if (response.data?.choices?.length > 0) {
          botReplyText = response.data.choices[0].message?.content.trim() || botReplyText;
      }
      
      // Add bot response without removing any loading message (since we're not using one)
      const botResponse = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      // Add an error message to the chat without removing a loading message
      const errorResponse = {
        id: Date.now() + 1,
        text: `Error: ${error.response?.data?.error?.message || error.message || 'Failed to get response from AI.'} Please check your API key and connection.`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoadingResponse(false); // Stop loading indicator
    }
  };

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle language change from profile
  useEffect(() => {
    setLanguage(currentUser?.language || 'en-US');
  }, [currentUser?.language]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] bg-gray-50">
      {/* Doctor Avatar Section */}
      <div className="lg:w-1/3 h-64 lg:h-full bg-blue-50 relative">
        {use3DAvatar ? (
          <Suspense fallback={<DoctorAvatarFallback isSpeaking={isSpeaking} />}>
            <DoctorAvatar isSpeaking={isSpeaking} />
          </Suspense>
        ) : (
          <DoctorAvatarFallback isSpeaking={isSpeaking} />
        )}
      </div>
      
      {/* Chat Section */}
      <div className="lg:w-2/3 flex flex-col h-full lg:h-auto flex-grow">
        {/* Language and Header Section */}
        <div className="bg-white p-4 shadow-sm border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Medical Consultation</h2>
              <p className="text-sm text-gray-600">Welcome, {currentUser.name || currentUser.username}</p>
            </div>
            <LanguageSelector 
              selectedLanguage={language}
              onLanguageChange={handleLanguageChange}
              disabled={languageLocked}
            />
          </div>
          {languageLocked && (
            <p className="text-sm text-gray-500 mt-2">
              {language === 'en-US' && "Language locked for this chat session"}
              {language === 'fr-FR' && "Langue verrouillée pour cette session de chat"}
              {language === 'ar-SA' && "اللغة مؤمنة لجلسة الدردشة هذه"}
            </p>
          )}
        </div>
        
        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-4"
          style={{ direction: language === 'ar-SA' ? 'rtl' : 'ltr' }}
        >
          <ChatMessages 
            messages={messages} 
            language={language} 
            isLoading={isLoadingResponse} 
          />
        </div>
        
        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            language={language}
            setIsSpeaking={setIsSpeaking}
            isSpeaking={isSpeaking}
            isLoading={isLoadingResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
