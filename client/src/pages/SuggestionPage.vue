import React from 'react';
import SearchBar from '../components/SearchBar';
import SuggestionsList from '../components/SuggestionsList';

const SuggestionPage = () => {
  return (
    <div>
      <h1>Suggested Clubs and Books</h1>
      <SearchBar />
      <SuggestionsList />
    </div>
  );
};

export default SuggestionPage;