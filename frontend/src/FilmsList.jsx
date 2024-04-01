// FilmsList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmsList = ({ category }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/films/${category}`);
        setFilms(response.data);
      } catch (error) {
        console.error('Error fetching films:', error);
        setFilms([]); // Set films to an empty array in case of error
      }
    };
    fetchData();
  }, [category]);

  // Check if films is an array, if not, wrap it in an array
  const filmsArray = Array.isArray(films) ? films : [films];

  return (
    <div>
      <h2>Films in {category}</h2>
      <ul>
        {filmsArray.map((film, index) => (
          <li key={index}>
            <strong>{film.title}</strong>: {film.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmsList;
