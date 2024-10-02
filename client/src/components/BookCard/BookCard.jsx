const BookCard = ({ book }) => {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} />}
        </div>
    );
};

export default BookCard;
