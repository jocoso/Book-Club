class Librarian {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Private
    validate(endPoint) {
        // return true if endPoint is valid
        return false;
    }
    async fetcher(endPoint) {
        // Fetching logic goes here
        // Return object if successful
        // Return null if not
    }

    // Public
    async getBook(bookId) {
        // Logic to manage everything else goes here
    }
}

module.exports = Librarian;