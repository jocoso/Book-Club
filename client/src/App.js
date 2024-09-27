import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return(
        <ApolloProvider client={client}>
            <div className="">
                <Header />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;

