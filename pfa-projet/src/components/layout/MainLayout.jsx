import React from 'react';
import Sidebar from './Sidebar';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Globe, Bell } from 'lucide-react';

export default function MainLayout({ children }) {
  const { theme, changeTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex h-screen bg-primary-bg overflow-hidden transition-colors duration-200">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="hidden lg:block w-72 h-full shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-primary-bg/50 backdrop-blur-md z-30">
          <div className="lg:hidden flex items-center gap-2">
             <span className="font-display text-2xl font-bold uppercase text-brand-blue">FT</span>
          </div>
          
          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl hover:bg-secondary-bg text-text-muted transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-primary-bg"></span>
            </button>
            <button 
              onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
              className="p-2 rounded-xl hover:bg-secondary-bg text-text-muted transition-colors flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase">{language}</span>
            </button>
            <button 
              onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-secondary-bg text-text-muted transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav - Show only on mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full h-20 bg-secondary-bg border-t border-secondary-bg/50 flex items-center justify-around px-4 z-50">
        {/* Simplified mobile nav for now */}
        <button className="p-3 text-brand-blue"><div className="w-1.5 h-1.5 bg-brand-blue rounded-full mx-auto mb-1"></div><span className="text-[10px] font-bold">HOME</span></button>
        <button className="p-3 text-text-muted"><span className="text-[10px] font-bold">WORKOUT</span></button>
        <button className="p-3 text-text-muted"><span className="text-[10px] font-bold">FOOD</span></button>
        <button className="p-3 text-text-muted"><span className="text-[10px] font-bold">PROFILE</span></button>
      </nav>
    </div>
  );
}
