import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { workoutService } from '../services/workoutService';
import type { WorkoutSummary } from '../services/workoutService';
import { TrendingUp, Award, Target, LayoutGrid, Calendar } from 'lucide-react';

export default function ProgressPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const lang = language as 'en' | 'fr';
  const [history, setHistory] = useState<WorkoutSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (user) {
        const data = await workoutService.getHistory(user.id);
        setHistory(data);
      }
      setLoading(false);
    }
    loadHistory();
  }, [user]);

  const isSanctuary = theme === 'light';

  return (
    <MainLayout>
      <div className="flex flex-col gap-10">
        <header>
          <h1 className="font-display text-5xl font-black text-text-main uppercase tracking-tighter">
            {lang === 'fr' ? 'PROGRÈS' : 'ANALYTICS'}
          </h1>
        </header>

        {/* TRANSFORMATION HERO */}
        <section className="glass-card p-10 bg-gradient-to-br from-primary/10 to-transparent relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-micro text-[10px] text-text-dim tracking-widest uppercase">{lang === 'fr' ? 'TRANSFORMATION TOTALE' : 'TOTAL TRANSFORMATION'}</span>
              <h2 className="font-display text-4xl font-black text-text-main uppercase tracking-tight">
                185 LBS <span className="text-text-dim text-2xl mx-2">→</span> 172 LBS
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <span className="px-4 py-1 rounded-full bg-success/20 text-success font-hero text-xl font-black shadow-[0_0_15px_rgba(0,200,83,0.3)]">-13 LBS</span>
                <span className="font-micro text-[10px] text-text-dim">{lang === 'fr' ? 'DEPUIS LE 12 NOV' : 'SINCE NOV 12, 2025'}</span>
              </div>
            </div>
            <div className="w-full md:w-64 h-32 bg-surface/50 rounded-3xl border border-border flex items-center justify-center">
              {/* Mock weight trend sparkline */}
              <svg className="w-full h-full p-4" viewBox="0 0 100 40">
                <path d="M 0 35 Q 25 30, 50 15 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" />
              </svg>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* VOLUME CHART */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl font-black text-text-main uppercase tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {lang === 'fr' ? 'VOLUME HEBDOMADAIRE' : 'WEEKLY VOLUME'}
                </h3>
                <div className="flex gap-2">
                  {['6W', '3M', '1Y'].map(t => (
                    <button key={t} className={`px-3 py-1 rounded-lg font-micro text-[9px] ${t === '6W' ? 'bg-primary text-white' : 'text-text-dim hover:text-text-main'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-64 w-full bg-surface/30 rounded-3xl border border-border relative flex items-end px-4 pb-4 gap-2">
                {[40, 60, 45, 70, 85, 65, 90].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-1000 ${isSanctuary ? 'bg-primary' : 'bg-gradient-to-t from-primary to-gold'}`} 
                      style={{ height: `${v}%`, opacity: 0.6 + (i * 0.05) }} 
                    />
                    <span className="font-micro text-[8px] text-text-dim">W{i+1}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* EXERCISE PROGRESS GRID */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-text-dim" />
                <h3 className="font-display text-xl font-black text-text-main uppercase tracking-tight">{lang === 'fr' ? 'PROGRESSION PAR EXERCICE' : 'EXERCISE PROGRESS'}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Bench Press', pr: '285 lbs', '1rm': '320', trend: [30, 40, 35, 50, 60] },
                  { name: 'Squat', pr: '365 lbs', '1rm': '410', trend: [20, 35, 45, 55, 75] }
                ].map(ex => (
                  <div key={ex.name} className="glass-card p-6 flex flex-col gap-4 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start">
                      <span className="font-display font-bold text-text-main uppercase">{ex.name}</span>
                      <svg className="w-16 h-8" viewBox="0 0 40 20">
                        <path d={`M 0 20 ${ex.trend.map((v, i) => `L ${i*10} ${20-v/4}`).join(' ')}`} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                      </svg>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="font-micro text-[9px] text-text-dim uppercase">PR</span>
                        <span className="font-hero text-xl text-text-main">{ex.pr}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-micro text-[9px] text-text-dim uppercase">EST. 1RM</span>
                        <span className="font-hero text-lg text-primary">{ex['1rm']}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* ACHIEVEMENT GALLERY */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <h3 className="font-display text-xl font-black text-text-main uppercase tracking-tight">{lang === 'fr' ? 'TROPHÉES' : 'ACHIEVEMENTS'}</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-2xl flex items-center justify-center text-2xl border transition-all ${
                      i <= 4 
                        ? 'glass-card bg-gold/10 border-gold/30 grayscale-0 shadow-[0_0_15px_rgba(230,167,0,0.2)]' 
                        : 'bg-surface/30 border-border grayscale opacity-30'
                    }`}
                  >
                    {i === 1 ? '🔥' : i === 2 ? '🏆' : i === 3 ? '💪' : i === 4 ? '⚡' : '🔒'}
                  </div>
                ))}
              </div>
              <button className="w-full h-14 rounded-2xl border border-border font-micro text-xs tracking-[0.2em] hover:text-primary transition-colors uppercase">
                {lang === 'fr' ? 'VOIR TOUT' : 'VIEW ALL'}
              </button>
            </section>

            {/* QUICK HISTORY LIST */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-text-dim" />
                <h3 className="font-display text-sm font-black text-text-dim uppercase tracking-widest">{lang === 'fr' ? 'HISTORIQUE' : 'HISTORY'}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {history.slice(0, 5).map(h => (
                  <div key={h.id} className="glass-card p-4 flex items-center justify-between group hover:translate-x-1 transition-all">
                    <div>
                      <p className="font-display text-sm font-bold text-text-main uppercase">{h.name}</p>
                      <p className="font-micro text-[9px] text-text-dim">{new Date(h.startTime).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-hero text-sm text-text-main">{h.totalVolume}</span>
                      <span className="font-micro text-[8px] text-text-dim uppercase">LBS</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
