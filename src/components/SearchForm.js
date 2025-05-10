import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [targetElement, setTargetElement] = useState('');
  const [algorithm, setAlgorithm] = useState('DFS');
  const [searchMode, setSearchMode] = useState('single');
  const [maxRecipes, setMaxRecipes] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      target: targetElement,
      algorithm,
      searchMode,
      maxRecipes: searchMode === 'multiple' ? maxRecipes : undefined,
    });
  };

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <input
            type="text"
            placeholder="Search for element..."
            value={targetElement}
            onChange={(e) => setTargetElement(e.target.value)}
            required
            className={styles.elementInput}
          />
        </div>
        <div className={styles.formRow}>
          <label>Algorithm:</label>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleButton} ${algorithm === 'DFS' ? styles.active : ''}`}
              onClick={() => setAlgorithm('DFS')}
            >
              DFS
            </button>
            <button
              type="button"
              className={`${styles.toggleButton} ${algorithm === 'BFS' ? styles.active : ''}`}
              onClick={() => setAlgorithm('BFS')}
            >
              BFS
            </button>
            <button
              type="button"
              className={`${styles.toggleButton} ${algorithm === 'Bidirectional' ? styles.active : ''}`}
              onClick={() => setAlgorithm('Bidirectional')}
            >
              Bidirectional
            </button>
          </div>
        </div>
        <div className={styles.formRow}>
          <label>Search Mode:</label>
          <div className={styles.toggleGroup}>
            <button
              type="button"
              className={`${styles.toggleButton} ${searchMode === 'single' ? styles.active : ''}`}
              onClick={() => setSearchMode('single')}
            >
              Shortest
            </button>
            <button
              type="button"
              className={`${styles.toggleButton} ${searchMode === 'multiple' ? styles.active : ''}`}
              onClick={() => setSearchMode('multiple')}
            >
              Multiple
            </button>
          </div>
        </div>
        {searchMode === 'multiple' && (
          <div className={styles.formRow}>
            <label>
              Max Recipes:
              <input
                type="number"
                min="1"
                value={maxRecipes}
                onChange={(e) => setMaxRecipes(Number(e.target.value))}
                className={styles.numberInput}
              />
            </label>
          </div>
        )}
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;