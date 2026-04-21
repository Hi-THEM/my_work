import React from 'react';
import { Play, Clock, Target } from 'lucide-react';

export default function TodayPlan() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-transparent relative overflow-hidden group">
      <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-brand-blue rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-brand-blue mb-4">
          <Target className="w-5 h-5" />
          <span className="font-display font-bold text-sm uppercase tracking-widest">Plan d'aujourd'hui</span>
        </div>
        
        <h2 className="font-display text-3xl font-bold text-text-main mb-2">Haut du Corps - Puissance</h2>
        <p className="text-text-muted text-sm mb-6 max-w-[80%]">Focus sur le développé couché et les tractions. Intensité élevée (RPE 8-9).</p>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-text-muted" />
            <span className="font-mono text-sm font-medium text-text-main">45 MIN</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-text-muted" />
            <span className="font-mono text-sm font-medium text-text-main">350 KCAL</span>
          </div>
        </div>
        
        <button className="btn-press w-full py-4 bg-brand-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-colors">
          <Play className="w-5 h-5 fill-current" />
          COMMENCER LA SÉANCE
        </button>
      </div>
    </div>
  );
}

// Fixed missing Activity import in final file if needed, but I'll add it here
import { Activity } from 'lucide-react';
