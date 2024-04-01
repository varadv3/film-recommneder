// App.js

import React, { useState } from 'react';
import FilmsList from './FilmsList';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Films Catalog</h1>
      <div className="mb-4">
        <label htmlFor="categorySelect" className="mr-2">Select a Category:</label>
        <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange} className="border rounded px-2 py-1">
          <option value="">Select...</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          {/* Add more options for other categories */}
        </select>
      </div>
      {selectedCategory && <FilmsList category={selectedCategory} />}
    </div>
  );
};

export default App;
