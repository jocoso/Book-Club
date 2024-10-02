import StyledLink from "../components/StyledLink";
import Title from "../components/Title";
import { LimitedBookList } from "../components/BookList";

const Homepage = () => {
    return (
        <div className="flex flex-col w-8/12 mx-auto h-full">
            {/* Main Title */}
            <Title>Welcome to the Book Club Hub</Title>
            <p className="text-center mt-10">Your ultimate platform for book clubs!</p>

            {/* Link to the user list */}
            <StyledLink to="/users" className="text-center mb-10">View All Users</StyledLink>

            {/* Section Title */}
            <Title tier={3} className="mb-10">Latest Books</Title>

            {/* Book List */}
            <LimitedBookList />
        </div>
    );
};

export default Homepage;
