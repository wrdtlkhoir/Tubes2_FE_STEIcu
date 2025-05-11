import axios from 'axios';

let apiBaseUrl;
let apiPath = '/api/search';

// Gunakan dari environment variable, atau fallback ke Railway
if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl.includes('/api/search')) {
    apiBaseUrl = envUrl.replace('/api/search', '');
  } else {
    apiBaseUrl = envUrl;
  }
} else {
  // Fallback langsung ke deploy URL
  apiBaseUrl = 'https://tubes2besteicu-production.up.railway.app';
}

console.log(`Using API URL: ${apiBaseUrl}${apiPath}`);

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
