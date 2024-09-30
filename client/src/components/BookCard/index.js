const BookCard = ({book}) => {
    return(
        <>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} />}
        </>
    );
}

export default BookCard;