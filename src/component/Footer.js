import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="text-blue-400 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">MediChat</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Your AI-powered medical assistant for preliminary health information.
            </p>
          </div>

          {/* Meet the Team */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Meet the Team</h3>
            <p className="text-gray-400 font-semibold">Oussama AIT ELKABIR</p>
            <p className="text-gray-400 font-semibold">Mohamed SAADAT</p>
          </div>

          {/* Our LinkedIn */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Our LinkedIn</h3>
            <p>
              <a
                href="https://www.linkedin.com/in/oussama-ait-elkabir-50027a321/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline block"
              >
                Oussama AIT ELKABIR
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-saadat-216076335/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline block"
              >
                Mohamed SAADAT
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition-colors">Chat</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400">support@medichat.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400">+212535355454</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400">ENSIAS, AL IRFANE<br />RABAT</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {currentYear} MediChat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;