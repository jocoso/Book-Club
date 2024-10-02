import './App.css';
import React, { Suspense } from 'react';
// Apollo Client setup
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

// Lazy load components for code-splitting
const Header = React.lazy(() => import('./components/Header/Header'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

// Apollo Client configuration
const client = new ApolloClient({
  uri: '/graphql', // Your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        {/* Suspense handles the loading state of lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="container">
            <Outlet />
          </div>
          <Footer />
        </Suspense>
      </div>
    </ApolloProvider>
  );
}

export default App;

