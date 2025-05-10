import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import ResultsStats from '../components/ResultsStats';
import { searchRecipes } from '../utils/api';
import RecipeTree from '../components/RecipeTree';
import styles from '../styles/Index.module.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      // validate input params
      if (searchParams.algorithm !== 'DFS' || searchParams.searchMode !== 'single') {
        // Jika algoritma atau mode belum diintegrasikan
        setResults({
          executionTime: 0,
          nodesVisited: 0,
          path: [],
          message: 'Resep belum ada karena belum diintegrasikan.',
        });
      } else {
        // Panggil API untuk DFS dan Shortest Path
        const data = await searchRecipes(searchParams);
        setResults(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SearchForm onSearch={handleSearch} />
        </div>
        <div className={styles.content}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {results && (
            <>
              {results.message ? (
                <p style={{ color: 'orange', fontWeight: 'bold' }}>{results.message}</p>
              ) : (
                <>
                  <ResultsStats
                    stats={{
                      time: results.executionTime / 1000, // Konversi ms ke detik
                      nodesVisited: results.nodesVisited,
                      recipesFound: results.path.length,
                    }}
                  />
                  <div className={styles.treeContainer}>
                    <RecipeTree paths={results.path} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}