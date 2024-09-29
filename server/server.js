const express = require("express"); // Import the Express framework
const { ApolloServer } = require("@apollo/server"); // Import Apollo Server from the latest package
const { expressMiddleware } = require("@apollo/server/express4"); // Import the Express middleware integration for Apollo Server
const path = require("path"); // Import the path module for handling file paths
const { typeDefs, resolvers } = require("./schemas"); // Import GraphQL schema definitions and resolvers
const db = require("./config/connection"); // Import MongoDB connection configuration
const { authMiddleware } = require("./utils/auth"); // Import authentication middleware
const Librarian = require('./utils/librarian');
const profileRoutes = require('./routes/profile');



const PORT = process.env.PORT || 3001; // Define the server port, defaulting to 3001
const app = express(); // Create an instance of the Express app

app.use('/api', profileRoutes); // Use profile routes under the /api path


// Initialize an Apollo Server with type definitions and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const librarian = new Librarian('https://www.googleapis.com/books/v1/volumes?q=isbn:');

// Async function to start the Apollo Server and apply middleware
const startApolloServer = async () => {
    try {
        await server.start(); // Start the Apollo Server

        // Apply Express middleware for parsing incoming requests with URL-encoded and JSON payloads
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        // Apply Apollo GraphQL middleware with the context provided by authMiddleware for authentication
        app.use(
            "/graphql",
            expressMiddleware(server, {
                context: authMiddleware,
            })
        );

        // Serve static files if in production
        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../client/build"))); // Serve static files from the 'client/build' directory

            // Fallback route to serve the client application for any undefined routes
            app.get("*", (req, res) => {
                res.sendFile(
                    path.join(__dirname, "../client/build/index.html")
                );
            });

            app.get('/api/bookdata/:endpoint', async (req, res) => {
                const endpoint = req.params.endpoint;

                try {
                    const data = await librarian.getBook(`/${endpoint}`);
                    res.status(200).json(data);
                }catch(err) {
                    res.status(500).json({ message: 'Failed to fetch book'});
                }
            })
            
           // Protected route to get user profile
                 router.get('/profile', authMiddleware, (req, res) => {
                if (!req.user) {
                return res.status(401).json({ msg: 'Unauthorized' });
                }
  
    // If authenticated, return user data
    res.json({ user: req.user });
  });
        }

        // Start the server and connect to the MongoDB database
        db.once("open", () => {
            app.listen(PORT, () => {
                console.log(
                    `🌍 API server running on http://localhost:${PORT}!`
                );
                console.log(
                    `🚀 Use GraphQL at http://localhost:${PORT}/graphql`
                );
            });
        });
    } catch (err) {
        console.error("Error starting servers: ", err);
    }
};

// Call the async function to start the server
startApolloServer();
