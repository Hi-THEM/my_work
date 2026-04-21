import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import FilterBar from '../components/exercises/FilterBar';
import ExerciseCard from '../components/exercises/ExerciseCard';
import ExerciseModal from '../components/exercises/ExerciseModal';
import MuscleMap from '../components/exercises/MuscleMap';
import { exerciseService } from '../services/exerciseService';
import { History, LayoutGrid, ListFilter } from 'lucide-react';

export default function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await exerciseService.getExercises();
      setExercises(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'Tous' || ex.muscleGroup === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-extrabold text-text-main uppercase tracking-tight">Bibliothèque d'Exercices</h1>
            <p className="text-text-muted font-medium mt-1">Explorez plus de 500 exercices avec guides détaillés.</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary-bg p-1 rounded-xl">
             <button className="p-2 bg-brand-blue text-white rounded-lg shadow-sm"><LayoutGrid className="w-5 h-5" /></button>
             <button className="p-2 text-text-muted hover:bg-primary-bg rounded-lg transition-colors"><ListFilter className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            <FilterBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              selectedFilter={selectedFilter} 
              setSelectedFilter={setSelectedFilter} 
            />

            {/* Recently Used Strip */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-text-muted">
                <History className="w-4 h-4" />
                <span className="font-display text-sm font-bold uppercase tracking-widest">Utilisés Récemment</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {exercises.slice(0, 4).map((ex) => (
                  <div key={ex.id} className="min-w-[240px] h-32">
                    <ExerciseCard exercise={ex} onClick={() => setSelectedExercise(ex)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl skeleton"></div>
                ))
              ) : filteredExercises.length > 0 ? (
                filteredExercises.map(ex => (
                  <ExerciseCard key={ex.id} exercise={ex} onClick={() => setSelectedExercise(ex)} />
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-secondary-bg rounded-full flex items-center justify-center mb-4 text-text-muted">
                    <LayoutGrid className="w-10 h-10 opacity-20" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-main uppercase">Aucun exercice trouvé</h3>
                  <p className="text-text-muted mt-2">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Anatomical Visual Filter */}
          <aside className="lg:col-span-3 sticky top-32 hidden lg:flex flex-col gap-6">
            <div className="glass-card p-6 rounded-3xl border border-secondary-bg">
              <h3 className="font-display text-lg font-bold text-text-main uppercase mb-6 text-center">Filtre Rapide</h3>
              <MuscleMap 
                activeMuscle={selectedFilter?.toLowerCase()} 
                onMuscleClick={(id) => {
                  const filterMap = { 'chest': 'Poitrine', 'abs': 'Abdominaux', 'quads': 'Jambes', 'shoulders': 'Épaules' };
                  setSelectedFilter(filterMap[id] || 'Tous');
                }} 
              />
              <div className="mt-8 space-y-2">
                 <p className="text-[10px] text-text-muted font-bold uppercase text-center">Statistiques Globales</p>
                 <div className="flex justify-between p-3 rounded-xl bg-primary-bg border border-secondary-bg">
                   <span className="text-[10px] font-bold text-text-muted uppercase">Favoris</span>
                   <span className="font-mono text-xs font-bold text-brand-blue">12</span>
                 </div>
                 <div className="flex justify-between p-3 rounded-xl bg-primary-bg border border-secondary-bg">
                   <span className="text-[10px] font-bold text-text-muted uppercase">Maîtrisés</span>
                   <span className="font-mono text-xs font-bold text-success">84%</span>
                 </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseModal 
        exercise={selectedExercise} 
        onClose={() => setSelectedExercise(null)} 
      />
    </MainLayout>
  );
}
