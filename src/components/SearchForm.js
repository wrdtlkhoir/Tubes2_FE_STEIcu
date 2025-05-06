import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [targetElement, setTargetElement] = useState('');
  const [algorithm, setAlgorithm] = useState('BFS');
  const [searchMode, setSearchMode] = useState('shortest');
  const [maxRecipes, setMaxRecipes] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      targetElement,
      algorithm,
      searchMode,
      maxRecipes: searchMode === 'multiple' ? maxRecipes : 1
    });
  };

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Search for element..."
              value={targetElement}
              onChange={(e) => setTargetElement(e.target.value)}
              required
              className={styles.elementInput}
            />
          </div>
          
          <div className={styles.toggleGroup}>
            <div className={styles.toggle}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${algorithm === 'BFS' ? styles.active : ''}`}
                onClick={() => setAlgorithm('BFS')}
              >
                BFS
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${algorithm === 'DFS' ? styles.active : ''}`}
                onClick={() => setAlgorithm('DFS')}
              >
                DFS
              </button>
            </div>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.modeToggle}>
            <div className={styles.toggle}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${searchMode === 'shortest' ? styles.active : ''}`}
                onClick={() => setSearchMode('shortest')}
              >
                Shortest Path
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${searchMode === 'multiple' ? styles.active : ''}`}
                onClick={() => setSearchMode('multiple')}
              >
                Multiple Recipes
              </button>
            </div>
          </div>

          {searchMode === 'multiple' && (
            <div className={styles.maxRecipesInput}>
              <input
                type="number"
                min="1"
                max="20"
                value={maxRecipes}
                onChange={(e) => setMaxRecipes(parseInt(e.target.value))}
                className={styles.numberInput}
              />
            </div>
          )}

          <button type="submit" className={styles.searchButton}>
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;