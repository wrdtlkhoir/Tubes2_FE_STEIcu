import axios from 'axios';

// Mendapatkan base URL dan path secara terpisah
let apiBaseUrl;
let apiPath = '/api/search';

// Untuk browser, gunakan URL yang berasal dari environment variable khusus Railway
// atau gunakan hostname dari browser jika tersedia
if (typeof window !== 'undefined') {
  // Dalam browser
  const hostname = window.location.hostname;
  
  // Jika di Railway atau environment lain
  if (hostname.includes('railway.app') || !hostname.includes('localhost')) {
    // Gunakan URL backend yang sudah dikonfigurasi di Railway
    apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tubes2besteicu-production.up.railway.app/';
  } else {
    // Lokal development
    apiBaseUrl = 'http://localhost:8080';
  }
  
  console.log(`Using API URL: ${apiBaseUrl}${apiPath}`);
} else {
  // Server-side rendering, gunakan environment variable
  apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  console.log(`Using server-side API URL: ${apiBaseUrl}${apiPath}`);
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