import { api } from './api';

export const supplementService = {
  getSupplements: async () => {
    await api.get('/api/supplements');
    return JSON.parse(localStorage.getItem('fittrack_supplements_list') || '[]');
  },

  logSupplement: async (id, date) => {
    await api.post(`/api/supplements/${id}/log`, { date });
    const logs = JSON.parse(localStorage.getItem('fittrack_supplements_logs') || '[]');
    logs.push({ supplementId: id, date, loggedAt: new Date().toISOString() });
    localStorage.setItem('fittrack_supplements_logs', JSON.stringify(logs));
    return { success: true };
  },

  getDailyChecklist: async (date) => {
    await api.get(`/api/supplements/checklist?date=${date}`);
    return []; // Mock
  }
};

export const progressService = {
  logWeight: async (data) => {
    await api.post('/api/progress/weight', data);
    const progress = JSON.parse(localStorage.getItem('fittrack_progress') || '[]');
    const newLog = { ...data, id: Date.now() };
    progress.push(newLog);
    localStorage.setItem('fittrack_progress', JSON.stringify(progress));
    return newLog;
  },

  getWeightHistory: async (days) => {
    await api.get(`/api/progress/weight?days=${days}`);
    return JSON.parse(localStorage.getItem('fittrack_progress') || '[]');
  },

  getMeasurements: async () => {
    await api.get('/api/progress/measurements');
    return []; // Mock
  }
};

export const exportService = {
  generatePdf: async (type, data) => {
    await api.post('/api/export/pdf', { type, data });
    console.log("PDF generation triggered for", type);
    return { success: true };
  },

  generateCsv: async (type, data) => {
    await api.post('/api/export/csv', { type, data });
    console.log("CSV generation triggered for", type);
    return { success: true };
  }
};
