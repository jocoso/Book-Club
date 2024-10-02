import Title from '../Title'

const BookCard = ({ book }) => {
    return (
        <div className="w-60">
            <Title tier={4} className='!text-left'>{book.title}</Title>
            <p>{book.author}</p>
            <p className="truncate">{book.description}</p>
            {book.image && <img src={book.image} alt={book.title} className="mx-auto" />}
        </div>
    );
};

export default BookCard;
