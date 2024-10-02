import StyledLink from "../components/StyledLink";
import Title from "../components/Title";
import { LimitedBookList } from "../components/BookList";

const Homepage = () => {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Main Title */}
            <Title className="text-center text-4xl font-bold">Welcome to the Book Club Hub</Title>
            <p className="text-center text-lg text-gray-700">
                Your ultimate platform for book clubs!
            </p>

            {/* Link to the user list */}
            <div className="text-center">
                <StyledLink to="/users" className="text-indigo-500 text-lg font-semibold hover:text-indigo-700">
                    View All Users
                </StyledLink>
            </div>

            {/* Section Title for Latest Books */}
            <Title tier={3} className="text-center text-2xl font-semibold mb-6">
                Latest Books
            </Title>

            {/* Book List */}
            <LimitedBookList />
        </div>
    );
};

export default Homepage;
