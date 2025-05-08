import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { searchRecipes } from '../utils/api';
import RecipeTree from '../components/RecipeTree';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchRecipes(searchParams);
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Little Alchemy 2 Recipe Finder</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results && results.path && (
        <RecipeTree paths={results.path} />
      )}
    </div>
  );
}
