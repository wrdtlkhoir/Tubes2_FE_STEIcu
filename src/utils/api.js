import axios from 'axios';

// Mendapatkan base URL dan path secara terpisah
let apiBaseUrl;
let apiPath = '/api/search';

if (typeof window !== 'undefined') {
  // Check if we are running in a Node.js environment (for example, during SSR or static site generation in Next.js)
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    // For production environment (handle URL modification)
    if (envUrl.includes('/api/search')) {
      apiBaseUrl = envUrl.replace('/api/search', ''); // Remove `/api/search` part
    } else {
      apiBaseUrl = envUrl;
    }
  } else {
    // Check if running locally (e.g., localhost or another local environment)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Use your local API base URL when running locally
      apiBaseUrl = 'http://localhost:8080';
    } else {
      // Fallback to production URL if not localhost (for deployed environment)
      apiBaseUrl = 'https://tubes2besteicu-production.up.railway.app/api/search';
    }
  }
}

export const searchRecipes = async (params) => {
  try {
    const url = `${apiBaseUrl}${apiPath}`;
    console.log('Sending request to:', url, 'with params:', params);
    
    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};