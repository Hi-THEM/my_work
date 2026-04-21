import React from 'react';
import { PlayCircle, Info } from 'lucide-react';

export default function ExerciseCard({ exercise, onClick }) {
  const difficultyColors = {
    beginner: 'text-success bg-success/10',
    intermediate: 'text-warning bg-warning/10',
    advanced: 'text-danger bg-danger/10',
  };

  return (
    <div 
      onClick={onClick}
      className="glass-card group relative flex flex-col rounded-2xl border border-secondary-bg overflow-hidden cursor-pointer h-full"
    >
      {/* Exercise Image/Thumbnail */}
      <div className="aspect-video w-full bg-secondary-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
           <PlayCircle className="w-12 h-12 text-white/80" />
        </div>
        <img 
          src={exercise.image || `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60`} 
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${difficultyColors[exercise.difficulty || 'beginner']}`}>
            {exercise.difficulty || 'Beginner'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-text-main uppercase mb-2 line-clamp-1">{exercise.name}</h3>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-[10px] font-bold text-text-muted bg-primary-bg px-2 py-1 rounded uppercase tracking-wide border border-secondary-bg">
            {exercise.muscleGroup}
          </span>
          <span className="text-[10px] font-bold text-text-muted bg-primary-bg px-2 py-1 rounded uppercase tracking-wide border border-secondary-bg">
            {exercise.equipment || 'Libre'}
          </span>
        </div>
      </div>
    </div>
  );
}
