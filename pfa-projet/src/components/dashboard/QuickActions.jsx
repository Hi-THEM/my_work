import React from 'react';
import { Plus, Utensils, Scale, Dumbbell } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Dumbbell, label: 'Séance', color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { icon: Utensils, label: 'Repas', color: 'text-momentum', bg: 'bg-momentum/10' },
    { icon: Scale, label: 'Poids', color: 'text-in-progress', bg: 'bg-in-progress/10' },
  ];

  return (
    <div className="flex gap-4">
      {actions.map((action, i) => (
        <button 
          key={i} 
          className="btn-press flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl glass-card border border-secondary-bg hover:border-brand-blue/30 transition-colors"
        >
          <div className={`p-3 rounded-xl ${action.bg} ${action.color}`}>
            <action.icon className="w-6 h-6" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-text-main">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
