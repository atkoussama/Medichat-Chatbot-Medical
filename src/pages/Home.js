import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 text-white py-24 px-4 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-white opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-indigo-300 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-1/4 w-48 h-48 rounded-full bg-blue-300 opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-20 blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 mb-16 md:mb-0">
            <div className="bg-blue-800/30 backdrop-blur-sm px-6 py-2 rounded-full inline-block mb-4 animate-fade-in">
              <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered Healthcare</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              <span className="block">Your AI</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Medical Assistant</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-lg leading-relaxed">
              Get preliminary medical consultations, health information, and guidance from our advanced AI system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={isAuthenticated() ? "/chat" : "/login"} 
                className="inline-flex items-center justify-center bg-white text-blue-700 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:bg-blue-50"
              >
                <span>{isAuthenticated() ? "Start Your Consultation" : "Login to Chat"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <Link 
                to="/#features" 
                className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white font-semibold py-4 px-8 rounded-lg transition duration-300 hover:bg-white/10"
              >
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/25.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="User" className="h-10 w-10 rounded-full border-2 border-white" />
              </div>
              <div className="ml-4">
                <span className="text-sm font-medium">Trusted by</span>
                <span className="block text-lg font-bold">10,000+ users</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              {/* Main circular graphic */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                {/* Pulsing ring */}
                <div className="absolute -inset-4 rounded-full border-4 border-white/20 animate-pulse"></div>
                
                {/* Inner glowing circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/40 to-blue-300/40 flex items-center justify-center shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 md:h-40 md:w-40 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-400/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg rotate-12 animate-float">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-indigo-500/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg -rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 left-0 w-14 h-14 bg-blue-300/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave shape divider at the bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">
                Communicate in English, French, or Arabic with full interface localization and RTL support.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Voice Interaction</h3>
              <p className="text-gray-600">
                Speak to our AI and listen to responses with natural text-to-speech in your preferred language.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Advanced AI</h3>
              <p className="text-gray-600">
                Powered by state-of-the-art language models trained on medical information for accurate guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Get reliable medical information in three simple steps
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center max-w-xs mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Your Language</h3>
              <p className="text-gray-600 text-center">
                Select from English, French, or Arabic for your consultation experience.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center max-w-xs mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Describe Your Concerns</h3>
              <p className="text-gray-600 text-center">
                Type or speak your medical questions or symptoms to our AI doctor.
              </p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Get AI Guidance</h3>
              <p className="text-gray-600 text-center">
                Receive preliminary medical information and guidance based on your concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="w-full py-10 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="border-l-4 border-yellow-500 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important Disclaimer
            </h3>
            <p className="text-gray-700">
              This AI medical assistant provides preliminary information only and is not a replacement for professional medical advice. 
              Always consult with qualified healthcare professionals for diagnosis and treatment recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Begin Your Consultation?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Get immediate medical guidance from our AI assistant with just a few clicks.
          </p>
          <Link 
            to={isAuthenticated() ? "/chat" : "/login"} 
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            {isAuthenticated() ? "Start Chatting Now" : "Login to Chat"}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 