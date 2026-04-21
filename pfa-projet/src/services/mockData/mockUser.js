export const mockUser = {
  id: 1,
  email: 'demo@fittrack.tn',
  password_hash: 'demo123', // Simplified for frontend mock
  firstName: 'Démo',
  lastName: 'Utilisateur',
  role: 'user',
  profile: {
    heightCm: 175,
    currentWeightKg: 70,
    goalWeightKg: 65,
    activityLevel: 'light',
    goalType: 'lose_weight',
    experienceLevel: 'beginner',
    workoutDaysPerWeek: 3,
    workoutDurationMin: 45,
    dailyCalorieTarget: 1600
  },
  preferences: {
    theme: 'system',
    language: 'fr',
    emailWeeklySummary: true
  },
  gamification: {
    totalXp: 2450,
    currentLevel: 5,
    currentStreak: 12,
    bestStreak: 28,
    streakFreezes: 1
  }
};
