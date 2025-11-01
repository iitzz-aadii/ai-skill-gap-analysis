import { Link, useLocation } from 'react-router-dom';
import { Brain, MessageSquare, Home, TrendingUp, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-backgroundGrey via-white to-primary-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-md">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="gradient-text">AI Skill</span>
                  <span className="text-charcoal"> Analyzer</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/')
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-mediumGrey hover:text-charcoal hover:bg-neutral-100'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Analyze
              </Link>
              
              <Link
                to="/progress"
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/progress')
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-mediumGrey hover:text-charcoal hover:bg-neutral-100'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Progress
              </Link>
              
              <Link
                to="/chat"
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive('/chat')
                    ? 'text-primary-600 bg-primary-50 shadow-sm'
                    : 'text-mediumGrey hover:text-charcoal hover:bg-neutral-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Coach
              </Link>

              {isAuthenticated && (
                <div className="flex items-center ml-4 pl-4 border-l border-neutral-200">
                  <div className="flex items-center px-3 py-2 bg-neutral-100 rounded-xl mr-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-charcoal">{user?.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-neutral-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-charcoal text-lg">AI Skill Analyzer</span>
              </div>
              <p className="text-xs text-mediumGrey">
                Transform your career with intelligent skill analysis powered by advanced AI
              </p>
            </div>

            {/* Technology Stack */}
            <div className="text-center">
              <h3 className="text-sm font-semibold text-charcoal mb-3">Powered By</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">Gemini AI</span>
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">spaCy NLP</span>
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">Sentence-BERT</span>
              </div>
            </div>

            {/* Features */}
            <div className="text-center md:text-right">
              <h3 className="text-sm font-semibold text-charcoal mb-3">Features</h3>
              <div className="text-xs text-mediumGrey space-y-1">
                <p>✨ AI-Powered Skill Matching</p>
                <p>📊 Personalized Gap Analysis</p>
                <p>🎯 Custom Learning Paths</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-200 pt-6 text-center">
            <p className="text-sm text-mediumGrey">
              © 2025 <span className="font-semibold text-charcoal">AI Skill Gap Analyzer</span> • Built with React, FastAPI & MongoDB
            </p>
            <p className="text-xs text-mediumGrey mt-2">
              Helping professionals bridge the gap between current skills and dream careers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
