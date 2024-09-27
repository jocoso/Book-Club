const axios = require('axios');
const Book = require('../models/Book');

class Librarian {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Private
    validate(bookId) {
        // return true if endPoint is valid
        // return false;
        return /^[a-zA-Z0-9_-]{10,}$/.test(bookId);
    }
    async fetcher(bookId) {
        try {
            const response = await axios.get(`${this.apiUrl}/${bookId}`);
            return response.data.volumeInfo;
        } catch (error) {
            console.error(`Failed to fetch book data for ID: ${bookId}`, error);
            return null;
        }
    }

    // Public
    async retrieve(bookId) {
        if (!this.validate(bookId)) {
            throw new Error('Invalid book ID');
        }

        let book = await Book.findOne({ isbn: bookId });
        if (!book) {
            const bookData = await this.fetcher(bookId);
            if (!bookData) throw new Error('Book not found in Google Books API');

            book = new Book({
                title: bookData.title,
                author: bookData.authors.join(', '),
                description: bookData.description,
                image: bookData.imageLinks?.thumbnail,
                isbn: bookData.industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier || bookId,
            });
            await book.save();
        }
        return book;
    }
}

module.exports = Librarian;