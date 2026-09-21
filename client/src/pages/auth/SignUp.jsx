import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Palette, Heart, Chrome } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role'); // e.g. 'artist' or 'buyer'

  const [step, setStep] = useState(initialRole ? 2 : 1);
  const [role, setRole] = useState(initialRole || null); // 'artist' or 'buyer'
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [bio, setBio] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength();
  const strengthColors = ['bg-white/10', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast?.showToast?.('Passwords do not match', 'error');
      return;
    }
    if (!agreed) {
      toast?.showToast?.('You must agree to the Terms of Service', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      if (auth?.register) {
        await auth.register({ name, email, password, role, artStyle, bio });
      }
      toast?.showToast?.('Account created successfully!', 'success');
      navigate(role === 'artist' ? '/artist-dashboard' : '/dashboard');
    } catch (error) {
      toast?.showToast?.(error.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border-r border-white/10 p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-[var(--bg-primary)]/0 to-purple-900/20"></div>
        <div className="z-10 text-center max-w-md">
          <h1 className="text-5xl font-heading font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Join ARTVRKZ
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            Begin your journey in the world's most vibrant digital art marketplace.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto my-auto">
          {/* Step Indicator */}
          <div className="flex justify-center items-center gap-2 mb-12">
            <div className={`w-12 h-1.5 rounded-full ${step >= 1 ? 'bg-purple-500' : 'bg-white/10'}`} />
            <div className={`w-12 h-1.5 rounded-full ${step >= 2 ? 'bg-purple-500' : 'bg-white/10'}`} />
          </div>

          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-2">Join Artvrkz</h2>
                <p className="text-[var(--text-muted)]">What are you joining as?</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => setRole('artist')}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                    role === 'artist' 
                      ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_30px_rgba(124,58,237,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <Palette className={`w-10 h-10 mb-4 ${role === 'artist' ? 'text-purple-400' : 'text-[#6b6b80]'}`} />
                  <h3 className="text-xl font-bold mb-2">Artist</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">Showcase and sell your artwork to thousands of art lovers.</p>
                  <ul className="text-xs text-[#6b6b80] space-y-2">
                    <li>• Upload artworks</li>
                    <li>• Set your prices</li>
                    <li>• Connect with buyers</li>
                    <li>• Accept custom requests</li>
                  </ul>
                </button>

                <button
                  onClick={() => setRole('buyer')}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                    role === 'buyer' 
                      ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <Heart className={`w-10 h-10 mb-4 ${role === 'buyer' ? 'text-cyan-400' : 'text-[#6b6b80]'}`} />
                  <h3 className="text-xl font-bold mb-2">Collector</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">Discover, buy, and collect artwork from independent artists.</p>
                  <ul className="text-xs text-[#6b6b80] space-y-2">
                    <li>• Explore thousands of artworks</li>
                    <li>• Contact artists directly</li>
                    <li>• Request custom art</li>
                    <li>• Build your collection</li>
                  </ul>
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!role}
                className="w-full py-3 px-4 bg-white text-[var(--bg-primary)] hover:bg-gray-200 font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
              <p className="mt-8 text-center text-[var(--text-muted)] text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:text-gray-300 transition-colors font-medium">Log in</Link>
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-[var(--text-primary)] mb-2">Account Details</h2>
                <p className="text-[var(--text-muted)]">Complete your profile to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required
                    className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500" />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required
                    className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required
                      className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500" />
                  </div>
                  {password && (
                    <div className="mt-2 flex gap-1 h-1">
                      {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`flex-1 rounded-full ${strength >= s ? strengthColors[strength] : 'bg-white/10'}`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b80]" />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required
                    className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500" />
                </div>

                {role === 'artist' && (
                  <>
                    <select value={artStyle} onChange={(e) => setArtStyle(e.target.value)} required
                      className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="" disabled>Select your primary art style</option>
                      <option value="illustration">Illustration</option>
                      <option value="painting">Painting</option>
                      <option value="3d">3D Modeling</option>
                      <option value="photography">Photography</option>
                    </select>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short bio (optional)" rows={3}
                      className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-xl py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500 resize-none" />
                  </>
                )}

                <label className="flex items-center gap-3 cursor-pointer group mt-4">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 rounded border-white/10 bg-[var(--bg-secondary)] text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">I agree to the Terms of Service and Privacy Policy</span>
                </label>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50">
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-sm text-[#6b6b80]">or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button className="mt-6 w-full py-3 px-4 bg-transparent border border-white/10 hover:bg-white/5 text-[var(--text-primary)] font-medium rounded-xl flex items-center justify-center gap-2 transition-all">
                <Chrome className="w-5 h-5" /> Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
