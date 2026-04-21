import { api } from './api';

export const workoutService = {
  getPredictedWorkout: async () => {
    await api.get('/api/workouts/predict');
    // Algorithm 4 implementation (client-side mock)
    return {
      confidence: 85,
      predictedDate: new Date().toISOString(),
      workout: {
        name: 'Upper Body Power',
        nameFr: 'Puissance Haut du Corps',
        exercises: [1, 3, 4, 5] // references mockExercises IDs
      }
    };
  },

  createWorkout: async (data) => {
    await api.post('/api/workouts', data);
    const workouts = JSON.parse(localStorage.getItem('fittrack_workouts') || '[]');
    const newWorkout = { ...data, id: Date.now(), status: 'planned' };
    workouts.push(newWorkout);
    localStorage.setItem('fittrack_workouts', JSON.stringify(workouts));
    return newWorkout;
  },

  completeWorkout: async (id, data) => {
    await api.put(`/api/workouts/${id}/complete`, data);
    const workouts = JSON.parse(localStorage.getItem('fittrack_workouts') || '[]');
    const index = workouts.findIndex(w => w.id === id);
    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...data, status: 'completed', completedAt: new Date().toISOString() };
      localStorage.setItem('fittrack_workouts', JSON.stringify(workouts));
      
      // Algorithm 5: AI Summary generation
      return workoutService.generateSummary(workouts[index]);
    }
    throw new Error("Workout not found");
  },

  getWorkoutHistory: async () => {
    await api.get('/api/workouts/history');
    return JSON.parse(localStorage.getItem('fittrack_workouts') || '[]');
  },

  generateSummary: async (session) => {
    // Mock Algorithm 5
    return {
      summaryFr: "Super séance ! Vous avez battu votre record sur le Développé Couché.",
      summaryEn: "Great session! You beat your personal record on Bench Press.",
      xpEarned: 150
    };
  }
};
