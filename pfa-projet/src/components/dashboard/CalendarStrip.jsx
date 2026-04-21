import React from 'react';

export default function CalendarStrip() {
  const days = [
    { name: 'L', date: 15, active: false, logged: true },
    { name: 'M', date: 16, active: false, logged: false },
    { name: 'M', date: 17, active: false, logged: true },
    { name: 'J', date: 18, active: true, logged: false },
    { name: 'V', date: 19, active: false, logged: false },
    { name: 'S', date: 20, active: false, logged: false },
    { name: 'D', date: 21, active: false, logged: false },
  ];

  return (
    <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((day, i) => (
        <div 
          key={i} 
          className={`flex flex-col items-center min-w-[44px] p-2 rounded-xl transition-all duration-200 ${
            day.active ? 'bg-brand-blue text-white shadow-lg' : 'bg-secondary-bg text-text-muted border border-secondary-bg'
          }`}
        >
          <span className="text-[10px] font-bold uppercase mb-1 opacity-70">{day.name}</span>
          <span className="font-display text-lg font-bold">{day.date}</span>
          {day.logged && (
            <div className={`w-1 h-1 rounded-full mt-1 ${day.active ? 'bg-white' : 'bg-success'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}
