import { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DISCUSSIONS } from '../graphql/queries';

export const DiscussionContext = createContext();

export const DiscussionProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_DISCUSSIONS);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    if (data) {
      setDiscussions(data.discussions);
    }
  }, [data]);

  return (
    <DiscussionContext.Provider value={{ discussions, loading, error }}>
      {children}
    </DiscussionContext.Provider>
  );
};
