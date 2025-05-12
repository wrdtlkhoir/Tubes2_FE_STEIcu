import React from 'react';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2025 Little Alchemy Recipe Finder | Created by Steicu Team</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;