import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content (Outlet) */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
