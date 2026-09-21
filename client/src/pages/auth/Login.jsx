import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let userRole = 'buyer';
      if (auth?.login) {
        const u = await auth.login(email, password);
        if (u) userRole = u.role;
      }
      toast?.showToast?.('Logged in successfully', 'success');
      navigate(userRole === 'artist' ? '/artist-dashboard' : '/dashboard');
    } catch (error) {
      toast?.showToast?.(error.message || 'Failed to login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border-r border-white/10 p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-[var(--bg-primary)]/0 to-cyan-900/20"></div>
        
        <div className="z-10 text-center max-w-md">
          <h1 className="text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
            ARTVRKZ
          </h1>
          <p className="text-xl text-[var(--text-muted)] mb-8">
            Discover art. Connect with artists. Make it yours.
          </p>
          <div className="flex gap-8 justify-center mt-12 text-[#6b6b80]">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">10k+</div>
              <div className="text-sm mt-1">Artworks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">5k+</div>
              <div className="text-sm mt-1">Artists</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-2">Welcome back</h2>
            <p className="text-[var(--text-muted)]">Sign in to your Artvrkz account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] placeholder:text-[#6b6b80] focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-12 text-[var(--text-primary)] placeholder:text-[#6b6b80] focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b80] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-[var(--bg-secondary)] text-purple-600 focus:ring-purple-500 focus:ring-offset-[var(--bg-primary)]" />
                <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-sm text-[#6b6b80]">or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button className="mt-6 w-full py-3 px-4 bg-transparent border border-white/10 hover:bg-white/5 text-[var(--text-primary)] font-medium rounded-xl flex items-center justify-center gap-2 transition-all">
            <Chrome className="w-5 h-5" />
            Google
          </button>

          <p className="mt-8 text-center text-[var(--text-muted)] text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
