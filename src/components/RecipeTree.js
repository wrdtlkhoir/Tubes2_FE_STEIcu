import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import styles from '../styles/RecipeTree.module.css';

// Custom component for the nodes
const CustomNode = ({ nodeDatum }) => (
  <g>
    <rect
      width="120"
      height="40"
      x="-60"
      y="-20"
      rx="6"
      fill="#FFFFFF"
      stroke="#FF6B00"
      strokeWidth="2"
    />
    <text
      x="0"
      y="5"
      textAnchor="middle"
      style={{ fill: '#333333', fontSize: '14px' }}
    >
      {nodeDatum.name}
    </text>
  </g>
);

const RecipeTree = ({ recipes, currentRecipe = 0 }) => {
  const [activeRecipe, setActiveRecipe] = useState(currentRecipe);

  if (!recipes || recipes.length === 0) {
    return (
      <div className={styles.emptyTree}>
        <p>No recipes found. Try searching for an element.</p>
      </div>
    );
  }

  // Pagination controls
  const handlePrevRecipe = () => {
    setActiveRecipe((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextRecipe = () => {
    setActiveRecipe((prev) => (prev < recipes.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className={styles.treeContainer}>
      <div className={styles.treeWrapper}>
        <Tree
          data={recipes[activeRecipe]}
          orientation="vertical"
          pathFunc="step"
          separation={{ siblings: 2, nonSiblings: 2 }}
          nodeSize={{ x: 150, y: 80 }}
          translate={{ x: 350, y: 50 }}
          renderCustomNodeElement={CustomNode}
          collapsible={false}
        />
      </div>
      
      {recipes.length > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageButton} 
            onClick={handlePrevRecipe}
            disabled={activeRecipe === 0}
          >
            ⟨
          </button>
          
          {recipes.map((_, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${index === activeRecipe ? styles.activePage : ''}`}
              onClick={() => setActiveRecipe(index)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className={styles.pageButton} 
            onClick={handleNextRecipe}
            disabled={activeRecipe === recipes.length - 1}
          >
            ⟩
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeTree;