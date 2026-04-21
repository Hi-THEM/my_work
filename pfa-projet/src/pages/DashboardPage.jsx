import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/dashboard/StatCard';
import StreakTracker from '../components/dashboard/StreakTracker';
import CalendarStrip from '../components/dashboard/CalendarStrip';
import TodayPlan from '../components/dashboard/TodayPlan';
import QuickActions from '../components/dashboard/QuickActions';
import { useAuth } from '../context/AuthContext';
import { Trophy, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-extrabold text-text-main uppercase tracking-tight">Tableau de bord</h1>
            <p className="text-text-muted font-medium mt-1">Bon retour, {user?.firstName} 👋 Voici votre progression aujourd'hui.</p>
          </div>
          <div className="flex items-center gap-4">
             <StreakTracker streak={user?.gamification?.currentStreak || 12} />
          </div>
        </div>

        {/* Top Grid: Main Action + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <TodayPlan />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard 
                label="Calories" 
                value="1,840" 
                unit="KCAL" 
                trend={12} 
                colorClass="energy-cyan"
                sparklineData="0,35 15,30 30,38 45,20 60,25 75,10 100,5"
              />
              <StatCard 
                label="Entraînements" 
                value="4" 
                unit="SÉANCES" 
                trend={0} 
                colorClass="brand-blue"
                sparklineData="0,20 20,20 40,30 60,30 80,10 100,10"
              />
              <StatCard 
                label="XP Total" 
                value="2,450" 
                unit="PTS" 
                trend={5} 
                colorClass="gold-start"
                sparklineData="0,40 20,35 40,30 60,20 80,15 100,0"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-bold text-text-main uppercase tracking-wide flex items-center gap-2">
                Actions Rapides
              </h3>
              <QuickActions />
            </div>
          </div>

          {/* Right Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Calendar Widget */}
            <div className="glass-card p-6 rounded-2xl border border-secondary-bg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-lg font-bold text-text-main uppercase">Activité Hebdo</h3>
                <span className="text-xs font-bold text-brand-blue cursor-pointer hover:underline">VOIR TOUT</span>
              </div>
              <CalendarStrip />
            </div>

            {/* Level & XP Widget */}
            <div className="glass-card p-6 rounded-2xl border border-secondary-bg bg-gradient-to-br from-gold-start/5 to-transparent">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-xl bg-gold-start/20 flex items-center justify-center text-gold-start">
                   <Trophy className="w-6 h-6" />
                 </div>
                 <div>
                   <div className="text-xs font-bold text-text-muted uppercase">Niveau {user?.gamification?.currentLevel || 5}</div>
                   <div className="font-display text-xl font-bold text-text-main uppercase">Guerrier Elite</div>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                   <span>2,450 XP</span>
                   <span>3,000 XP</span>
                 </div>
                 <div className="h-2 w-full bg-secondary-bg rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-start to-gold-end w-[81%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                 </div>
                 <p className="text-[10px] text-center text-text-muted mt-2">Plus que <span className="text-gold-start font-bold">550 XP</span> pour le niveau 6 !</p>
               </div>
            </div>

            {/* Recent PRs / Achievements */}
            <div className="glass-card p-6 rounded-2xl border border-secondary-bg">
              <h3 className="font-display text-lg font-bold text-text-main uppercase mb-4">Records Récents</h3>
              <div className="space-y-4">
                {[
                  { exercise: 'Bench Press', value: '100kg', date: 'Hier' },
                  { exercise: 'Squat', value: '140kg', date: 'Lun' }
                ].map((pr, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-primary-bg border border-secondary-bg">
                    <div>
                      <div className="text-sm font-bold text-text-main">{pr.exercise}</div>
                      <div className="text-[10px] font-medium text-text-muted">{pr.date}</div>
                    </div>
                    <div className="text-brand-blue font-mono font-bold">{pr.value}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-[10px] font-bold text-text-muted hover:text-brand-blue transition-colors flex items-center justify-center gap-1">
                HISTORIQUE COMPLET <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
