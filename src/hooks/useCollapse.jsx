// src/hooks/useCollapse.js
import { useState } from "react";

export function useCollapse() {
  const [collapsedStages, setCollapsedStages] = useState({});

  const toggleCollapse = (stageName) => {
    setCollapsedStages((prev) => ({
      ...prev,
      [stageName]: !prev[stageName],
    }));
  };

  return { collapsedStages, toggleCollapse };
}
