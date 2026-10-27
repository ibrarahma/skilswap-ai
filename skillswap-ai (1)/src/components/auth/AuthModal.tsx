import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Mail, Lock, Phone, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, setCurrentUser, users, setActiveRole } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding or creating user session
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      setActiveRole(existing.role);
    } else if (email) {
      // Create new session user
      const newUser = {
        ...users[0],
        id: `usr_${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        college: college || 'IIT Delhi',
        role: selectedRole
      };
      setCurrentUser(newUser);
      setActiveRole(selectedRole);
    }
    setSuccessMsg('Successfully authenticated!');
    setTimeout(() => {
      setSuccessMsg('');
      setAuthModalOpen(false);
    }, 1000);
  };

  const handleSendOtp = () => {
    if (phone) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otpCode.length >= 4) {
      setCurrentUser(users[0]);
      setSuccessMsg('OTP Verified Successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        setAuthModalOpen(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full border border-slate-200 dark:border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 mx-auto flex items-center justify-center text-white mb-3 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {authMode === 'login' && 'Welcome Back to SkillSwap AI'}
            {authMode === 'register' && 'Create Your Student Profile'}
            {authMode === 'otp' && 'Login with Mobile OTP'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect, swap skills, and build AI projects with students across top colleges.
          </p>
        </div>

        {successMsg ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-emerald-600 dark:text-emerald-400 font-semibold space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto animate-bounce text-emerald-500" />
            <p>{successMsg}</p>
          </div>
        ) : (
          <>
            {/* Social Google Login Button */}
            {(authMode === 'login' || authMode === 'register') && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentUser(users[0]);
                    setAuthModalOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google Account</span>
                </button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-400">
                    <span className="bg-white dark:bg-slate-900 px-2">or continue with email</span>
                  </div>
                </div>
              </div>
            )}

            {/* Email Form */}
            {(authMode === 'login' || authMode === 'register') && (
              <form onSubmit={handleLogin} className="space-y-3">
                {authMode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">College / University</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IIT Delhi, BITS Pilani"
                        value={college}
                        onChange={e => setCollege(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Role</label>
                      <select
                        value={selectedRole}
                        onChange={e => setSelectedRole(e.target.value as UserRole)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                      >
                        <option value="student">Student (Learn & Swap Skills)</option>
                        <option value="mentor">Mentor (Faculty / Expert)</option>
                        <option value="recruiter">Recruiter (Hiring Talent)</option>
                        <option value="admin">College Administrator</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">College Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                    />
                  </div>
                </div>

                {authMode === 'login' && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('otp')}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Login via Phone OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-slate-500 dark:text-slate-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Phone OTP Mode */}
            {authMode === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                      />
                    </div>
                    <button
                      onClick={handleSendOtp}
                      className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all"
                    >
                      Send One-Time Passcode
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Enter 4-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="1234"
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      className="w-full tracking-widest text-center py-2 text-base font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 outline-none"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full mt-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all"
                    >
                      Verify & Sign In
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Toggle Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <p>
                  Don't have a profile yet?{' '}
                  <button onClick={() => setAuthMode('register')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
