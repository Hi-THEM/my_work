import React from 'react';

export default function MuscleMap({ activeMuscle, onMuscleClick }) {
  // Simplified muscle groups
  const muscles = [
    { id: 'chest', name: 'Pectoraux', path: 'M 30,25 L 45,25 L 45,35 L 30,35 Z M 55,25 L 70,25 L 70,35 L 55,35 Z' },
    { id: 'abs', name: 'Abdominaux', path: 'M 40,40 L 60,40 L 60,60 L 40,60 Z' },
    { id: 'quads', name: 'Quadriceps', path: 'M 30,65 L 45,65 L 45,90 L 30,90 Z M 55,65 L 70,65 L 70,90 L 55,90 Z' },
    { id: 'shoulders', name: 'Épaules', path: 'M 20,20 L 28,20 L 28,30 L 20,30 Z M 72,20 L 80,20 L 80,30 L 72,30 Z' },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-64 bg-secondary-bg/30 rounded-2xl p-4 border border-secondary-bg">
        <svg viewBox="0 0 100 120" className="w-full h-full fill-text-muted/20 stroke-text-muted/40 stroke-[0.5]">
          {/* Base human silhouette (very abstract) */}
          <path d="M 50,5 C 45,5 40,10 40,15 C 40,20 45,25 50,25 C 55,25 60,20 60,15 C 60,10 55,5 50,5 Z M 40,25 L 60,25 L 75,50 L 70,55 L 60,35 L 60,100 L 52,100 L 52,65 L 48,65 L 48,100 L 40,100 L 40,35 L 30,55 L 25,50 Z" />
          
          {/* Interactive muscles */}
          {muscles.map(muscle => (
            <path
              key={muscle.id}
              d={muscle.path}
              className={`cursor-pointer transition-all duration-300 ${
                activeMuscle === muscle.id 
                  ? 'fill-energy-cyan shadow-[0_0_10px_#0EA5E9]' 
                  : 'hover:fill-energy-cyan/40'
              }`}
              onClick={() => onMuscleClick(muscle.id)}
            >
              <title>{muscle.name}</title>
            </path>
          ))}
        </svg>
      </div>
      <p className="text-[10px] font-bold text-text-muted mt-2 uppercase tracking-widest">Filtrage Anatomique</p>
    </div>
  );
}
