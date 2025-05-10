import React from "react";
import Tree from "react-d3-tree";
import styles from "../styles/RecipeTree.module.css";

function pathsToTree(paths) {
  if (!paths || paths.length === 0) return null;
  const rootName = paths[0][0];
  const root = { name: rootName, children: [] };

  for (const path of paths) {
    let current = root;
    for (let i = 1; i < path.length; i++) {
      let child = current.children.find(c => c.name === path[i]);
      if (!child) {
        child = { name: path[i], children: [] };
        current.children.push(child);
      }
      current = child;
    }
  }
  return root;
}

const CustomNode = ({ nodeDatum }) => (
  <g>
    <circle r={15} fill="lightblue" stroke="steelblue" strokeWidth={2} />
    <text fill="black" strokeWidth="1" x={20} y={5}>
      {nodeDatum.name}
    </text>
  </g>
);

const RecipeTree = ({ paths }) => {
  if (!paths || paths.length === 0) {
    return <div className={styles.treeContainer}>No recipes found.</div>;
  }

  const treeData = [pathsToTree(paths)];
  // Pagination controls
  const handlePrevRecipe = () => {
    setActiveRecipe((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextRecipe = () => {
    setActiveRecipe((prev) => (prev < recipes.length - 1 ? prev + 1 : prev));
  };
  // Setting tree size and position
  const containerRef = React.useRef(null);

  return (
    <div className={styles.treeContainer}>
      <div className={styles.treeWrapper} ref={containerRef}>
        <Tree
          data={treeData}
          renderCustomNodeElement={({ nodeDatum }) => (
            <CustomNode nodeDatum={nodeDatum} />
          )}
          orientation="vertical"
          translate={{ x: 200, y: 100 }}
        />
      </div>
    </div>
  );
};

export default RecipeTree;
