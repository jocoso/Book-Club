import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContexts';
import { BookProvider } from './contexts/BookListContext';
import { DiscussionProvider } from './contexts/DiscussionContext';

import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return(
        <ApolloProvider client={client}>
            <AuthProvider>
                <BookProvider>
                    <DiscussionProvider>
                        <div className="flex-column justify-flex-start min-100-vh">
                            <Header />
                            <div className="container">
                                <Outlet />
                            </div>
                            <Footer />
                        </div>
                    </DiscussionProvider>
                </BookProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
