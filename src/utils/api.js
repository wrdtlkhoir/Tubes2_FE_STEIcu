import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const searchRecipes = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/api/search`, params);
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};