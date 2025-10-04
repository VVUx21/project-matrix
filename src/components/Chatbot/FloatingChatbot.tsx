'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useChatbot } from './useChatbot';
import { Message } from './types';
import Image from 'next/image';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isLoading, sendMessage } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const messageToSend = inputMessage;
    setInputMessage('');
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button - only show when closed */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={toggleChatbot}
            className="px-2 py-2 sm:px-4 sm:py-2 transition-all duration-300 transform hover:scale-110 focus:outline-none shadow-[0_0_25px_10px_rgba(125,249,255,0.15)] hover:shadow-[0_0_30px_15px_rgba(125,249,255,0.25)]"
            style={{
              borderRadius: '16px 16px 0 16px',
              border: '1.5px solid #7DF9FF',
              background: '#CB00F0',
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#7DF9FF',
              fontWeight: '600'
            }}
            aria-label="Open chatbot"
          >
            <span 
              className="whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-2xl"
              style={{ 
                fontWeight: '700'
              }}
            >
              Ask me anything
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-96 h-[70vh] sm:h-[500px] max-w-md z-40 flex flex-col backdrop-blur-lg"
          style={{
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.10)',
            borderTop: '0.5px solid rgba(125, 249, 255, 0.6)',
            borderRight: '0.5px solid rgba(225, 249, 255, 0.6)',
            borderLeft: '0.5px solid rgba(225, 249, 255, 0.6)',
            boxShadow: '0 0 25px 10px rgba(125, 249, 255, 0.15)',
            fontFamily: 'Space Grotesk, sans-serif'
          }}
        >
          {/* Header with Logo */}
          <div 
            className="w-full py-2 flex flex-col items-center rounded-t-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-t-0 border-[#7DF9FF] mb-3"
            style={{ background: '#CB00F0' }}
          >
            <Image
              src="https://res.cloudinary.com/dbdkg7fik/image/upload/v1759582511/84804cac10b34f19c1c99da62ccd3a3f768bae20_cv0kbj.png"
              alt="Innovision Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-4 space-y-3 scrollbar-hide"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className="max-w-[75%] sm:max-w-xs px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-lg"
                  style={{
                    borderRadius: message.sender === 'user' 
                      ? '16.759px 16.759px 0 16.759px'
                      : '16.759px 16.759px 16.759px 0',
                    background: message.sender === 'user' 
                      ? '#5000FF'
                      : '#7DF9FF',
                    color: message.sender === 'user' ? 'white' : 'black'
                  }}
                >
                  <p className="text-xs sm:text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div 
                  className="px-4 py-3"
                  style={{
                    borderRadius: '16.759px 16.759px 16.759px 0',
                    background: '#7DF9FF',
                    color: 'black'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 sm:p-4">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base text-gray-800 placeholder-gray-500 focus:outline-none shadow-sm"
                style={{
                  borderRadius: '9999px',
                  border: '2px solid #5000FF',
                  background: '#F8F7FF'
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 disabled:cursor-not-allowed p-1.5 sm:p-2 transition-all duration-300 focus:outline-none"
                aria-label="Send message"
              >
                <Send 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform rotate-45" 
                  style={{
                    color: !inputMessage.trim() || isLoading ? '#9CA3AF' : '#7DF9FF'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Close Button - centered below chat window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-96 max-w-md flex justify-center z-50">
          <div className="relative">
            {/* Partial circle border overlay */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(
                  from 225deg,
                  #7DF9FF 0deg,
                  #7DF9FF 45deg,
                  transparent 45deg,
                  transparent 225deg,
                  #7DF9FF 225deg,
                  #7DF9FF 270deg,
                  transparent 270deg
                )`,
                padding: '3px',
              }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{ background: 'rgba(0, 0, 0, 0.4)' }}
              />
            </div>
            
            <button
              onClick={toggleChatbot}
              className="p-2.5 sm:p-3 rounded-full transition-all duration-300 focus:outline-none backdrop-blur-lg hover:scale-110 z-50 relative"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                color: '#7DF9FF',
                boxShadow: '0 8px 32px 0 rgba(125, 249, 255, 0.4)',
              }}
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;