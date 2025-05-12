import axios from 'axios';

// Mendapatkan base URL dan path secara terpisah
let apiBaseUrl;
let apiPath = '/api/search';

// Cek apakah URL dari env sudah mengandung path
if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl.includes('/api/search')) {
    // URL sudah memiliki path
    apiBaseUrl = envUrl.replace('/api/search', '');
  } else {
    // URL hanya berisi base
    apiBaseUrl = envUrl;
  }
} else {
  // Fallback untuk development
  apiBaseUrl = 'http://localhost:8080';
}

// Untuk browser, gunakan hostname dari window
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  apiBaseUrl = `http://${hostname}:8080`;
  console.log(`Using browser-detected API URL: ${apiBaseUrl}${apiPath}`);
} else {
  console.log(`Using server-side API URL: ${apiBaseUrl}${apiPath}`);
}

      apiBaseUrl = envUrl.replace('/api/search', ''); // Remove `/api/search` part
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