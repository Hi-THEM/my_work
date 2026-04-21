import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, unit, trend, colorClass, sparklineData }) {
  const isPositive = trend >= 0;
  
  return (
    <div className="glass-card p-5 rounded-2xl border border-secondary-bg flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <span className="font-display text-sm font-bold text-text-muted uppercase tracking-wider">{label}</span>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-mono text-3xl font-bold text-text-main tabular-nums">{value}</span>
        <span className="text-text-muted text-sm font-medium">{unit}</span>
      </div>
      
      {/* Sparkline Placeholder */}
      <div className="mt-auto h-12 w-full overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={`var(--color-${colorClass})`}
            strokeWidth="2"
            points={sparklineData || "0,30 20,25 40,35 60,15 80,20 100,10"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
