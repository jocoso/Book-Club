require('dotenv').config();

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const connectDB = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const cors = require('cors');
const Librarian = require('./utils/librarian');

const PORT = process.env.PORT || 3001;
const app = express();

// Librarian for book data
const librarian = new Librarian(process.env.GOOGLE_BOOKS_API_URL);

// Configure Express Middleware and Routes
const configureExpress = (app) => {
    // CORS setup
    app.use(cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        methods: 'GET,POST',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    }));

    // Middleware for parsing JSON and urlencoded data
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // REST API Route for fetching book data
    app.get('/api/bookdata/:endpoint', async (req, res) => {
        try {
            const data = await librarian.retrieve(req.params.endpoint);
            if (!data) return res.status(404).json({ message: 'Book not found' });
            res.status(200).json(data);
        } catch (err) {
            console.error('Error fetching book data:', err);
            res.status(500).json({ message: 'Failed to fetch book data', error: err.message });
        }
    });

    // Serve static files if in production
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")));
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/build/index.html"));
        });
    }
};

// Start Apollo Server and Express App
// Start Apollo Server and Express App
const startServer = async () => {
    try {
        await connectDB();
        configureExpress(app);

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,  // Enable introspection
            playground: true,
        });

        await server.start();

        // Apply Apollo middleware with authentication
        app.use(
            "/graphql",
            expressMiddleware(server, {
                context: async ({ req }) => authMiddleware({ req }),
            })
        );
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }

    // Start Express server
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🌍 API server running on http://localhost:${PORT}!`);
        console.log(`🚀 Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};


startServer();
