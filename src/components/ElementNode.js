import React from 'react';
import styles from '../styles/ElementNode.module.css';

const ElementNode = ({ name }) => {
  return (
    <div className={styles.elementNode}>
      <span className={styles.elementName}>{name}</span>
    </div>
  );
};

export default ElementNode;