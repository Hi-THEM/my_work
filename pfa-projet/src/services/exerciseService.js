import { api } from './api';
import { mockExercises } from './mockData/mockExercises';

export const exerciseService = {
  getExercises: async (filters = {}) => {
    await api.get('/api/exercises', { params: filters });
    let results = [...mockExercises];
    
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(q) || e.nameFr.toLowerCase().includes(q));
    }
    if (filters.muscleGroup) {
      results = results.filter(e => e.muscleGroup === filters.muscleGroup);
    }
    
    return results;
  },

  getExerciseById: async (id) => {
    await api.get(`/api/exercises/${id}`);
    const exercise = mockExercises.find(e => e.id === Number(id));
    if (!exercise) throw new Error('Exercise not found');
    return exercise;
  },

  toggleFavorite: async (id) => {
    await api.post(`/api/exercises/${id}/favorite`);
    // In a real app we'd update the DB. Here we just pretend it succeeded.
    // For local mock persistence, we could update an array in localStorage.
    return { success: true };
  },

  getRecentlyUsed: async () => {
    await api.get('/api/exercises/recently-used');
    return [...mockExercises].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5);
  }
};
