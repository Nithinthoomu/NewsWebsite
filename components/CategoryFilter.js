import React from "react";

const categories = [
  "General",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-black-100">
      {categories.map((category) => (
        <button id="gradientBackground"
          key={category}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
