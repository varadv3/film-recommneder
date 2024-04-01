import React, { useState, useEffect } from 'react';

const FilmRecommendations = () => {
  const [films, setFilms] = useState([]);
  const [category, setCategory] = useState('action'); // Initial category

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(`http://localhost:8000/films/${category}`);
        if (!response.ok) {
          throw new Error('Category not found');
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error.message);
      }
    };
    fetchFilms();
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleButtonClick = () => {
    // Do something when the button is clicked
    console.log('Button clicked!');
  };

  return (
    <div>
      <h2>Film Recommendations</h2>
      <select value={category} onChange={handleCategoryChange}>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        {/* Add other category options here */}
      </select>
      <button onClick={handleButtonClick}>Click me</button>
      <ul>
        {films.map((film, index) => (
          <li key={index}>
            <strong>Title:</strong> {film.title} - <em>Description:</em> {film.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmRecommendations;
