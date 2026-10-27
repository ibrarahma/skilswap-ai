import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  limit,
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

type SignupRole = 'student' | 'teacher';
type Mode = 'login' | 'register' | 'forgot';

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

const friendlyError = (code?: string): string => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please log in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/network-request-failed':
      return 'Network problem. Check your internet connection.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      return 'Firebase API key is missing or wrong. Check .env.local and restart the server.';
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'Permission denied by database rules. Check the published Firestore rules.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [role, setRole] = useState<SignupRole>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const mode: Mode =
    authMode === 'register' || authMode === 'forgot' ? authMode : 'login';

  const switchMode = (m: Mode) => {
    setError('');
    setSuccessMsg('');
    setAuthMode(m);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setAuthModalOpen(false);
    } catch (err: any) {
      setError(friendlyError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const uname = username.trim().toLowerCase();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!USERNAME_RE.test(uname)) {
      setError('Username must be 3-20 characters: letters, numbers and underscore only.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    let createdUser: User | null = null;
    let profileSaved = false;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      createdUser = cred.user;

      // Username must be unique
      const taken = await getDocs(
        query(collection(db, 'users'), where('username', '==', uname), limit(1))
      );
      if (!taken.empty) {
        await cred.user.delete();
        createdUser = null;
        setError('This username is already taken. Please choose another.');
        return;
      }

      await updateProfile(cred.user, { displayName: name.trim() });

      await setDoc(doc(db, 'users', cred.user.uid), {
        name: name.trim(),
        username: uname,
        email: email.trim().toLowerCase(),
        role,
        college: college.trim(),
        bio: '',
        avatar: '',
        skillsToTeach: [],
        skillsToLearn: [],
        createdAt: serverTimestamp(),
      });
      profileSaved = true;

      let linkSent = true;
      try {
        await sendEmailVerification(cred.user);
      } catch {
        linkSent = false;
      }

      setSuccessMsg(
        linkSent
          ? 'Account created. We sent a verification link to your email. Check your inbox and spam folder, then click the link.'
          : 'Account created, but the verification email could not be sent. Please try again later.'
      );
    } catch (err: any) {
      // Do not leave an account without a profile behind
      if (createdUser && !profileSaved) {
        try {
          await createdUser.delete();
        } catch {
          /* ignore */
        }
      }
      setError(friendlyError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      if (err?.code === 'auth/invalid-email' || err?.code === 'auth/network-request-failed') {
        setError(friendlyError(err.code));
        setLoading(false);
        return;
      }
      // For other errors we show the same message, so nobody can test which emails exist
    }
    setLoading(false);
    setSuccessMsg('If an account exists for this email, a password reset link has been sent.');
  };

  const inputClass =
    'w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400';
  const primaryBtn =
    'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full border border-slate-200 dark:border-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 mx-auto flex items-center justify-center text-white mb-3 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {mode === 'login' && 'Welcome back to SkillSwap AI'}
            {mode === 'register' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Learn Together. Build Together. Exchange Smarter.
          </p>
        </div>

        {successMsg ? (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-emerald-700 dark:text-emerald-400 text-sm font-medium space-y-2">
              <CheckCircle2 className="w-9 h-9 mx-auto text-emerald-500" />
              <p>{successMsg}</p>
            </div>
            <button
              type="button"
              className={primaryBtn}
              onClick={() => {
                setSuccessMsg('');
                if (mode === 'forgot') {
                  setAuthMode('login');
                } else {
                  setAuthModalOpen(false);
                }
              }}
            >
              {mode === 'forgot' ? 'Back to login' : 'Continue'}
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative">
                  <Mail className={iconClass} />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Lock className={iconClass} />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {(['student', 'teacher'] as SignupRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        role === r
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {r === 'student' ? 'Student' : 'Teacher / Professor'}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <UserIcon className={iconClass} />
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <UserIcon className={iconClass} />
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="Username (e.g. ibrar_01)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Mail className={iconClass} />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Lock className={iconClass} />
                  <input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <UserIcon className={iconClass} />
                  <input
                    type="text"
                    placeholder="College / Institution (optional)"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  A verification link will be sent to your email. Phone OTP verification is planned for a later phase.
                  Email verification does not confirm your student or teacher identity.
                </p>
                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={handleReset} className="space-y-3">
                <div className="relative">
                  <Mail className={iconClass} />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <button type="submit" disabled={loading} className={primaryBtn}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    Back to login
                  </button>
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};