import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await getBooks();
      setBooks(result.books);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book._id} className="mb-2 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>{book.description}</p>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
