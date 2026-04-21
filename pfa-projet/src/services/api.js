// Mock API Wrapper
// Simulates an Axios instance to interact with our mock data and localStorage

const DELAY_MIN = 200;
const DELAY_MAX = 500;

function simulateDelay() {
  const delay = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const api = {
  get: async (url, config = {}) => {
    await simulateDelay();
    return mockRouter('GET', url, null, config);
  },
  post: async (url, data, config = {}) => {
    await simulateDelay();
    return mockRouter('POST', url, data, config);
  },
  put: async (url, data, config = {}) => {
    await simulateDelay();
    return mockRouter('PUT', url, data, config);
  },
  delete: async (url, config = {}) => {
    await simulateDelay();
    return mockRouter('DELETE', url, null, config);
  }
};

// Simplified router to dispatch mock requests
function mockRouter(method, url, data, config) {
  // We'll add routing logic as we build the specific services
  // For now, this is just the interceptor point.
  console.log(`[Mock API] ${method} ${url}`, data || '');
  return { data: { success: true, message: "Mocked response" } };
}
