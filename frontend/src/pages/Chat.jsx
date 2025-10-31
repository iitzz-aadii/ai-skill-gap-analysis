import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Loader2, Bot, User, Trash2 } from 'lucide-react';
import { sendChatMessage, getChatHistory, clearChatHistory } from '../services/api';

export default function Chat() {
  const location = useLocation();
  const context = location.state?.context;
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat history
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await getChatHistory();
      setMessages(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Prepare context for AI
      const chatContext = context ? {
        skill_match_percentage: context.skill_match_percentage,
        missing_skills: context.missing_skills?.map(s => s.skill) || [],
        matched_skills: context.matched_skills?.map(s => s.name) || [],
        job_title: 'Target Position'
      } : null;

      const response = await sendChatMessage(inputMessage, chatContext);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      try {
        await clearChatHistory();
        setMessages([]);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Career Coach</h1>
            <p className="text-gray-600">
              Get personalized advice on upskilling and career development
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-red-600 hover:text-red-700 flex items-center text-sm"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="card mb-6" style={{ minHeight: '500px', maxHeight: '600px' }}>
        <div className="h-full flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Start a conversation with your AI Coach</p>
                <p className="text-sm text-gray-400">
                  Ask me anything about skill development, career paths, or learning strategies
                </p>
                
                {/* Suggested Questions */}
                <div className="mt-8 space-y-2">
                  <p className="text-sm font-medium text-gray-600 mb-3">Try asking:</p>
                  {[
                    'How should I prioritize learning these skills?',
                    'What are the best resources to learn Python?',
                    'How can I improve my resume?',
                    'What projects should I build to learn React?'
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="block w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-primary-600 ml-2'
                          : 'bg-gray-200 mr-2'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-100">
                    <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t pt-4">
            <div className="flex items-end gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                rows="2"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputMessage.trim()}
                className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="card bg-primary-50 border border-primary-200">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Tips for better conversations:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Be specific about your learning goals and timeline</li>
          <li>• Ask about resources, projects, or learning strategies</li>
          <li>• Request help with resume improvements or interview prep</li>
          <li>• Share your current skill level for personalized advice</li>
        </ul>
      </div>
    </div>
  );
}
