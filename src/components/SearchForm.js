import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

function capitalizeFirst(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const SearchForm = ({ onSearch }) => {
  const [targetElement, setTargetElement] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [searchMode, setSearchMode] = useState('');
  const [maxRecipes, setMaxRecipes] = useState(1);
  const validTarget = capitalizeFirst(targetElement)

  const handleSubmit = (e) => {
    e.preventDefault();
    // pastikan hanya kirim jika semua valid
    if (!targetElement || !algorithm || !searchMode) return;

    onSearch({
      target: validTarget,
      algorithm,
      searchMode,
      maxRecipes: parseInt(maxRecipes),
    });

    console.log("target: " + validTarget)
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
            {['DFS', 'BFS', 'Bidirectional'].map((alg) => (
              <button
                key={alg}
                type="button"
                className={`${styles.toggleButton} ${algorithm === alg ? styles.active : ''}`}
                onClick={() => setAlgorithm(alg)}
              >
                {alg}
              </button>
            ))}
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
              Single
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
        <button
          type="submit"
          className={styles.searchButton}
          disabled={!targetElement || !algorithm || !searchMode}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
