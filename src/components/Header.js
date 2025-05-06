import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}></div>
        </div>
        <h1 className={styles.title}>Little Alchemy 2 Recipe Finder</h1>
      </div>
    </header>
  );
};

export default Header;