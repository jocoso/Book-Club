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

// CORS setup with dynamic origin handling
const allowedOrigins = [
    "https://book-club-1.onrender.com", // Frontend production URL
    "http://localhost:5173", // Local development (if necessary)
    "https://book-club-8svz.onrender.com"
];

// Apply CORS middleware before all other routes
app.use(
    cors({
        origin: (origin, callback) => {
            if(!origin) return callback(null, true);
            if(allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ["GET", "POST", "OPTIONS"], // Allow necessary HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
        credentials: true, // Allow credentials (like cookies, tokens)
    })
);

// Add this proxy route for handling LaunchDarkly requests
app.post('/api/launchdarkly/events', async (req, res) => {
    try {
        const launchdarklyUrl = 'https://events.launchdarkly.com/events/bulk/616efd128d68b4252e2e5f14';
        
        // Forward the request to LaunchDarkly
        const response = await fetch(launchdarklyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-LaunchDarkly-User-Agent': 'JSClient/2.24.2',
                'X-LaunchDarkly-Wrapper': 'react-client-sdk/2.29.4',
                'X-LaunchDarkly-Event-Schema': '3',
                'X-LaunchDarkly-Payload-ID': req.body.payloadId, // Assuming you pass it from the client
            },
            body: JSON.stringify(req.body), // Forward the request body
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error sending LaunchDarkly event:', error);
        res.status(500).json({ error: 'Error sending event to LaunchDarkly' });
    }
});


app.options('*', cors());
app.use((req, res, next) => {
    console.log(res.getHeader());
    next();
});

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production (for Vite or React)
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

        console.log("🚀 Apollo Server running at /graphql");
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }

    // Start Express server
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🌍 API server running on http://localhost:${PORT}!`);
        console.log(
            `🚀 Use GraphQL at https://book-club-1.onrender.com/graphql`
        );
    });
};

// Connect to the database and start the server
connection.once("open", startServer);
connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
