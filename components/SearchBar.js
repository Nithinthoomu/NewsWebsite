import React, { useState } from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [input, setInput] = useState(searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <input
        type="text"
        placeholder="Search news..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 rounded max-w-xl w-full"
      />
      <button id="gradientBackground" type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
