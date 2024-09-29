import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries'; // Assuming you have this query ready.

export const BookListContext = createContext();

export const BookProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data.books); // Assuming data.books is the array of books.
    }
  }, [data]);

  return (
    <BookListContext.Provider value={{ books, loading, error }}>
      {children}
    </BookListContext.Provider>
  );
};
