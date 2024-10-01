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
<<<<<<< HEAD
            const response = await axios.get(`${this.apiUrl}?q=${bookId}`);
            // console.log("rest", response.data.items[0].volumeInfo)
            return response.data.items[0].volumeInfo;
=======
            const response = await axios.get(`${this.apiUrl}?q=isbn:${bookId}`);
            const bookData =
                response.data.items && response.data.items[0]?.volumeInfo;
            if (!bookData) {
                throw new Error(`No volumeInfo found for ID: ${bookId}`);
            }
            return bookData;
>>>>>>> c8e75c2a9f87614750dbf7da15fc590896c5a702
        } catch (error) {
            throw new Error(
                `Failed to fetch book data for ID: ${bookId}. ${error.message}`
            );
        }
    }

    async retrieve(bookId) {
        // Validate the book ID (must be 10 or 13 digits)
        if (!this.validate(bookId)) {
            throw new Error("Invalid book ID");
        }

        try {
            // Try to find the book in the database first
            let book = await Book.findOne({ isbn: bookId });
            let bookData = null;

            // If the book is not found in the database, fetch from Google Books API
            if (!book) {
                console.log(
                    `Book not found in database. Fetching from Google Books API for ISBN: ${bookId}`
                );
                bookData = await this.fetcher(bookId);

                if (!bookData) {
                    throw new Error("Book not found in Google Books API");
                }

                // Map Google Books API data to the book object
                const newBookData = {
                    title: bookData.title || "Unknown Title",
                    author:
                        bookData.authors?.length > 0
                            ? bookData.authors.join(", ")
                            : "Unknown Author",
                    description:
                        bookData.description || "No description available",
                    image:
                        bookData.imageLinks?.thumbnail || "default-image-url",
                    isbn:
                        bookData.industryIdentifiers?.find(
                            (id) => id.type === "ISBN_13"
                        )?.identifier || bookId,
                };

                // Create a new book record in the database
                book = new Book({
                    isbn: newBookData.isbn,
                    title: newBookData.title,
                    author: newBookData.author,
                    description: newBookData.description,
                    image: newBookData.image,
                });

                // Save the new book to the database
                await book.save();

                // Return a combined object with both sources of data
                return {
                    graphqlData: book,
                    bookData: newBookData,
                };
            }

            // If the book was found in the database, fetch Google Books API data
            // for extra information (if needed), otherwise return the book from the database
            bookData = await this.fetcher(bookId);
            const apiData = {
                title: bookData.title || book.title,
                author:
                    bookData.authors?.length > 0
                        ? bookData.authors.join(", ")
                        : book.author,
                description: bookData.description || book.description,
                image: bookData.imageLinks?.thumbnail || book.image,
            };

            // Return the combined result with both GraphQL and bookData
            return {
                graphqlData: book,
                bookData: apiData,
            };
        } catch (error) {
            console.error(
                `Error retrieving book with ISBN: ${bookId}: ${error.message}`
            );
            throw new Error("Failed to retrieve book.");
        }
    }
}

module.exports = Librarian;
