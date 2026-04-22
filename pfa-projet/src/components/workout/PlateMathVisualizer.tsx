import React from 'react';

interface PlateMathVisualizerProps {
  weight: number;
}

export default function PlateMathVisualizer({ weight }: PlateMathVisualizerProps) {
  // Bar weight is usually 45 lbs (20kg)
  const barWeight = 45;
  const sideWeight = (weight - barWeight) / 2;

  if (sideWeight <= 0) return null;

  const plates = [
    { value: 45, color: '#E6A700' }, // Gold for 45
    { value: 25, color: '#A3A3A3' },
    { value: 10, color: '#A3A3A3' },
    { value: 5, color: '#A3A3A3' },
    { value: 2.5, color: '#A3A3A3' },
  ];

  let remaining = sideWeight;
  const layout: number[] = [];

  plates.forEach(p => {
    while (remaining >= p.value) {
      layout.push(p.value);
      remaining -= p.value;
    }
  });

  return (
    <div className="flex items-center gap-1 h-12">
      {layout.map((p, i) => {
        const plateInfo = plates.find(plt => plt.value === p);
        const height = 16 + (p / 45) * 24;
        const width = 4 + (p / 45) * 4;
        
        return (
          <div 
            key={i} 
            className="rounded-sm shadow-lg border border-white/10"
            style={{ 
              height: `${height}px`, 
              width: `${width}px`, 
              backgroundColor: plateInfo?.color || '#A3A3A3',
              boxShadow: plateInfo?.value === 45 ? '0 0 10px rgba(230,167,0,0.3)' : 'none'
            }}
          />
        );
      })}
      {/* Bar End */}
      <div className="w-16 h-2 bg-text-dim/30 rounded-full -ml-1 flex items-center justify-center">
        <span className="font-micro text-[7px] text-text-dim">45 BAR</span>
      </div>
    </div>
  );
}
