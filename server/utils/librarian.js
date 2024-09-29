const axios = require("axios");
const Book = require("../models/Book");

class Librarian {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Validate the book ID (e.g., ISBN should be 10 or 13 digits)
    validate(bookId) {
        return /^[0-9]{10,13}$/.test(bookId);
    }

    // Fetch book data from Google Books API
    async fetcher(bookId) {
        try {
            const response = await axios.get(`${this.apiUrl}?q=isbn:${bookId}`);
            const bookData = response.data.items && response.data.items[0]?.volumeInfo;
            if (!bookData) {
                throw new Error(`No volumeInfo found for ID: ${bookId}`);
            }
            return bookData;
        } catch (error) {
            throw new Error(`Failed to fetch book data for ID: ${bookId}. ${error.message}`);
        }
    }

    // Retrieve a book by its ID (ISBN or another identifier)
    async retrieve(bookId) {
        if (!this.validate(bookId)) {
            throw new Error("Invalid book ID");
        }

        try {
            let book = await Book.findOne({ isbn: bookId });
            if (!book) {
                const bookData = await this.fetcher(bookId);
                if (!bookData)
                    throw new Error("Book not found in Google Books API");

                const data = {
                    title: bookData.title || "Unknown Title",
                    author: bookData.items[0].authors && [bookData.authors.length > 0]
                    ? bookData.authors.join(", ")
                    : "Unknown Author",
                    description: bookData.description || "No description available",
                    image: bookData.imageLinks?.thumbnail || "default-image-url",

                };
                
                console.error(bookData)
                
                book = new Book({
                    isbn: bookData.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier || bookId,
                });
                
                await book.save();
            }
            
            return book;
        } catch (error) {
            console.error(`Error retrieving book: ${error.message}`);
            throw new Error("Failed to retrieve book.");
        }
    }
}

module.exports = Librarian;
