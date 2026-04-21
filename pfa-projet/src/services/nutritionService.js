import { api } from './api';

export const nutritionService = {
  logMeal: async (data) => {
    await api.post('/api/nutrition/meals', data);
    const meals = JSON.parse(localStorage.getItem('fittrack_meals') || '[]');
    const newMeal = { ...data, id: Date.now(), loggedAt: new Date().toISOString() };
    meals.push(newMeal);
    localStorage.setItem('fittrack_meals', JSON.stringify(meals));
    return newMeal;
  },

  getDailySummary: async (date) => {
    await api.get(`/api/nutrition/summary?date=${date}`);
    const meals = JSON.parse(localStorage.getItem('fittrack_meals') || '[]');
    const todaysMeals = meals.filter(m => m.date === date);
    
    return todaysMeals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  },

  getRecipes: async (filters = {}) => {
    await api.get('/api/nutrition/recipes', { params: filters });
    return []; // Return mockRecipes later
  },

  getSuggestedRecipes: async () => {
    await api.get('/api/nutrition/recipes/suggested');
    return []; // Algorithm 7 mock
  }
};
