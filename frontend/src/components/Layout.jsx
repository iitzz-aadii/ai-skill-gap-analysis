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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-mediumGrey">
              © 2024 <span className="font-semibold text-charcoal">AI Skill Gap Analyzer</span> • Powered by AI & NLP
            </p>
            <p className="text-xs text-mediumGrey mt-2">
              Transform your career with intelligent skill analysis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
