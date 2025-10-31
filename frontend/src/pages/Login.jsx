import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-charcoal mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-lg text-mediumGrey">Sign in to continue your skill journey</p>
        </div>

        {/* Login Form */}
        <div className="card-premium shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-start shadow-sm animate-fade-in">
                <AlertCircle className="w-6 h-6 text-red-600 mr-4 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mediumGrey" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-12"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-charcoal mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mediumGrey" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center pt-6 border-t border-neutral-200">
            <p className="text-sm text-mediumGrey">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-soft">
          <p className="text-base text-blue-900 font-bold mb-2 flex items-center">
            <span className="text-2xl mr-2">🎯</span> Quick Start:
          </p>
          <p className="text-sm text-blue-800">
            New user? Click "Sign up" to create your free account in seconds!
          </p>
        </div>
      </div>
    </div>
  );
}
