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
      if(searchParams.algorithm === 'DFS' && searchParams.searchMode === 'single') {
        const data = await searchRecipes(searchParams);
        setResults(data);
      } else if (searchParams.algorithm === 'BFS' && searchParams.searchMode === 'single') {
        const data = await searchRecipes(searchParams);
        setResults(data);
      // }
      // else if (searchParams.algorithm === 'Bidirectional' && searchParams.searchMode === 'single') {
      //   const data = await searchRecipes(searchParams);
      //   setResults(data);
      // } else if (searchParams.algorithm === 'Bidirectional' && searchParams.searchMode === 'multiple') {
      //   const data = await searchRecipes(searchParams);
      //   setResults(data);
      // } else if (searchParams.algorithm === 'BFS' && searchParams.searchMode === 'multiple') {
      //   const data = await searchRecipes(searchParams);
      //   setResults(data);
      // } else if (searchParams.algorithm === 'DFS' && searchParams.searchMode === 'multiple') {
      //   const data = await searchRecipes(searchParams);
      //   setResults(data);
      } else
        setResults({
          executionTime: 0,
          nodesVisited: 0,
          path: [],
          message: 'Resep belum ada karena belum diintegrasikan.',
        });
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
                      recipesFound: results.tree.length,
                    }}
                  />
                  <div className={styles.treeContainer}>
                    <RecipeTree treeData={results.tree} />
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