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
  const [currentTreeIndex, setCurrentTreeIndex] = useState(0);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setCurrentTreeIndex(0);

    try {
      // Simple API call without conditional branching
      const data = await searchRecipes(searchParams);
      setResults(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handler for next recipe button
  const handleNextTree = () => {
    if (results && results.trees && currentTreeIndex < results.trees.length - 1) {
      setCurrentTreeIndex(currentTreeIndex + 1);
    }
  };

  // Handler for previous recipe button
  const handlePrevTree = () => {
    if (results && results.trees && currentTreeIndex > 0) {
      setCurrentTreeIndex(currentTreeIndex - 1);
    }
  };

  const getCurrentTree = () => {
    if (!results || !results.trees) return null;
    return results.trees[currentTreeIndex];
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
                      time: results.executionTime,
                      nodesVisited: results.nodesVisited,
                      recipesFound: results.trees ? results.trees.length : (results.tree ? 1 : 0),
                    }}
                  />
                  {results.trees && results.trees.length > 1 && (
                    <div className={styles.paginationControls}>
                      <button 
                        onClick={handlePrevTree}
                        disabled={currentTreeIndex === 0}
                        className={styles.paginationButton}
                      >
                        Prev
                      </button>
                      <span className={styles.paginationInfo}>
                        Recipe {currentTreeIndex + 1} of {results.trees.length}
                      </span>
                      <button 
                        onClick={handleNextTree}
                        disabled={currentTreeIndex === results.trees.length - 1}
                        className={styles.paginationButton}
                      >
                        Next
                      </button>
                    </div>
                  )}
                  <div className={styles.treeContainer}>
                    {results.trees ? (
                      <RecipeTree treeData={getCurrentTree()} />
                    ) : results.tree ? (
                      <RecipeTree treeData={results.tree} />
                    ) : (
                      <p>No recipe tree data available</p>
                    )}
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