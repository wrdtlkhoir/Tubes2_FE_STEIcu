import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [targetElement, setTargetElement] = useState('');
  const [algorithm, setAlgorithm] = useState('DFS');
  const [searchMode, setSearchMode] = useState('shortest');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      target: targetElement,
      algorithm,
      searchMode,
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
          <label>
            Algorithm:
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className={styles.selectInput}
            >
              <option value="DFS">DFS</option>
              <option value="BFS">BFS</option>
            </select>
          </label>
        </div>
        <div className={styles.formRow}>
          <label>
            Search Mode:
            <select
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value)}
              className={styles.selectInput}
            >
              <option value="shortest">Shortest Path</option>
              <option value="multiple">Multiple Paths</option>
            </select>
          </label>
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;