import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import { useNutrition } from '../context/NutritionContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { workoutService } from '../services/workoutService';
import { Info, Sparkles, Brain, ArrowUpRight, Play, Clock, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats } = useGamification();
  const { macroTotals, targets } = useNutrition();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const lang = language as 'en' | 'fr';

  const [aiSuggestions, setAiSuggestions] = useState<{ en: string; fr: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const isMorning = new Date().getHours() < 10;
  const isSanctuary = theme === 'light';
  const showMorningBriefing = isSanctuary && isMorning;

  useEffect(() => {
    async function loadData() {
      if (user) {
        const coach = await workoutService.getAICoachSuggestions(user.id);
        setAiSuggestions(coach);
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading) return <MainLayout><div className="py-20 text-center font-display font-black text-text-muted animate-pulse">SYNCHRONIZING...</div></MainLayout>;

  return (
    <MainLayout>
      <LayoutTransition>
        <div className="flex flex-col gap-10">
        {/* WELCOME HEADER (Z: +4) */}
        <header className="flex flex-col gap-1">
          <span className="font-micro text-text-muted tracking-[0.2em]">
            {showMorningBriefing ? (lang === 'fr' ? 'BONJOUR' : 'GOOD MORNING') : (lang === 'fr' ? 'BON RETOUR' : 'WELCOME BACK')}
          </span>
          <h1 className="font-display text-5xl font-black text-text-main uppercase tracking-tighter shimmer inline-block">
            {user?.firstName ?? (lang === 'fr' ? 'CHAMPION' : 'CHAMPION')}
          </h1>
        </header>

        {/* MORNING BRIEFING EXCLUSIVE */}
        {showMorningBriefing && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="glass-card p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <h3 className="font-display text-2xl font-bold text-text-main mb-6">
                {lang === 'fr' ? 'Votre intention du jour' : "Today's Intention"}
              </h3>
              <p className="text-text-muted mb-6 leading-relaxed">
                {lang === 'fr' ? 'Sur quoi voulez-vous vous concentrer aujourd\'hui ?' : "What's your focus today?"}
              </p>
              <div className="flex flex-wrap gap-3">
                {['Strength', 'Recovery', 'Consistency'].map(chip => (
                  <button key={chip} className="px-6 py-2 rounded-full border border-border bg-surface/50 font-micro text-[10px] hover:border-primary hover:text-primary transition-all">
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* READINESS CARD (Z: +6) */}
            <section className="glass-card p-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/10" />
                  <circle 
                    cx="96" cy="96" r="80" fill="none" stroke="currentColor" strokeWidth="3" 
                    strokeDasharray="502" strokeDashoffset={502 * (1 - 0.87)}
                    className="text-primary shadow-[0_0_10px_rgba(255,77,0,0.5)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-hero text-6xl text-text-main leading-none">87</span>
                  <span className="font-micro text-[10px] text-primary font-black mt-1">▲ +4</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-black text-text-main uppercase tracking-tight flex items-center gap-2">
                    {lang === 'fr' ? 'SCORE DE PRÉPARATION' : 'READINESS SCORE'}
                    <Info className="w-4 h-4 text-text-muted cursor-help" />
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['😴 Sleep', '💪 Recovery', '📊 Volume'].map(f => (
                    <div key={f} className="px-4 py-3 rounded-2xl bg-surface/30 border border-border font-micro text-[10px] text-text-main">
                      {f}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted leading-relaxed italic">
                  {lang === 'fr' 
                    ? "Votre corps est prêt pour une séance de haute intensité aujourd'hui." 
                    : "Your body is primed for a high-intensity session today."}
                </p>
              </div>
            </section>

            {/* NUTRITION SNAPSHOT — DUAL CARDS (Z: +3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <span className="font-micro text-text-muted">{lang === 'fr' ? 'CALORIES' : 'CALORIES'}</span>
                  <span className="font-hero text-2xl text-text-main">{macroTotals.calories.toFixed(0)} <span className="text-xs text-text-dim">/ {targets.calories}</span></span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(macroTotals.calories / targets.calories) * 100}%` }} />
                </div>
              </div>
              <div className="glass-card p-6 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <span className="font-micro text-text-muted">{lang === 'fr' ? 'PROTÉINES' : 'PROTEIN'}</span>
                  <span className="font-hero text-2xl text-text-main">{macroTotals.protein.toFixed(0)}g <span className="text-xs text-text-dim">/ {targets.protein}g</span></span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-success transition-all duration-1000" style={{ width: `${(macroTotals.protein / targets.protein) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* TODAY'S WORKOUT CARD (Z: +7) */}
            <section className="glass-card p-8 border-l-[6px] border-primary relative group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-micro text-[9px] font-black">ACTIVE PLAN</span>
                    <span className="font-micro text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> 65 MIN</span>
                  </div>
                  <h2 className="font-display text-3xl font-black text-text-main uppercase tracking-tight">PUSH A — HEAVY DAY</h2>
                  <div className="flex items-center gap-3 text-text-muted font-medium text-sm">
                    <span>Bench Press</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Incline DB</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Tricep Ext</span>
                  </div>
                </div>
                <button className="h-16 px-10 rounded-full bg-gradient-to-r from-primary to-orange-600 text-white font-display font-black uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(255,77,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,77,0,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Play className="w-5 h-5 fill-current" />
                  {lang === 'fr' ? 'DÉMARRER' : 'START WORKOUT'}
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* AI COACH CARD (Z: +2) */}
            <section className="glass-card p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-gold" />
                <h3 className="font-display text-sm font-black text-gold uppercase tracking-widest">AI COACH INSIGHT</h3>
              </div>
              <div className="space-y-4">
                {aiSuggestions.map((s, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface/30 border border-border group hover:border-gold/30 transition-colors">
                    <Zap className="w-4 h-4 text-gold shrink-0" />
                    <p className="text-sm text-text-muted leading-relaxed group-hover:text-text-main transition-colors">
                      {lang === 'fr' ? s.fr : s.en}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* RECENT ACHIEVEMENTS */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-micro text-[10px] text-text-muted tracking-[0.2em]">RECENT ACHIEVEMENTS</h3>
                <ArrowUpRight className="w-4 h-4 text-text-dim" />
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '🏆', label: '5-Day Streak', xp: '+500' },
                  { icon: '⭐', label: 'First PR', xp: '+250' }
                ].map(a => (
                  <div key={a.label} className="glass-card p-4 flex items-center justify-between group hover:translate-x-1 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{a.icon}</span>
                      <span className="font-display text-sm font-bold text-text-main uppercase tracking-tight">{a.label}</span>
                    </div>
                    <span className="font-hero text-xs text-gold">{a.xp}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </LayoutTransition>
  </MainLayout>
  );
}

function LayoutTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in duration-1000 slide-in-from-bottom-4">
      {children}
    </div>
  );
}
