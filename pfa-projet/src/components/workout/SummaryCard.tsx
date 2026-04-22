import React, { useEffect, useState } from 'react';
import type { WorkoutSession } from '../../types/fitness';
import { Trophy, ArrowRight, Share2 } from 'lucide-react';

interface SummaryCardProps {
  session: WorkoutSession;
  onFinish: () => void;
}

const SUMMARY_TEXT = "Séance incroyable ! Votre volume total a augmenté par rapport à la semaine dernière. La constance est la clé de la croissance. Continuez comme ça, champion !";

interface StatItemProps { label: string; value: string; delay: number; }
function StatItem({ label, value, delay }: StatItemProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div
      className="glass-card p-4 rounded-2xl border border-white/5 text-center transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
    >
      <div className="text-[10px] font-bold text-text-muted uppercase mb-1">{label}</div>
      <div className="font-mono text-2xl font-black text-text-main">{value}</div>
    </div>
  );
}

export default function SummaryCard({ session, onFinish }: SummaryCardProps) {
  const [displayText, setDisplayText] = useState('');
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowIcon(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplayText(SUMMARY_TEXT.slice(0, i));
      i++;
      if (i > SUMMARY_TEXT.length) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, []);

  const formatDuration = (s: number) => `${Math.floor(s / 60)} min`;
  const completedSets = session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isCompleted).length, 0);

  return (
    <div className="min-h-screen bg-primary-bg p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full flex flex-col gap-8">
        {/* Trophy Icon */}
        <div
          className="w-24 h-24 bg-gradient-to-tr from-gold-start to-gold-end rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(245,158,11,0.35)] transition-all duration-700"
          style={{ opacity: showIcon ? 1 : 0, transform: showIcon ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)' }}
        >
          <Trophy className="w-12 h-12 text-white" />
        </div>

        <h1 className="font-display text-4xl font-black text-center uppercase tracking-tight text-text-main">
          Mission Accomplie
        </h1>

        {/* AI Summary */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 min-h-[88px]">
          <p className="text-text-muted text-sm leading-relaxed italic">
            "{displayText}
            <span className="inline-block w-0.5 h-4 bg-brand-blue ml-0.5 align-middle animate-pulse" />
            "
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="Volume Total"     value={`${session.totalVolume} kg`}     delay={600} />
          <StatItem label="Durée"             value={formatDuration(session.duration)} delay={800} />
          <StatItem label="Séries complètes" value={String(completedSets)}           delay={1000} />
          <StatItem label="XP Gagné"          value={`+${Math.round(session.xpEarned)}`} delay={1200} />
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onFinish}
            className="w-full py-5 bg-brand-blue text-white font-bold rounded-2xl uppercase tracking-widest shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Retour au Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full py-4 bg-secondary-bg text-text-muted font-bold rounded-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:text-text-main transition-colors">
            <Share2 className="w-4 h-4" /> Partager
          </button>
        </div>
      </div>
    </div>
  );
}
