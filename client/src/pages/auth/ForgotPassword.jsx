import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 text-[var(--text-primary)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 p-[2px]">
            <div className="w-full h-full bg-[var(--bg-secondary)] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[var(--text-primary)]" />
            </div>
          </div>
        </div>

        {!isSent ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold mb-2">Forgot Password?</h2>
              <p className="text-[var(--text-muted)] text-sm">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <h2 className="text-2xl font-heading font-bold mb-4 text-cyan-400">Check your email!</h2>
            <p className="text-[var(--text-muted)] mb-8">
              We've sent a password reset link to <br/>
              <span className="text-[var(--text-primary)] font-medium">{email}</span>
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-sm text-purple-400 hover:text-purple-300 underline"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
