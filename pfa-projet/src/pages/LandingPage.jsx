import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Dumbbell, Activity, Shield, ArrowRight, Moon, Sun, Globe } from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();
  const { theme, changeTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  const toggleTheme = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className="min-h-screen bg-primary-bg text-text-main flex flex-col font-sans transition-colors duration-200">
      {/* Navbar */}
      <nav className="glass-card sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-secondary-bg">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-brand-blue" />
          <span className="font-display text-2xl font-bold tracking-wider uppercase text-text-main">
            FitTrack
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-secondary-bg transition-colors" aria-label="Toggle Language">
            <Globe className="w-5 h-5 text-text-muted" />
            <span className="sr-only">{language.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary-bg transition-colors" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-text-muted" /> : <Moon className="w-5 h-5 text-text-muted" />}
          </button>
          <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-text-main hover:text-brand-blue transition-colors">
            {t('login')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-energy-cyan rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <h1 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6 max-w-4xl z-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-energy-cyan">
            {language === 'fr' ? 'Forgez' : 'Forge'}
          </span> {language === 'fr' ? 'Votre Héritage' : 'Your Legacy'}
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mb-10 z-10">
          {language === 'fr' ? 'La plateforme fitness premium avec suivi IA, gamification, et analyses détaillées pour dépasser vos limites.' : 'The premium fitness platform with AI tracking, gamification, and detailed analytics to push your limits.'}
        </p>

        <Link 
          to="/login" 
          className="btn-press z-10 flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          {language === 'fr' ? 'Commencer Maintenant' : 'Start Now'}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </main>

      {/* Features Section */}
      <section className="py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-bg flex items-center justify-center mb-6">
              <Activity className="w-8 h-8 text-momentum" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-3 text-text-main">
              {language === 'fr' ? 'Suivi de Précision' : 'Precision Tracking'}
            </h3>
            <p className="text-text-muted">
              {language === 'fr' ? 'Enregistrez chaque série, répétition et poids avec une interface optimisée pour l\'action.' : 'Log every set, rep, and weight with an interface optimized for action.'}
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-brand-blue/20">
            <div className="w-16 h-16 rounded-full bg-secondary-bg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Dumbbell className="w-8 h-8 text-gold-start" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-3 text-text-main">
              {language === 'fr' ? 'Système de XP' : 'XP System'}
            </h3>
            <p className="text-text-muted">
              {language === 'fr' ? 'Gagnez de l\'expérience, débloquez des badges et maintenez votre série quotidienne active.' : 'Earn experience, unlock badges, and keep your daily streak alive.'}
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-bg flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase mb-3 text-text-main">
              {language === 'fr' ? 'Objectifs IA' : 'AI Goals'}
            </h3>
            <p className="text-text-muted">
              {language === 'fr' ? 'Obtenez des résumés générés par IA et des suggestions d\'entraînement basées sur vos performances.' : 'Get AI-generated summaries and workout suggestions based on your performance.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
