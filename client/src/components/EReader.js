import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EReader = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="e-reader">
      <h1>E-Reader</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <a href={`/${book.filePath}`} target="_blank" rel="noopener noreferrer">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EReader;
