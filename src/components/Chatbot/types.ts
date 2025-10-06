// Types for the Innovision Chatbot API

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response?: string;
  message?: string;
  error?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}