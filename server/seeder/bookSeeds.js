const mongoose = require('mongoose');
const Librarian = require('./utils/Librarian');
const Book = require('./models/Book');

//Connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/bookclub', { useNewUrlParser: true, useUnifiedTopology: true });

//Create a new instance of Librarian
const librarian = new Librarian('https://www.googleapis.com/books/v1/volumes');

async function seedBooks(bookIds) {
    try {
        for (const bookId of bookIds) {
            const bookData = await librarian.retrieve(bookId);
            if (bookData) {
                const newBook = new Book({
                    title: bookData.title,
                    author: bookData.authors.join(', '),
                    description: bookData.description,
                    image:bookData.imageLinks?.thumbnail,
                    isbn: bookData.industryIdentifiers.find(id => id.type === 'ISBN_13')?.identifier || bookId,
                });
                await newBook.save();
                consosle.log(`Saved book: ${newBook.title}`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

//Book IDs or ISBNs we want to seed
const bookIds = ['9780061120084', 'kotPYEqx7kMC', '9780143105428','eYRb8EM9vzsC', '9780142437247', 'OJ9TwF3b38UC', '9780316769488', '6v6kcjJeEwQC'];
seedBooks(bookIds);