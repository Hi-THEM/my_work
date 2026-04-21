import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  User, 
  Settings, 
  LogOut,
  Trophy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Tableau de bord', labelEn: 'Dashboard' },
    { to: '/exercises', icon: Dumbbell, label: 'Exercices', labelEn: 'Exercises' },
    { to: '/nutrition', icon: Utensils, label: 'Nutrition', labelEn: 'Nutrition' },
    { to: '/progress', icon: LineChart, label: 'Progrès', labelEn: 'Progress' },
    { to: '/achievements', icon: Trophy, label: 'Succès', labelEn: 'Achievements' },
  ];

  return (
    <aside className="w-full h-full flex flex-col bg-secondary-bg border-r border-secondary-bg/50 p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
          <Dumbbell className="text-white w-6 h-6" />
        </div>
        <span className="font-display text-2xl font-bold tracking-tight uppercase text-text-main">FitTrack</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                isActive 
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/10' 
                  : 'text-text-muted hover:bg-primary-bg hover:text-text-main'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-display uppercase tracking-wide text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2 pt-4 border-t border-secondary-bg">
        <NavLink
          to="/profile"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
              isActive ? 'bg-brand-blue text-white' : 'text-text-muted hover:bg-primary-bg'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="font-display uppercase tracking-wide text-sm">Profil</span>
        </NavLink>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-danger hover:bg-danger/10 w-full transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-display uppercase tracking-wide text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
