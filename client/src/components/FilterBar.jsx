import React, { useState } from "react";
import "./FilterBar.css";

const categories = [
  "All",
  "React",
  "Node.js",
  "MongoDB",
  "Frontend",
  "Backend",
  "JavaScript",
  "Tech News",
];

const FilterBar = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-button ${selected === cat ? "active" : ""}`}
          onClick={() => setSelected(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
