import './App.css';
import  React, { Suspense } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'; // Import Navigation component

// Lazy load components for code-splitting
const Header = React.lazy(() => import('./components/Header/Header'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));


// Create a link to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Middleware to add the Authorization header if a token exists
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client configuration
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate authLink with httpLink
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Navigation /> {/* Add Navigation here to display on all routes */}
          <div className="container">
            <Outlet /> {/* This will render the current route */}
          </div>
          <Footer />
        </Suspense>
      </div>
    </ApolloProvider>
  );
}

export default App;

