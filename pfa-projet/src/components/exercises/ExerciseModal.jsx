import React from 'react';
import { X, Play, Info, CheckCircle2 } from 'lucide-react';
import MuscleMap from './MuscleMap';

export default function ExerciseModal({ exercise, onClose }) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-primary-bg/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" 
        onClick={onClose}
      ></div>
      
      <div className="glass-card relative w-full max-w-4xl max-h-[90vh] rounded-3xl border border-secondary-bg shadow-2xl overflow-hidden flex flex-col animate-[scale-in_0.2s_ease-out]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-secondary-bg/50 backdrop-blur-md border-b border-secondary-bg">
          <h2 className="font-display text-3xl font-bold text-text-main uppercase tracking-tight">{exercise.name}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary-bg text-text-muted transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Visuals */}
            <div className="space-y-8">
              <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-secondary-bg relative group">
                <img 
                  src={exercise.image || `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60`}
                  className="w-full h-full object-cover"
                  alt="Exercise demo"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-brand-blue/90 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-secondary-bg flex items-center justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-text-muted uppercase mb-1">Cible Principale</h4>
                  <p className="font-display text-2xl font-bold text-brand-blue uppercase">{exercise.muscleGroup}</p>
                </div>
                <MuscleMap activeMuscle={exercise.muscleGroup?.toLowerCase()} onMuscleClick={() => {}} />
              </div>
            </div>

            {/* Right Column: Instructions & Cues */}
            <div className="space-y-8">
              <section>
                <h3 className="font-display text-xl font-bold text-text-main uppercase mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-energy-cyan" />
                  Instructions
                </h3>
                <div className="space-y-4">
                  {[
                    'Gardez le dos bien droit tout au long du mouvement.',
                    'Contrôlez la descente sur 2 secondes.',
                    'Expirez lors de la phase d\'effort maximal.',
                    'Ne verrouillez pas complètement les articulations en fin de mouvement.'
                  ].map((cue, i) => (
                    <div key={i} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                      <div className="mt-1 w-5 h-5 rounded-full bg-secondary-bg flex items-center justify-center shrink-0">
                        <span className="font-mono text-[10px] font-bold">{i+1}</span>
                      </div>
                      <p>{cue}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-display text-xl font-bold text-text-main uppercase mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Conseils de Forme (Bilingue)
                </h3>
                <div className="p-5 rounded-2xl bg-success/5 border border-success/20">
                   <p className="text-sm font-bold text-success uppercase mb-2">PRO TIP:</p>
                   <p className="text-sm text-text-main mb-3 italic">"Focus on the mind-muscle connection during the squeeze."</p>
                   <p className="text-sm text-text-muted italic border-t border-success/10 pt-3">"Concentrez-vous sur la connexion esprit-muscle pendant la contraction."</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
