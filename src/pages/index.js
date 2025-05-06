import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import ResultsStats from '../components/ResultsStats';
import RecipeTree from '../components/RecipeTree';
import { searchRecipes } from '../utils/api';
import styles from '../styles/Home.module.css';

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
      setError('Failed to search recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for testing UI
  const mockResults = {
    stats: {
      time: 0.23,
      nodesVisited: 42,
      recipesFound: 3
    },
    recipes: [
      {
        name: 'Brick',
        children: [
          {
            name: 'Clay',
            children: [
              { name: 'Earth', children: [] },
              { name: 'Water', children: [] }
            ]
          },
          { name: 'Fire', children: [] }
        ]
      },
      {
        name: 'Brick',
        children: [
          {
            name: 'Mud',
            children: [
              { name: 'Earth', children: [] },
              { name: 'Water', children: [] }
            ]
          },
          { name: 'Fire', children: [] }
        ]
      },
      {
        name: 'Brick',
        children: [
          {
            name: 'Clay',
            children: [
              { name: 'Earth', children: [] },
              { name: 'Water', children: [] }
            ]
          },
          { 
            name: 'Sun',
            children: [
              { name: 'Fire', children: [] },
              { name: 'Sky', children: [] }
            ] 
          }
        ]
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <title>Little Alchemy 2 Recipe Finder</title>
        <meta name="description" content="Find recipes in Little Alchemy 2 using BFS and DFS algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <SearchForm onSearch={handleSearch} />
        
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Searching for recipes...</p>
          </div>
        )}
        
        {error && (
          <div className={styles.errorContainer}>
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && results && (
          <>
            <ResultsStats stats={results.stats} />
            <RecipeTree recipes={results.recipes} />
          </>
        )}
        
        {/* For testing UI without backend */}
        {!loading && !error && !results && (
          <>
            <div className={styles.introContainer}>
              <h2>Welcome to Little Alchemy 2 Recipe Finder</h2>
              <p>
                Search for any element and discover the recipes to create it.
                Choose between BFS (Breadth-First Search) or DFS (Depth-First Search) algorithms
                to find either the shortest path or multiple recipes.
              </p>
              <p>
                Get started by entering an element name in the search box above.
              </p>
            </div>
            {/* Uncomment to test with mock data */}
            {/* <ResultsStats stats={mockResults.stats} />
            <RecipeTree recipes={mockResults.recipes} /> */}
          </>
        )}
      </div>
    </Layout>
  );
}