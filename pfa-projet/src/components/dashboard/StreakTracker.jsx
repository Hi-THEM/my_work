import React from 'react';
import { Flame } from 'lucide-react';

export default function StreakTracker({ streak }) {
  return (
    <div className="glass-card p-4 rounded-2xl border border-gold-start/20 flex items-center gap-4 bg-gold-start/5">
      <div className="relative">
        <div className="absolute inset-0 bg-gold-start blur-lg opacity-40 animate-pulse rounded-full"></div>
        <Flame className="w-10 h-10 text-gold-start relative z-10 animate-[bounce_2s_infinite]" />
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-text-main tabular-nums leading-none">
          {streak} {streak > 1 ? 'JOURS' : 'JOUR'}
        </div>
        <div className="text-xs font-bold text-gold-end uppercase tracking-widest mt-1">
          SÉRIE ACTUELLE 🔥
        </div>
      </div>
    </div>
  );
}
