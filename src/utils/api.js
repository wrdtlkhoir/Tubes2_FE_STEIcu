import axios from 'axios';

let apiBaseUrl;
let apiPath = '/api/search';

if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl.includes('/api/search')) {
    apiBaseUrl = envUrl.replace('/api/search', '');
  } else {
    apiBaseUrl = 'http://localhost:8080';
  }
} else if (typeof window !== 'undefined') {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    apiBaseUrl = 'http://localhost:8080';
  } else {
    apiBaseUrl = 'https://tubes2besteicu-production.up.railway.app';
  }
} else {
  // Default fallback if neither process.env nor window available (e.g. during build)
  apiBaseUrl = 'https://tubes2besteicu-production.up.railway.app';
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
