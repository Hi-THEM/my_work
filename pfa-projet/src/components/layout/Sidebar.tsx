import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  Utensils,
  LineChart,
  User,
  LogOut,
  Trophy,
  Flame,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useGamification } from '../../context/GamificationContext';

const navItems = [
  { to: '/dashboard',  icon: Home,      label: { fr: 'Tableau de bord', en: 'Dashboard' } },
  { to: '/exercises',  icon: Dumbbell,  label: { fr: 'Exercices',       en: 'Exercises' } },
  { to: '/nutrition',  icon: Utensils,  label: { fr: 'Nutrition',       en: 'Nutrition' } },
  { to: '/progress',   icon: LineChart, label: { fr: 'Progrès',         en: 'Progress'  } },
  { to: '/achievements', icon: Trophy,  label: { fr: 'Succès',          en: 'Achievements' } },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const { language }     = useLanguage();
  const { stats }        = useGamification();
  const navigate         = useNavigate();

  const lang = language as 'en' | 'fr';

  const streakFlame =
    stats.streakStatus === 'active'   ? 'text-momentum-orange animate-pulse' :
    stats.streakStatus === 'at-risk'  ? 'text-gold-start'                    :
    'text-text-muted';

  return (
    <aside className="w-full h-full flex flex-col bg-secondary-bg border-r border-white/5 p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
          <Dumbbell className="text-white w-6 h-6" />
        </div>
        <span className="font-display text-2xl font-bold tracking-tight uppercase text-text-main">FitTrack</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-blue text-white shadow-[0_4px_15px_rgba(59,130,246,0.25)]'
                  : 'text-text-muted hover:bg-primary-bg hover:text-text-main'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="font-display uppercase tracking-wide text-sm">{item.label[lang]}</span>
          </NavLink>
        ))}
      </nav>

      {/* Streak + XP mini widget */}
      <div className="mt-4 mb-4 p-4 rounded-2xl bg-primary-bg border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`w-5 h-5 ${streakFlame}`} />
            <span className="font-mono text-sm font-bold text-text-main">{stats.streakDays} {lang === 'fr' ? 'jours' : 'days'}</span>
          </div>
          <span className="text-[10px] font-bold uppercase text-text-muted">{lang === 'fr' ? 'Série' : 'Streak'}</span>
        </div>
        <div>
          <div className="flex justify-between text-[9px] font-bold text-text-muted uppercase mb-1">
            <span>{lang === 'fr' ? 'Niv.' : 'Lv.'} {stats.level}</span>
            <span>{stats.xp} / {stats.xpToNextLevel} XP</span>
          </div>
          <div className="h-1.5 w-full bg-secondary-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-start to-gold-end rounded-full transition-all duration-700"
              style={{ width: `${Math.min((stats.xp / stats.xpToNextLevel) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="space-y-1 pt-4 border-t border-white/5">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              isActive ? 'bg-brand-blue text-white' : 'text-text-muted hover:bg-primary-bg hover:text-text-main'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="font-display uppercase tracking-wide text-sm">{lang === 'fr' ? 'Profil' : 'Profile'}</span>
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-danger-red hover:bg-danger-red/10 w-full transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-display uppercase tracking-wide text-sm">{lang === 'fr' ? 'Déconnexion' : 'Sign Out'}</span>
        </button>
      </div>
    </aside>
  );
}
