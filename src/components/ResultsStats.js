import React from 'react';
import styles from '../styles/ResultsStats.module.css';

const ResultsStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        <span className={styles.label}>Search time:</span>
        <span className={styles.value}>{stats.time}s</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>Nodes visited:</span>
        <span className={styles.value}>{stats.nodesVisited}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>Recipes found:</span>
        <span className={styles.value}>{stats.recipesFound}</span>
      </div>
    </div>
  );
};

export default ResultsStats;