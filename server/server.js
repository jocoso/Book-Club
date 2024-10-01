const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { connection } = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Make sure CORS middleware is applied before all other routes
app.use(
  cors({
    origin: [
      "https://book-club-1.onrender.com", // Allow requests from your server
      "http://localhost:5173", // Allow requests from localhost for local development
    ],
    methods: ["GET", "POST", "OPTIONS"], // Allow the necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
    credentials: true, // Allow credentials (like cookies, tokens)
  })
);

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production (for Vite)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
}

// Start Apollo Server and Express App
const startServer = async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true, // Enable introspection for Apollo Studio
        });

        await server.start();

        // Apply Apollo middleware with CORS already configured
        app.use(
            "/graphql",
            expressMiddleware(server, {
                context: async ({ req }) => authMiddleware({ req }),
            })
        );

        console.log("🚀 Apollo Server running at /graphql");
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }

    // Start Express server
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🌍 API server running on http://localhost:${PORT}!`);
        console.log(`🚀 Use GraphQL at https://book-club-1.onrender.com/graphql`);
    });
};

// Connect to MongoDB and start the server
connectWithRetry();
