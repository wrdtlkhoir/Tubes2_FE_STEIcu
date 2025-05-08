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

  return (
    <div className={styles.treeContainer}>
      <Tree
        data={treeData}
        renderCustomNodeElement={({ nodeDatum }) => (
          <CustomNode nodeDatum={nodeDatum} />
        )}
        orientation="vertical"
      />
    </div>
  );
};

export default RecipeTree;