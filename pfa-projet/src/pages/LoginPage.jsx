import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Dumbbell, ArrowLeft, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();
  
  const [email, setEmail] = useState('demo@fittrack.tn');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(language === 'fr' ? 'Identifiants invalides' : 'Invalid credentials');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Reset shake animation
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-200">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-blue rounded-full mix-blend-multiply filter blur-[150px] opacity-20"></div>
      
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-text-muted hover:text-text-main transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">{language === 'fr' ? 'Retour' : 'Back'}</span>
      </Link>

      <div className={`max-w-md w-full glass-card rounded-2xl p-8 border border-secondary-bg relative z-10 ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-secondary-bg rounded-xl flex items-center justify-center mb-4 shadow-lg border border-border">
            <Dumbbell className="w-8 h-8 text-brand-blue" />
          </div>
          <h2 className="font-display text-3xl font-bold text-text-main uppercase tracking-wide">
            {language === 'fr' ? 'Connexion' : 'Login'}
          </h2>
          <p className="text-text-muted mt-2 text-center">
            {language === 'fr' ? 'Prêt à écraser vos objectifs ?' : 'Ready to crush your goals?'}
          </p>
        </div>
        
        {error && (
          <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg mb-6 flex items-center gap-3 animate-[fade-in_0.2s_ease-out]">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="group">
            <label className="block text-sm font-bold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('email')}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-secondary-bg border ${error ? 'border-danger' : 'border-secondary-bg'} rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan focus:border-transparent text-text-main transition-all`}
              required
            />
          </div>
          <div className="group">
            <label className="block text-sm font-bold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('password')}
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 bg-secondary-bg border ${error ? 'border-danger' : 'border-secondary-bg'} rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan focus:border-transparent text-text-main transition-all`}
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="btn-press w-full py-3.5 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors mt-2 flex justify-center items-center h-12"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              language === 'fr' ? 'Se Connecter' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            {language === 'fr' ? 'Pas encore de compte ?' : "Don't have an account?"}{' '}
            <Link to="/register" className="text-brand-blue font-bold hover:underline transition-all">
              {language === 'fr' ? "S'inscrire" : 'Sign Up'}
            </Link>
          </p>
        </div>
      </div>
      
      {/* Add custom shake animation directly for this component */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
