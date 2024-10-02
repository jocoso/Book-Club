const express = require("express");
// Import the ApolloServer class
const cors = require("cors");
const Librarian = require("./utils/librarian");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

// Librarian for book data
const librarian = new Librarian(process.env.GOOGLE_BOOKS_API_URL);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    app.use(cors());

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // REST API Route for fetching book data
    app.get("/api/bookdata/:endpoint", async (req, res) => {
        try {
            const data = await librarian.retrieve(req.params.endpoint);
            if (!data)
                return res.status(404).json({ message: "Book not found" });
            res.status(200).json(data);
        } catch (err) {
            console.error("Error fetching book data:", err);
            res.status(500).json({
                message: "Failed to fetch book data",
                error: err.message,
            });
        }
    });

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/dist")));
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    app.use("/graphql", expressMiddleware(server));

    db.once("open", () => {
        app.listen({port: PORT, host: '0.0.0.0'}, (url) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    });
};

// Call the async function to start the server
startApolloServer();
