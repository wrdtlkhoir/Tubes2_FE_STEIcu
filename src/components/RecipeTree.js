import React from "react";
import Tree from "react-d3-tree";
import styles from "../styles/RecipeTree.module.css";
import { useEffect, useRef, useState } from "react";

const CustomNode = ({ nodeDatum }) => (
  <g>
    <circle r={15} fill="lightblue" stroke="steelblue" strokeWidth={2} />
    <text fill="black" strokeWidth="1" x={20} y={5}>
      {nodeDatum.name}
    </text>
  </g>
);

const RecipeTree = ({ treeData }) => {
  const containerRef = React.useRef(null);

  if (!treeData) {
    return <div className={styles.treeContainer}>No tree data available.</div>;
  }

  return (
    <div className={styles.treeContainer}>
      <div className={styles.treeWrapper} ref={containerRef}>
        <Tree
          data={treeData}
          renderCustomNodeElement={({ nodeDatum }) => (
            <CustomNode nodeDatum={nodeDatum} />
          )}
          orientation="vertical"
          translate={{ x: 300, y: 100 }}
          collapsible={false}
        />
      </div>
    </div>
  );
};

export default RecipeTree;
